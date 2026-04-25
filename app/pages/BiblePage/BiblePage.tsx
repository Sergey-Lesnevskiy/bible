import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';

import type { ScrollView as ScrollViewType } from 'react-native';

import {
  copyVerseToClipboard,
  saveVerseToFavorites,
  shareVerse,
} from '../../utils/biblePageActions';

import WrapperContent from '../../components/WrapperContent/WrapperContent';
import { ThemedText } from '../../components/General/ThemedText/ThemedText';

import { styles } from './BiblePage.styles';

import { COLORS } from '../../constants/theme';
import { VALUE_HEIGHT } from '../../constants/metrics';
import { getAdaptiveSize } from '../../constants/typography';
import { PADDING } from '../../constants/metrics';

import AMP from '../../assets/books/AMP.json';
import { BibleJson, getAllBookNames, getChapter } from '../../utils/bibleJson';

import {
  DEFAULT_BIBLE_VERSION_JSON,
  getBibleJsonByVersionLabel,
  getBibleVersionLabel,
  getDefaultBibleVersionByDenomination,
} from '../../utils/bibleVersions';

import BibleHeader from '../../components/BibleHeader/BibleHeader';
import Paragraph from '../../components/Paragraph/Paragraph';
import BibleBottomControls from '../../components/BibleBottomControls/BibleBottomControls';
import TopScrollGradient from '../../components/TopScrollGradient/TopScrollGradient';
import BottomScrollGradient from '../../components/BottomScrollGradient/BottomScrollGradient';
import PopupBibleMoreMenu, {
  type AnchorRect,
} from '../../components/Popups/PopupBibleMoreMenu/PopupBibleMoreMenu';

import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  selectBook,
  selectChapter,
  selectJumpToVerseNumber,
  selectSelectedVersion,
} from '../../store/features/bibleReader/selectors';
import { selectUserDataDenominationSelector, selectUserDataIsProSelector } from '../../store/features/userData/selectors';
import { StorageService } from '../../api/storageService';
import {
  clearJumpToVerseNumberAction,
  setBookAction,
  setChapterAction,
  setSelectedVersionAction,
  setSelectionAction,
} from '../../store/features/bibleReader/actions';

import { openPopupAction } from '../../store/features/popup/actions';
import { selectPageAction } from '../../store/features/page/actions';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { getAudioUrl } from '../../utils/audioStorage';

const BIBLE_READER_STORAGE_KEY = 'bibleReaderState';
const BIBLE_AUDIO_STORAGE_KEY = 'bibleAudioState';
const storageService = new StorageService();

interface IBibleReaderState {
  book: string;
  chapter: string;
  version: string;
}

interface IBibleAudioState {
  book: string;
  chapter: string;
  version: string;
  verse: number;
}

const BiblePage = () => {
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBook);
  const chapter = useAppSelector(selectChapter);
  const selectedVersion = useAppSelector(selectSelectedVersion);
  const jumpToVerseNumber = useAppSelector(selectJumpToVerseNumber);
  const denomination = useAppSelector(selectUserDataDenominationSelector);
  const isPro = useAppSelector(selectUserDataIsProSelector);

  const [isInitialized, setIsInitialized] = useState(false);

  const versionJson = useMemo(() => {
    const fallbackJson = AMP as BibleJson;
    const fallbackLabel = getBibleVersionLabel(fallbackJson);
    
    let labelToUse = selectedVersion;
    if (!selectedVersion && denomination) {
      labelToUse = getDefaultBibleVersionByDenomination(denomination);
    }
    
    // Если все еще не задан, используем fallback
    labelToUse = labelToUse || fallbackLabel;
    
    const foundByVersion = getBibleJsonByVersionLabel(labelToUse);
    const foundByFallback = getBibleJsonByVersionLabel(fallbackLabel);
    const result = (
      foundByVersion ??
      foundByFallback ??
      DEFAULT_BIBLE_VERSION_JSON
    );

    return result;
  }, [selectedVersion, denomination]);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);
  const [moreAnchorRect, setMoreAnchorRect] = useState<AnchorRect | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const scrollViewRef = useRef<ScrollViewType | null>(null);
  const verseYByNumberRef = useRef<Record<number, number>>({});
  const [highlightedVerseIndex, setHighlightedVerseIndex] = useState<
    number | null
  >(null);
  const pendingJumpToVerseNumberRef = useRef<number | null>(null);

  const [selectedVerse, setSelectedVerse] = useState<{
    index: number;
    number: number;
    text: string;
  } | null>(null);

  const [currentAudioVerseNumber, setCurrentAudioVerseNumber] = useState<number>(1);

  const verses = useMemo(() => {
    return getChapter(versionJson, book, chapter) ?? [];
  }, [book, chapter, versionJson]);

  const audioVersionLabel = useMemo(() => {
    return selectedVersion || versionJson?.version || 'AMP';
  }, [selectedVersion, versionJson]);

  const audioPlayer = useAudioPlayer({
    onVerseComplete: (verseNumber) => {
      const nextVerseNumber = verseNumber + 1;
      if (nextVerseNumber <= verses.length) {
        setCurrentAudioVerseNumber(nextVerseNumber);
      } else {
        setCurrentAudioVerseNumber(1);
      }
    },
    onError: (error) => {
      console.error('Audio player error:', error);
    },
  });

  const bookNames = useMemo(() => {
    const all = getAllBookNames(versionJson);
    return all.sort((a, b) => a.localeCompare(b));
  }, [versionJson]);

  const chapterKeys = useMemo(() => {
    const chapters = versionJson?.result?.[book]?.chapters;
    if (!chapters) return [];

    return Object.keys(chapters)
      .map((k) => Number(k))
      .filter((n) => Number.isFinite(n) && n > 0)
      .sort((a, b) => a - b)
      .map((n) => String(n));
  }, [book, versionJson]);

  useEffect(() => {
    const initializeFromStorage = async () => {
      try {
        const savedState = await storageService.getItem<IBibleReaderState>(
          BIBLE_READER_STORAGE_KEY,
        );

        if (savedState) {
          if (savedState.book) {
            dispatch(setBookAction(savedState.book));
          }
          if (savedState.chapter) {
            dispatch(setChapterAction(savedState.chapter));
          }
          if (savedState.version) {
            dispatch(setSelectedVersionAction(savedState.version));
          }
        } else {
          dispatch(setBookAction(bookNames[0] ?? 'Genesis'));
          if (denomination) {
            const defaultVersion =
              getDefaultBibleVersionByDenomination(denomination);
            dispatch(setSelectedVersionAction(defaultVersion));
          }
        }
      } catch (error) {
        dispatch(setBookAction(bookNames[0] ?? 'Genesis'));
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      void initializeFromStorage();
    }
  }, [bookNames, dispatch, denomination, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    if (selectedVersion) return;

    const defaultVersion = denomination
      ? getDefaultBibleVersionByDenomination(denomination)
      : versionJson?.version ?? 'NIV';
    dispatch(setSelectedVersionAction(defaultVersion));
  }, [dispatch, selectedVersion, versionJson, denomination, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!book || !chapter || !selectedVersion) return;

    const saveToStorage = async () => {
      try {
        const stateToSave: IBibleReaderState = {
          book,
          chapter,
          version: selectedVersion,
        };
        await storageService.setItem(BIBLE_READER_STORAGE_KEY, stateToSave);
      } catch (error) {
        // Silent fail
      }
    };

    void saveToStorage();
  }, [book, chapter, selectedVersion, isInitialized]);

  useEffect(() => {
    setCurrentAudioVerseNumber(1);
    if (audioPlayer.state.isPlaying) {
      audioPlayer.stop();
    }
  }, [book, chapter, selectedVersion]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!book || !chapter || !audioVersionLabel) return;

    const restoreAudioState = async () => {
      try {
        const saved = await storageService.getItem<IBibleAudioState>(
          BIBLE_AUDIO_STORAGE_KEY,
        );
        if (!saved) return;

        if (
          saved.book !== book ||
          saved.chapter !== chapter ||
          saved.version !== audioVersionLabel
        ) {
          return;
        }

        const safeVerse = Math.min(
          Math.max(1, Number(saved.verse) || 1),
          Math.max(1, verses.length),
        );
        setCurrentAudioVerseNumber(safeVerse);
      } catch (error) {
        // Silent fail
      }
    };

    void restoreAudioState();
  }, [audioVersionLabel, book, chapter, isInitialized, verses.length]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!book || !chapter || !audioVersionLabel) return;

    const saveAudioState = async () => {
      try {
        const stateToSave: IBibleAudioState = {
          book,
          chapter,
          version: audioVersionLabel,
          verse: currentAudioVerseNumber,
        };
        await storageService.setItem(BIBLE_AUDIO_STORAGE_KEY, stateToSave);
      } catch (error) {
        // Silent fail
      }
    };

    void saveAudioState();
  }, [audioVersionLabel, book, chapter, currentAudioVerseNumber, isInitialized]);

  useEffect(() => {
    verseYByNumberRef.current = {};
    setHighlightedVerseIndex(null);
    pendingJumpToVerseNumberRef.current = null;
  }, [book, chapter, selectedVersion]);

  useEffect(() => {
    if (jumpToVerseNumber == null) return;

    pendingJumpToVerseNumberRef.current = jumpToVerseNumber;

    const y = verseYByNumberRef.current[jumpToVerseNumber];
    if (typeof y !== 'number') return;

    const idx = jumpToVerseNumber - 1;
    if (idx < 0) return;

    scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 80), animated: true });
    setHighlightedVerseIndex(idx);
    dispatch(clearJumpToVerseNumberAction());
  }, [dispatch, jumpToVerseNumber]);

  const currentChapterIndex = useMemo(() => {
    const idx = chapterKeys.indexOf(chapter);
    return idx >= 0 ? idx : 0;
  }, [chapter, chapterKeys]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const currentScrollY = contentOffset.y;
    const paddingToBottom = 20;
    const isBottom =
      layoutMeasurement.height + currentScrollY >=
      contentSize.height - paddingToBottom;
    setIsAtBottom(isBottom);
  };

  const topGradientOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
const handleOpenPicker = () => {
    dispatch(openPopupAction({
      key: 'biblePicker',
      payload: {
        versionJson,
        value: { book, chapter },
        onSelect: (selection: any) => {
          dispatch(setSelectionAction(selection));
        },
        onVersionChange: (nextJson: any) => {
          const label = getBibleVersionLabel(nextJson);
          if (!label) return;
          dispatch(setSelectedVersionAction(label));
        },
        onClose: () => {
        }
      }
    }));
  };
  const loadAndPlayAudio = useCallback(async (verseNumber: number) => {
    const audioUrl = await getAudioUrl(audioVersionLabel, book, chapter, verseNumber);

    if (!audioUrl) {
      console.error('Failed to get audio URL');
      return;
    }

    await audioPlayer.loadAudio(audioUrl, verseNumber);
    await audioPlayer.play();
  }, [audioVersionLabel, book, chapter, audioPlayer]);

  useEffect(() => {
    if (audioPlayer.state.isPlaying && audioPlayer.state.currentVerseNumber !== currentAudioVerseNumber) {
      loadAndPlayAudio(currentAudioVerseNumber);
    }
  }, [currentAudioVerseNumber, audioPlayer.state.isPlaying, audioPlayer.state.currentVerseNumber, loadAndPlayAudio]);

  const handlePlay = useCallback(async () => {
    if (!isPro) {
      dispatch(selectPageAction({ page: 'PayWall' }));
      return;
    }
    if (audioPlayer.state.isPlaying) {
      await audioPlayer.pause();
    } else {
      if (audioPlayer.state.currentVerseNumber === currentAudioVerseNumber) {
        await audioPlayer.play();
      } else {
        await loadAndPlayAudio(currentAudioVerseNumber);
      }
    }
  }, [audioPlayer, currentAudioVerseNumber, loadAndPlayAudio, isPro, dispatch]);

  const handleNextVerse = useCallback(async () => {
    if (!isPro) {
      dispatch(selectPageAction({ page: 'PayWall' }));
      return;
    }
    const nextVerseNumber = currentAudioVerseNumber + 1;
    if (nextVerseNumber <= verses.length) {
      setCurrentAudioVerseNumber(nextVerseNumber);
      if (audioPlayer.state.isPlaying) {
        await loadAndPlayAudio(nextVerseNumber);
      }
    }
  }, [currentAudioVerseNumber, verses.length, audioPlayer.state.isPlaying, loadAndPlayAudio, isPro, dispatch]);

  const handlePrevVerse = useCallback(async () => {
    if (!isPro) {
      dispatch(selectPageAction({ page: 'PayWall' }));
      return;
    }
    if (currentAudioVerseNumber === 1) {
      if (audioPlayer.state.currentVerseNumber === 1) {
        await audioPlayer.replay();
      } else {
        setCurrentAudioVerseNumber(1);
        if (audioPlayer.state.isPlaying) {
          await loadAndPlayAudio(1);
        }
      }
    } else {
      const prevVerseNumber = currentAudioVerseNumber - 1;
      setCurrentAudioVerseNumber(prevVerseNumber);
      if (audioPlayer.state.isPlaying) {
        await loadAndPlayAudio(prevVerseNumber);
      }
    }
  }, [currentAudioVerseNumber, audioPlayer, loadAndPlayAudio, isPro, dispatch]);
  const handleMore = () => {
    setIsMoreMenuVisible(true);
  };

  const bottomControlsOffset = useMemo(() => {
    const iconMenuHeight = getAdaptiveSize(54, false, 10);
    const iconMenuBottomInset = getAdaptiveSize(
      PADDING.screenBottomSmall,
      false,
      10,
    );
    const base =
      getAdaptiveSize(30, false, 5) + iconMenuHeight + iconMenuBottomInset;
    if (!selectedVerse) return base;
    return VALUE_HEIGHT.SIZE_1 + base;
  }, [selectedVerse]);

  const bottomControlsAnimValue = useRef(new Animated.Value(bottomControlsOffset)).current;

  useEffect(() => {
    Animated.spring(bottomControlsAnimValue, {
      toValue: bottomControlsOffset,
      useNativeDriver: false,
      tension: 50,
      friction: 12,
    }).start();
  }, [bottomControlsOffset, bottomControlsAnimValue]);

  useEffect(() => {
    if (verses.length === 0 && bookNames.length > 0 && isInitialized) {
      const findFirstAvailableBook = () => {
        for (const bookName of bookNames) {
          const chapters = versionJson?.result?.[bookName]?.chapters;
          if (!chapters) continue;

          const firstChapter = Object.keys(chapters).find(chapterKey => {
            const chapter = chapters[chapterKey];
            return chapter !== null && chapter !== undefined && Array.isArray(chapter) && chapter.length > 0;
          });

          if (firstChapter) {
            return { book: bookName, chapter: firstChapter };
          }
        }
        return null;
      };

      const available = findFirstAvailableBook();
      if (available) {
        console.log('Redirecting to available book/chapter:', available);
        dispatch(setBookAction(available.book));
        dispatch(setChapterAction(available.chapter));
      }
    }
  }, [verses.length, bookNames, versionJson, isInitialized, dispatch]);

  useEffect(() => {
    if (selectedVerse) {
      dispatch(openPopupAction({
        key: 'bibleActions',
        payload: {
          onSave: () => saveVerseToFavorites({
            dispatch,
            version: selectedVersion,
            book,
            chapter,
            verseNumber: selectedVerse.number,
            text: selectedVerse.text,
          }),
          onCopy: () => copyVerseToClipboard({
            dispatch,
            book,
            chapter,
            verseNumber: selectedVerse.number,
            text: selectedVerse.text,
          }),
          onShare: () => shareVerse({
            dispatch,
            book,
            chapter,
            verseNumber: selectedVerse.number,
            text: selectedVerse.text,
          }),
          onClose: () => {
            setSelectedVerse(null);
          }
        }
      }));
    }
  }, [selectedVerse, dispatch, selectedVersion, book, chapter]);

  const scrollContentBottomInset = useMemo(() => {
    const iconMenuHeight = getAdaptiveSize(54, false, 10);
    const iconMenuPaddingTop = getAdaptiveSize(10, false, 10);
    const iconMenuPaddingBottom = getAdaptiveSize(
      PADDING.screenBottomSmall,
      false,
      10,
    );

    const bottomControlsHeight = getAdaptiveSize(52, false, 10);
    const gapBetweenRows = getAdaptiveSize(14, false, 6);

    // Ensure the last verse can scroll above both overlays.
    return (
      iconMenuHeight +
      iconMenuPaddingTop +
      iconMenuPaddingBottom +
      gapBetweenRows +
      bottomControlsHeight +
      getAdaptiveSize(24, false, 10)
    );
  }, []);

  const pendingPopupAfterMoreMenuCloseRef = useRef<
    'favorites' | 'fontSize' | null
  >(null);

  useEffect(() => {
    return () => {
      pendingPopupAfterMoreMenuCloseRef.current = null;
    };
  }, []);

  return (
    <WrapperContent style={styles.wrapperContent} type="launcher">
      <View style={styles.header}>
        <BibleHeader
          onPressTitle={handleOpenPicker}
          isSearchOpen={isSearchOpen}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchOpen={() => {
            setIsSearchOpen(true);
          }}
          onSearchClose={() => {
            setIsSearchOpen(false);
            setSearchValue('');
          }}
          onMoreAnchor={(rect) => setMoreAnchorRect(rect)}
          onPressMore={handleMore}
        />
      </View>

      <PopupBibleMoreMenu
        visible={isMoreMenuVisible}
        anchorRect={moreAnchorRect}
        onClose={() => setIsMoreMenuVisible(false)}
        onDidClose={() => {
          const nextKey = pendingPopupAfterMoreMenuCloseRef.current;
          if (!nextKey) return;
          pendingPopupAfterMoreMenuCloseRef.current = null;
          dispatch(openPopupAction({ key: nextKey }));
        }}
        onPressFavourites={() => {
          pendingPopupAfterMoreMenuCloseRef.current = 'favorites';
          setIsMoreMenuVisible(false);
        }}
        onPressFontSize={() => {
          pendingPopupAfterMoreMenuCloseRef.current = 'fontSize';
          setIsMoreMenuVisible(false);
        }}
      />

      <View style={styles.main}>
        <View style={styles.scrollArea}>
          <TopScrollGradient
            style={styles.topGradient}
            opacity={topGradientOpacity}
            colorsLight={
              [
                'rgba(255,255,255,1)',
                'rgba(255, 255, 255, 0.9)',
                'rgba(255, 255, 255, 0)',
              ] as const
            }
            colorsDark={
              [
                COLORS.BLACK_10,
                'rgba(10, 10, 11, 0.92)',
                'rgba(10, 10, 11, 0.65)',
                'rgba(10, 10, 11, 0)',
              ] as const
            }
          />
          <Animated.ScrollView
            ref={scrollViewRef}
            style={styles.content}
            contentContainerStyle={{ paddingBottom: scrollContentBottomInset }}
            showsVerticalScrollIndicator={false}
            onTouchStart={() => {
              if (highlightedVerseIndex == null) return;
              setHighlightedVerseIndex(null);
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
                listener: handleScroll,
              },
            )}
            scrollEventThrottle={16}
          >
            {verses.length === 0 ? (
              <ThemedText variant="sfBody17Regular">No verses found</ThemedText>
            ) : (
              <Paragraph
                verses={verses}
                highlightQuery={isSearchOpen ? searchValue : ''}
                selectedVerseIndex={
                  highlightedVerseIndex ?? selectedVerse?.index ?? null
                }
                onVerseLayout={({ number, y }) => {
                  verseYByNumberRef.current[number] = y;

                  const pending = pendingJumpToVerseNumberRef.current;
                  if (pending == null) return;
                  if (pending !== number) return;

                  const idx = pending - 1;
                  if (idx < 0) return;

                  pendingJumpToVerseNumberRef.current = null;
                  scrollViewRef.current?.scrollTo({
                    y: Math.max(0, y - 80),
                    animated: true,
                  });
                  setHighlightedVerseIndex(idx);
                  dispatch(clearJumpToVerseNumberAction());
                }}
                onVersePress={(payload) => {
                  setHighlightedVerseIndex(null);
                  setSelectedVerse(payload);
                }}
              />
            )}
          </Animated.ScrollView>

          {!isAtBottom && (
            <BottomScrollGradient
              style={styles.bottomGradient}
              colorsDark={
                [
                  'rgba(10, 10, 11, 0)',
                  'rgba(10, 10, 11, 0.65)',
                  'rgba(10, 10, 11, 0.92)',
                  COLORS.BLACK_10,
                ] as const
              }
              colorsLight={
                [
                  'rgba(255, 255, 255, 0)',
                  'rgba(255, 255, 255, 0.7)',
                  'rgba(255, 255, 255, 0.98)',
                  'rgba(255,255,255,1)',
                ] as const
              }
              locations={[0, 0.2, 0.55, 1] as const}
            />
          )}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: bottomControlsAnimValue,
              left: 0,
              right: 0,
            }}
          >
            <BibleBottomControls
              onPlay={handlePlay}
              onNext={handleNextVerse}
              onPrev={handlePrevVerse}
              isPlaying={audioPlayer.state.isPlaying}
              chapterKeys={chapterKeys}
              currentChapterIndex={currentChapterIndex}
              onChangeChapter={(nextChapter) =>
                dispatch(setChapterAction(nextChapter))
              }
              // style={{ bottom: bottomControlsOffset }}
            />
          </Animated.View>
        </View>
      </View>
    </WrapperContent>
  );
};

export default BiblePage;

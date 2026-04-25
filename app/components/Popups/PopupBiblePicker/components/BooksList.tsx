import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { Animated, Dimensions, FlatList, Pressable, View } from 'react-native';

import { COLORS } from '../../../../constants/theme';

import type { BibleJson } from '../../../../utils/bibleJson';

import { calculateChaptersHeight } from '../../../../utils/layoutUtils';
import { ThemedText } from '../../../General/ThemedText/ThemedText';

import { getChapterCount } from '../../../../utils/PopupBiblePicker.utils';

import BookRow from './BookRow';
import { styles } from '../PopupBiblePicker.styles';
import { PopupBiblePickerSelection } from '../../../../types/PopupBiblePicker';
import { getAdaptiveSize } from '../../../../constants/typography';
import { SCREEN_CONTAINER } from '../../../../constants/metrics';

type BooksListProps = {
  booksData: string[];
  expandedBook: string | null;
  onToggleExpanded: (book: string) => void;
  versionJson: BibleJson;
  selection: PopupBiblePickerSelection;
  selectedChapter: string;
  itemBg: string;
  chapterBg: string;
  chapterText: string;
  ChevronIcon: React.ComponentType<any>;
  onPickChapter: (args: { book: string; chapter: string }) => void;
};

const BooksList: React.FC<BooksListProps> = ({
  booksData,
  expandedBook,
  onToggleExpanded,
  versionJson,
  selection,
  selectedChapter,
  itemBg,
  chapterBg,
  chapterText,
  ChevronIcon,
  onPickChapter,
}) => {

  const heightAnims = useRef<{ [key: string]: Animated.Value }>({}).current;
  const isInitialized = useRef(false);
  const booksWithSetHeight = useRef<Set<string>>(new Set());
  const booksWithContent = useRef<Set<string>>(new Set());
  

  const actualScreenWidth = Dimensions.get('window').width;
  const screenWidth = actualScreenWidth > SCREEN_CONTAINER.middle ? SCREEN_CONTAINER.middle : actualScreenWidth;
  const availableWidth = screenWidth - getAdaptiveSize(94,false,20); // вычитаем падинги

  const calculateChaptersHeightCallback = useCallback((chaptersCount: number) => {
    return calculateChaptersHeight(chaptersCount, availableWidth);
  }, [availableWidth]);

  // Фильтруем книги - оставляем только те у которых есть непустые главы
  const filteredBooksData = useMemo(() => {
    return booksData.filter(book => {
      const chapters = versionJson?.result?.[book]?.chapters;
      if (!chapters) return false;
      
      // Проверяем есть ли хотя бы одна непустая глава
      return Object.values(chapters).some(chapter => 
        chapter !== null && chapter !== undefined
      );
    });
  }, [booksData, versionJson]);

  // Инициализируем анимации при монтировании (только один раз)
  useEffect(() => {
    filteredBooksData.forEach(book => {
      if (!heightAnims[book]) {
        heightAnims[book] = new Animated.Value(0);
      }
    });
    isInitialized.current = true;
  }, [filteredBooksData]);

  // Анимируем высоту при изменении expandedBook
  const prevExpandedBook = useRef<string | null>(null);
  useEffect(() => {
    // Пропускаем первую инициализацию
    if (!isInitialized.current) return;
    
    // Закрываем предыдущую открытую книгу (если она была)
    if (expandedBook !== prevExpandedBook.current && prevExpandedBook.current) {
      // Проверяем что анимация для этой книги существует
      if (heightAnims[prevExpandedBook.current]) {
        Animated.timing(heightAnims[prevExpandedBook.current], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      // Удаляем из Set чтобы можно было снова установить высоту при переоткрытии
      booksWithSetHeight.current.delete(prevExpandedBook.current);
      booksWithContent.current.delete(prevExpandedBook.current);
    }
    
    prevExpandedBook.current = expandedBook;
  }, [expandedBook]);

  const renderItem = useCallback(({ item: book }: { item: string }) => {
    const isOpen = expandedBook === book;
    
    // Устанавливаем высоту и запускаем анимацию только один раз для каждой открытой книги
    if (isOpen && heightAnims[book] && !booksWithSetHeight.current.has(book)) {
      const chaptersCount = getChapterCount(versionJson, book);

      const targetHeight = calculateChaptersHeightCallback(chaptersCount);
      
      // Запускаем анимацию открытия
      Animated.timing(heightAnims[book], {
        toValue: targetHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
      
      booksWithSetHeight.current.add(book);
      // Показываем контент сразу вместе с анимацией
      booksWithContent.current.add(book);
    }

    const chapterCount = getChapterCount(versionJson, book);
    const chapters = Array.from({ length: chapterCount }).map((_, idx) =>
      String(idx + 1),
    );

    return (
      <View>
        <BookRow
          book={book}
          itemBg={itemBg}
          isOpen={isOpen && booksWithContent.current.has(book)}
          ChevronIcon={ChevronIcon}
          onToggle={() => onToggleExpanded(book)}
        />

        <Animated.View
          style={[
            styles.chaptersWrap,
            {
              backgroundColor: itemBg,
              height: heightAnims[book],
              overflow: 'hidden',
              marginTop: 0,
              borderBottomLeftRadius: getAdaptiveSize(16, false, 3),
              borderBottomRightRadius: getAdaptiveSize(16, false, 3),
            },
          ]}
        >
          {isOpen && booksWithContent.current.has(book) && (
            <>
              {chapters.map((ch) => {
                // Проверяем что глава существует и не null
                const chapterData = versionJson?.result?.[book]?.chapters?.[ch];
                if (!chapterData) return null;
                
                const selected =
                  book === selection.book && ch === selectedChapter;

                return (
                  <Pressable
                    key={ch}
                    style={({ pressed }) => [
                      styles.chapterPill,
                      {
                        backgroundColor: selected
                          ? COLORS.PRIMARY_ACTIVE_BUTTON
                          : chapterBg,
                        opacity: pressed ? 0.85 : 1,
                      },
                    ]}
                    onPress={() => onPickChapter({ book, chapter: ch })}
                  >
                    <ThemedText
                      variant="sfBody17Semibold"
                      style={{
                        color: selected ? COLORS.COLOR_WHITE : chapterText,
                      }}
                    >
                      {ch}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </>
          )}
        </Animated.View>
      </View>
    );
  }, [expandedBook, versionJson, selection, selectedChapter, itemBg, chapterBg, chapterText, ChevronIcon, onToggleExpanded, onPickChapter]);

  return (
    <FlatList
      data={filteredBooksData}
      keyExtractor={(book) => book}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      getItemLayout={(data, index) => ({
        length: 80, 
        offset: 80 * index,
        index,
      })}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListFooterComponent={() => <View style={{ height: 18 }} />}
    />
  );
};

export default BooksList;

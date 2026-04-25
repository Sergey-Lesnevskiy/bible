import React, { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, View, Animated } from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { COLORS } from '../../../constants/theme';

import { ThemedText } from '../../General/ThemedText/ThemedText';

import CrossDark from '../../../assets/icons/bible/cross-dark.svg';
import CrossLight from '../../../assets/icons/bible/cross-light.svg';

import { styles } from './PopupFavorites.styles';
import GrabberHandle from '../../GrabberHandle/GrabberHandle';
import { PopupModal } from '../PopupModal';
import PopupDeleteFavoriteConfirm from '../PopupsTwoButtons/PopupDeleteFavoriteConfirm/PopupDeleteFavoriteConfirm';

import FavoritesRow from './FavoritesRow';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import { selectFavouritesVersesList } from '../../../store/features/favouritesVerses/selectors';
import { type FavouriteVerseRef } from '../../../store/features/favouritesVerses/constants';
import { removeFavouriteVerseAction } from '../../../store/features/favouritesVerses/actions';
import {
  setJumpToVerseNumberAction,
  setSelectedVersionAction,
  setSelectionAction,
} from '../../../store/features/bibleReader/actions';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';
import { PADDING } from '../../../constants/metrics';

export type PopupFavoritesItem = {
  id: string;
  name: string;
  text: string;
  verseRef?: {
    version: string;
    book: string;
    chapter: string;
    verseNumber: number;
  };
};

export interface PopupFavoritesProps {
  visible: boolean;
  onClose: () => void;
  onDeleteItem?: (id: string) => void;
};

const PopupFavorites: React.FC<PopupFavoritesProps> = ({
  visible,
  onClose,
  // items,
  onDeleteItem,
}) => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavouritesVersesList);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [baseWidth, setBaseWidth] = useState<number>(0);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const heightsRef = useRef<Record<string, number>>({});
  const [pendingDeleteVerseRef, setPendingDeleteVerseRef] =
    useState<FavouriteVerseRef | null>(null);

  const { modalVisible, translateY, panResponder, closeWithAnimation } = useSwipeablePopup({
    visible,
    onClose,
  });

  const CloseIcon = theme === 'light' ? CrossDark : CrossLight;

  const data = useMemo<PopupFavoritesItem[]>(() => {
    return favourites.map((v) => ({
      id: v.key,
      name: `${v.book} ${v.chapter}:${v.verseNumber} (${v.version})`,
      text: v.text,
      verseRef: {
        version: v.version,
        book: v.book,
        chapter: v.chapter,
        verseNumber: v.verseNumber,
      },
    }));
  }, [favourites]);

  return (
    <PopupModal
      key="favorites-modal"
      visible={modalVisible}
      onClose={closeWithAnimation}
      rootStyle={{ justifyContent: 'flex-end', alignItems: 'stretch' }}
      contentStyle={{ width: '100%' }}
      animationType="none"
    >
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor:
              theme === 'dark' ? COLORS.GRAY_900 : COLORS.COLOR_WHITE,
            transform: [{ translateY }],
          },
        ]}
      >
        <Animated.View {...panResponder.panHandlers}>
          <GrabberHandle />
        </Animated.View>
        <View
          onLayout={
            e => {
              const { width: layoutWidth } = e.nativeEvent.layout
              if (layoutWidth > PADDING.screenHorizontalPopupTwoContainers) {
                setBaseWidth(layoutWidth - PADDING.screenHorizontalPopupTwoContainers)
              }
            }
          }
          style={styles.header}
        >
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed && { opacity: 0.7 },
              {
                backgroundColor:
                  theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK,
              },
            ]}
            onPress={closeWithAnimation}
          >
            <CloseIcon width={12} height={12} />
          </Pressable>

          <View style={styles.titleBox}>
            <ThemedText variant="sfBody17Semibold">Favourites</ThemedText>
          </View>

          <View style={styles.rightSpacer} />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <FavoritesRow
              baseWidth={baseWidth}
              item={item}
              heightsRef={heightsRef}
              isOpen={activeId === item.id}
              theme={theme}
              onOpen={(id) => setActiveId(id)}
              onClose={() => setActiveId(null)}
              onPressItem={(verseRef) => {
                dispatch(setSelectedVersionAction(verseRef.version));
                dispatch(
                  setSelectionAction({
                    book: verseRef.book,
                    chapter: verseRef.chapter,
                  }),
                );
                dispatch(setJumpToVerseNumberAction(verseRef.verseNumber));
                closeWithAnimation();
              }}
              onPressTrash={(rowItem) => {
                if (onDeleteItem) {
                  onDeleteItem(rowItem.id);
                  return;
                }

                if (!rowItem.verseRef) return;
                setPendingDeleteVerseRef(rowItem.verseRef);
                setDeleteConfirmVisible(true);
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 0, backgroundColor: 'transparent' }} />
          )}
          ListFooterComponent={() => (
            <View style={{ height: 12, backgroundColor: 'transparent' }} />
          )}
        />
      </Animated.View>

      <PopupDeleteFavoriteConfirm
        visible={deleteConfirmVisible}
        onClose={() => {
          setDeleteConfirmVisible(false);
          setPendingDeleteVerseRef(null);
        }}
        onConfirm={() => {
          if (!pendingDeleteVerseRef) return;
          dispatch(removeFavouriteVerseAction(pendingDeleteVerseRef));
          setDeleteConfirmVisible(false);
          setPendingDeleteVerseRef(null);
        }}
      />
    </PopupModal>
  );
};

export default PopupFavorites;

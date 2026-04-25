import React from 'react';
import { Animated, PanResponder, Pressable, View } from 'react-native';

import { Notification } from '../../Notification/Notification';

import TrashLight from '../../../assets/icons/bible/trash-light.svg';

import { COLORS } from '../../../constants/theme';
import { styles } from './PopupFavorites.styles';

export type FavoritesRowVerseRef = {
  version: string;
  book: string;
  chapter: string;
  verseNumber: number;
};

export type FavoritesRowItem = {
  id: string;
  name: string;
  text: string;
  verseRef?: FavoritesRowVerseRef;
};

export type FavoritesRowProps = {
  item: FavoritesRowItem;
  isOpen: boolean;
  baseWidth: number;
  theme: 'light' | 'dark';
  onOpen: (id: string) => void;
  onClose: () => void;
  onPressItem: (verseRef: FavoritesRowVerseRef) => void;
  onPressTrash: (item: FavoritesRowItem) => void;
  heightsRef: React.RefObject<Record<string, number>>;
};

const FavoritesRow: React.FC<FavoritesRowProps> = ({
  item,
  isOpen,
  theme,
  onOpen,
  onClose,
  onPressItem,
  onPressTrash,
  baseWidth,
  heightsRef,
}) => {
  const [panHandlers, setPanHandlers] = React.useState<any>(null);
  const shiftAnim = React.useRef(new Animated.Value(isOpen ? 0.95: 1)).current;
  const trashAnim = React.useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  React.useEffect(() => {
    const panResponder = PanResponder.create({
      // Разрешаем дочерним элементам обрабатывать касания
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,

      // Разрешаем дочерним элементам обрабатывать жесты
      onMoveShouldSetPanResponderCapture: () => false,

      // Только горизонтальные свайпы активируют PanResponder
      onMoveShouldSetPanResponder: (_evt, gesture) => {
        const absDx = Math.abs(gesture.dx);
        const absDy = Math.abs(gesture.dy);
        // Только если свайп явно горизонтальный
        return absDx > 5 && absDx > absDy * 2;
      },

      // Когда свайп отпускаем
      onPanResponderRelease: (_evt, gesture) => {
        const openDx = -12;
        const closeDx = 12;

        if (gesture.dx <= openDx || gesture.vx < -0.25) {
          onOpen(item.id);
          return;
        }

        if (gesture.dx >= closeDx || gesture.vx > 0.25) {
          onClose();
        }
      },
      onPanResponderTerminationRequest: () => true,
    });

    setPanHandlers(panResponder.panHandlers);
  }, []);
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(shiftAnim, {
        toValue: isOpen ? 0.95 : 1,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
      }),
      Animated.spring(trashAnim, {
        toValue: isOpen ? 1 : 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
    ]).start();
  }, [isOpen]);
  const contentStyle = {
    flex: shiftAnim,
    
  };
  const trashStyle = {
    opacity: trashAnim,
    transform: [
      {
        scale: trashAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };
  return (
    <View style={[styles.wrapperNotification, isOpen && { gap: 20 }]} {...panHandlers}>
      <Animated.View style={[ contentStyle]}>
        <Pressable
          onPress={() => {
            if (isOpen) onClose();
            if (!item.verseRef) return;
            onPressItem(item.verseRef);
          }}
          onLongPress={() => {
            if (isOpen) {
              onClose();
              return;
            }
            onOpen(item.id);
          }}
          style={{ overflow: 'hidden'}}
        >
          <Notification
            heightsRef={heightsRef}
            baseWidth={baseWidth}
            name={item.name}
            text={item.text}
            itemId={item.id}
            isSecondType
            background={theme === 'dark' ? COLORS.TABS_DARK : undefined}
            showTrash={isOpen}
            enableHeightCalculation
          />
        </Pressable>
      </Animated.View>

      <Animated.View
        style={[styles.rightIconBox, isOpen && styles.activeTrashStyle, trashStyle]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        <Pressable
          style={({ pressed }) => pressed && { opacity: 0.7 }}
          onPress={() => onPressTrash(item)}
        >
          <TrashLight width={18} height={18} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default React.memo(FavoritesRow);

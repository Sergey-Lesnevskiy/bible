import React, { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

import { ThemedText } from '../../../General/ThemedText/ThemedText';

import { styles } from '../PopupBiblePicker.styles';

type BookRowProps = {
  book: string;
  itemBg: string;
  isOpen: boolean;
  onToggle: () => void;
  ChevronIcon: React.ComponentType<any>;
};
const BookRow: React.FC<BookRowProps> = ({
  book,
  itemBg,
  isOpen,
  onToggle,
  ChevronIcon,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    rotateAnim.setValue(isOpen ? 1 : 0);
    borderAnim.setValue(isOpen ? 0 : 1);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue: isOpen ? 1 : 0,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(borderAnim, {
        toValue: isOpen ? 0 : 1,
        tension: 50,
        friction: 10,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isOpen, rotateAnim, borderAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '-90deg'],
  });

  const borderRadius = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={[
          styles.bookItem,
          {
            backgroundColor: itemBg,
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
          },
          isOpen && styles.bookItemOpen, // другие стили для открытого состояния
        ]}
      >
        <ThemedText variant="amBody20Default" style={styles.bookTitle}>
          {book}
        </ThemedText>
        <ChevronIcon
          width={14}
          height={14}
          style={[styles.chevronIcon, { transform: [{ rotate }] }]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default BookRow;


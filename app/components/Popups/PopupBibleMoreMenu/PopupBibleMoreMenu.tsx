import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../../context/ThemeContext';
import { COLORS } from '../../../constants/theme';
import { getAdaptiveSize } from '../../../constants/typography';

import { ThemedText } from '../../General/ThemedText/ThemedText';

import StarDark from '../../../assets/icons/bible/star-transparent-dark.svg';
import StarLight from '../../../assets/icons/bible/star-transparent-light.svg';

import { styles } from './PopupBibleMoreMenu.styles';

export type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PopupBibleMoreMenuProps = {
  visible: boolean;
  anchorRect: AnchorRect | null;
  onClose: () => void;
  onDidClose?: () => void;
  onPressFavourites?: () => void;
  onPressFontSize?: () => void;
};

const PopupBibleMoreMenu: React.FC<PopupBibleMoreMenuProps> = ({
  visible,
  anchorRect,
  onClose,
  onDidClose,
  onPressFavourites,
  onPressFontSize,
}) => {
  const { theme } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const [renderVisible, setRenderVisible] = useState(false);
  const lastAnchorRectRef = useRef<AnchorRect | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  const menuWidth = useMemo(() => getAdaptiveSize(250, false, 20), []);
  const menuHeight = useMemo(() => getAdaptiveSize(124, false, 24), []);
  const screenPadding = 12;

  const pos = useMemo(() => {
    if (!anchorRect) return { left: 0, top: 0 };

    const verticalGap = 2;
    const preferredTop = anchorRect.y + anchorRect.height + verticalGap;
    const anchorRight = anchorRect.x + anchorRect.width;
    const rightEdge = Math.min(anchorRight, screenWidth - screenPadding);

    let left = rightEdge - menuWidth;
    let top = preferredTop;

    left = Math.max(
      screenPadding,
      Math.min(left, screenWidth - menuWidth - screenPadding),
    );

    const wouldOverflowBottom = top + menuHeight + screenPadding > screenHeight;
    if (wouldOverflowBottom) {
      top = anchorRect.y - menuHeight - verticalGap;
    }

    top = Math.max(
      screenPadding,
      Math.min(top, screenHeight - menuHeight - screenPadding),
    );

    return { left, top };
  }, [anchorRect, menuHeight, menuWidth, screenHeight, screenWidth]);

  const cardBg = theme === 'light' ? COLORS.COLOR_WHITE : COLORS.COLOR_BLACK;

  const borderColors: readonly [string, string, ...string[]] =
    theme === 'dark'
      ? [
          'rgba(255,255,255,0.55)',
          'rgba(255,255,255,0.08)',
          'rgba(255,255,255,0.55)',
        ]
      : [
          'rgba(255,255,255,0.95)',
          'rgba(255,255,255,0.55)',
          'rgba(255,255,255,0.95)',
        ];

  const StarIcon = theme === 'light' ? StarDark : StarLight;

  useEffect(() => {
    if (visible && anchorRect) {
      lastAnchorRectRef.current = anchorRect;
      setRenderVisible(true);
      opacity.stopAnimation();
      scale.stopAnimation();
      opacity.setValue(0);
      scale.setValue(0.98);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    if (!renderVisible) return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.98,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) return;
      setRenderVisible(false);
      lastAnchorRectRef.current = null;
      onDidClose?.();
    });
  }, [anchorRect, onDidClose, opacity, renderVisible, scale, visible]);

  const effectiveAnchorRect = anchorRect ?? lastAnchorRectRef.current;
  if (!renderVisible || !effectiveAnchorRect) return null;

  return (
    <Modal transparent animationType="none" visible onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            width: menuWidth,
            opacity,
            transform: [{ scale }],
          }}
        >
          <LinearGradient
            colors={borderColors}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuGradient}
          >
            <View style={[styles.menuInner, { backgroundColor: cardBg }]}>
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => {
                  onPressFavourites?.();
                  onClose();
                }}
              >
                <View style={styles.iconBox}>
                  <StarIcon width={22} height={21} />
                </View>
                <ThemedText
                  variant="sfBody17Regular"
                  color={
                    theme === 'light' ? COLORS.GRAY_500 : COLORS.COLOR_WHITE
                  }
                >
                  Favourites
                </ThemedText>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => {
                  onPressFontSize?.();
                  onClose();
                }}
              >
                <View style={styles.iconBox}>
                  <ThemedText
                    variant="sfBody17Regular"
                    color={
                      theme === 'light' ? COLORS.GRAY_500 : COLORS.COLOR_WHITE
                    }
                  >
                    Aa
                  </ThemedText>
                </View>
                <ThemedText
                  variant="sfBody17Regular"
                  color={
                    theme === 'light' ? COLORS.GRAY_500 : COLORS.COLOR_WHITE
                  }
                >
                  Font Size
                </ThemedText>
              </Pressable>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PopupBibleMoreMenu;

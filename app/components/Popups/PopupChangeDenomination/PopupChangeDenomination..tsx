import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { COLORS } from '../../../constants/theme';
import { getAdaptiveSize } from '../../../constants/typography';

import CheckLight from '../../../assets/icons/streak/check-light.svg';
import CheckDark from '../../../assets/icons/streak/check-dark.svg';

import { ThemedText } from '../../General/ThemedText/ThemedText';
import { religions } from '../../../pages/OnboardingPages/Choices/ChoiceDenominationPage/ChoiceDenominationPage';

import { styles } from './PopupChangeDenomination.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { AnchorRect } from '../PopupBibleMoreMenu/PopupBibleMoreMenu';

export type PopupChangeDenominationProps = {
  visible: boolean;
  anchorRect: AnchorRect | null;
  onClose: () => void;
  onDidClose?: () => void;
  selectedReligion?: string;
  onReligionSelect?: (religion: string) => void;
};

const PopupChangeDenomination: React.FC<PopupChangeDenominationProps> = ({
  visible,
  anchorRect,
  onClose,
  onDidClose,
  selectedReligion,
  onReligionSelect,
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
  const iconSize = 12
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
              <ScrollView showsHorizontalScrollIndicator={false}>
                {religions.map((religion) => {
                  const isSelected = selectedReligion === religion;
                  return (
                    <Pressable
                      key={religion}
                      style={styles.item}
                      onPress={() => onReligionSelect?.(religion)}
                    >
                      <View style={styles.iconBox}>
                        <View
                          style={[
                            styles.checkBox,
                            {
                              borderColor: theme === 'light' ? COLORS.COLOR_BLACK : COLORS.COLOR_WHITE,
                              backgroundColor: isSelected ? (theme === 'light' ? COLORS.COLOR_BLACK : COLORS.COLOR_WHITE) : 'transparent',
                            }
                          ]}
                        >
                          {isSelected && (
                            theme === 'light' ? <CheckLight width={iconSize} height={iconSize} /> : <CheckDark width={iconSize} height={iconSize} />
                          )}
                        </View>
                      </View>
                      <ThemedText variant="sfBody17Regular" color={theme === 'light' ? COLORS.GRAY_500 : COLORS.COLOR_WHITE}>
                        {religion}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PopupChangeDenomination;

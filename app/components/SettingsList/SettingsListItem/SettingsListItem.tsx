import React, { useRef, useEffect } from 'react';

import { Pressable, StyleProp, View, ViewStyle, Animated } from 'react-native';

import { ThemedText } from '../../General/ThemedText/ThemedText';
import { ThemedView } from '../../General/ThemedView/ThemedView';
import { useTheme } from '../../../context/ThemeContext';
import { getAdaptiveSize } from '../../../constants/typography';
import { COLORS, COLORS_THEME } from '../../../constants/theme';
import { styles } from './SettingsListItem.styles';

import ArrowLight from '../../../assets/icons/settings/arrow-right-light.svg';
import ArrowDark from '../../../assets/icons/settings/arrow-right-dark.svg';

export type SettingsListItemProps = {
  title: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showDivider?: boolean;
  rotateArrow?: boolean;
};

const SettingsListItem = ({
  title,
  icon,
  onPress,
  style,
  showDivider = true,
  rotateArrow = false,
}: SettingsListItemProps) => {
  const { theme } = useTheme();
  const arrowRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arrowRotation, {
      toValue: rotateArrow ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [rotateArrow, arrowRotation]);

  const Arrow = theme === 'light' ? ArrowDark : ArrowLight;
  const dividerColor = theme === 'light' ? COLORS.GRAY_50 : COLORS.GRAY_700;
  const arrowColor =
    theme === 'light'
      ? COLORS_THEME.light.notification_text
      : COLORS_THEME.dark.notification_text;

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        style={({ pressed }) => [
          styles.row,
          pressed && !!onPress && styles.pressed,
        ]}
      >
        <ThemedView type="area" style={styles.iconBox}>
          {icon}
        </ThemedView>

        <ThemedText variant="sfBody17Regular" style={styles.title}>
          {title}
        </ThemedText>

        <View style={styles.right}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: arrowRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '90deg'],
                  }),
                },
              ],
            }}
          >
            <Arrow
              width={getAdaptiveSize(16, false, 3)}
              height={getAdaptiveSize(16, false, 3)}
            />
          </Animated.View>
        </View>
      </Pressable>

      {showDivider && (
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
      )}
    </View>
  );
};

export default SettingsListItem;

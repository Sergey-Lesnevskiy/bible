import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

type GradientColors = readonly [string, string, ...string[]];
type GradientLocations = readonly [number, number, ...number[]];

export type TopScrollGradientProps = {
  style?: StyleProp<ViewStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  colorsLight?: GradientColors;
  colorsDark?: GradientColors;
  locations?: GradientLocations;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

const TopScrollGradient: React.FC<TopScrollGradientProps> = ({
  style,
  opacity,
  colorsLight,
  colorsDark,
  locations,
  start,
  end,
}) => {
  const { theme } = useTheme();

  const resolvedColors: GradientColors =
    theme === 'light'
      ? (colorsLight ?? ['rgba(255,255,255,1)', 'rgba(255, 255, 255, 0)'])
      : (colorsDark ?? [COLORS.BLACK_10, 'rgba(0, 0, 0, 0)']);

  return (
    <Animated.View pointerEvents="none" style={[style, { opacity }]}>
      <LinearGradient
        pointerEvents="none"
        colors={resolvedColors}
        style={{ flex: 1 }}
        locations={locations}
        start={start ?? { x: 0, y: 0 }}
        end={end ?? { x: 0, y: 1 }}
      />
    </Animated.View>
  );
};

export default TopScrollGradient;

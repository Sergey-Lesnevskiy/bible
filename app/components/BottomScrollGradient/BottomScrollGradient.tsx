import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

type GradientColors = readonly [string, string, ...string[]];
type GradientLocations = readonly [number, number, ...number[]];

export type BottomScrollGradientProps = {
  style?: StyleProp<ViewStyle>;
  colorsLight?: GradientColors;
  colorsDark?: GradientColors;
  locations?: GradientLocations;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

const BottomScrollGradient: React.FC<BottomScrollGradientProps> = ({
  style,
  colorsLight,
  colorsDark,
  locations,
  start,
  end,
}) => {
  const { theme } = useTheme();

  const resolvedColors: GradientColors =
    theme === 'light'
      ? (colorsLight ?? ['rgba(255, 255, 255, 0)', 'rgba(255,255,255,1)'])
      : (colorsDark ?? ['rgba(0, 0, 0, 0)', COLORS.BLACK_10]);

  return (
    <LinearGradient
      pointerEvents="none"
      colors={resolvedColors}
      style={style}
      locations={locations}
      start={start ?? { x: 0, y: 0 }}
      end={end ?? { x: 0, y: 1 }}
    />
  );
};

export default BottomScrollGradient;

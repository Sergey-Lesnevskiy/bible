import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants/theme';
import { styles } from './ProgerssBar.styles';
import { ThemedView } from '../General/ThemedView/ThemedView';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  const { theme } = useTheme();
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: value,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <ThemedView style={[styles.containerProgress]} type="notification">
      <Animated.View
        style={[
          { width: widthInterpolation },
          theme === 'light'
            ? { backgroundColor: COLORS.COLOR_ICON_DARK }
            : { backgroundColor: COLORS.COLOR_WHITE },
        ]}
      />
    </ThemedView>
  );
};

export default ProgressBar;

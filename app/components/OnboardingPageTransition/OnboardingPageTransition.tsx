import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { COLORS_THEME } from '../../constants/theme';

interface OnboardingPageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingPageTransition: React.FC<OnboardingPageTransitionProps> = ({
  children,
  pageKey,
}) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateX.setValue(SCREEN_WIDTH);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pageKey]);

  const backgroundColor = COLORS_THEME[theme].launcher;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateX }],
          opacity,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OnboardingPageTransition;

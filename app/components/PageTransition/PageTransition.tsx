import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
 
 import { COLORS_THEME } from '../../constants/theme';
 import { useTheme } from '../../context/ThemeContext';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  isFadingOut: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey, isFadingOut }) => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFadingOut) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isFadingOut, fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: COLORS_THEME[theme].background, opacity: fadeAnim },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { useEffect, useRef, useState } from 'react';

import { Animated, Pressable, View, Dimensions } from 'react-native';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { ThemedView } from '../../General/ThemedView/ThemedView';
import { styles } from './CalendarTabs.styles';
import { COLORS_THEME } from '../../../constants/theme';
import { useTheme } from '../../../context/ThemeContext';

export type CalendarTabKey = 'daily_streak' | 'holy_calendar';

export type CalendarTabsProps = {
  value: CalendarTabKey;
  onChange: (next: CalendarTabKey) => void;
};

const CalendarTabs = ({ value, onChange }: CalendarTabsProps) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isInitialized, setIsInitialized] = useState(false);

  const onTabLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width);
  };

  useEffect(() => {
    const handleDimensionsChange = ({ window }: { window: any }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (tabWidth === 0) return;

    // Устанавливаем начальное значение без анимации при первой инициализации
    if (!isInitialized) {
      translateX.setValue(value === 'daily_streak' ? 0 : tabWidth);
      setIsInitialized(true);
      return;
    }

    Animated.spring(translateX, {
      toValue: value === 'daily_streak' ? 0 : tabWidth,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [value, translateX, tabWidth, dimensions, isInitialized]);

  return (
    <ThemedView type="notification" style={styles.container}>
      <View style={styles.tabsWrapper}>
        <Animated.View
          style={[
            styles.activeBackground,
            {
              backgroundColor: COLORS_THEME[theme].tabs,
              transform: [{ translateX }],
            },
          ]}
        />

        <Pressable
          onPress={() => onChange('daily_streak')}
          onLayout={onTabLayout}
          style={({ pressed }) => [
            styles.tab,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText variant="sfBody14Semibold" align="center">
            Daily Streak
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => onChange('holy_calendar')}
          onLayout={onTabLayout}
          style={({ pressed }) => [
            styles.tab,
            pressed && styles.pressed,
          ]}
        >
          <ThemedText variant="sfBody14Semibold" align="center">
            Holy Calendar
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
};

export default CalendarTabs;

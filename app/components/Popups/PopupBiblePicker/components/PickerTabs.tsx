import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';

import { COLORS } from '../../../../constants/theme';

import { ThemedText } from '../../../General/ThemedText/ThemedText';
import { ThemedView } from '../../../General/ThemedView/ThemedView';

import { styles } from '../PopupBiblePicker.styles';
import { getAdaptiveSize } from '../../../../constants/typography';

type PickerTabKey = 'books' | 'version';

type PickerTabsProps = {
  theme: 'light' | 'dark';
  tab: PickerTabKey;
  onChangeTab: (next: PickerTabKey) => void;
};

const PickerTabs: React.FC<PickerTabsProps> = ({ theme, tab, onChangeTab }) => {
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
      translateX.setValue(tab === 'books' ? 0 : tabWidth);
      setIsInitialized(true);
      return;
    }

    Animated.spring(translateX, {
      toValue: tab === 'books' ? 0 : tabWidth,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [tab, translateX, tabWidth, dimensions, isInitialized]);
  return (
    <View style={styles.tabsWrap}>
      <ThemedView
        type="notification"
        style={[
          styles.segmented,
          {
            backgroundColor:
              theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK,
          },
        ]}
      >
        <Pressable
          onPress={() => onChangeTab('books')}
          onLayout={onTabLayout}
          style={({ pressed }) => [
            styles.segmentedTab,
            tab === 'books' && {
              backgroundColor:
                theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_550,
            },
            pressed && styles.segmentedPressed,
          ]}
        >
          <ThemedText variant="sfBody14Semibold" align="center">
            Books
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => onChangeTab('version')}
          onLayout={onTabLayout}
          style={({ pressed }) => [
            styles.segmentedTab,
            tab === 'version' && {
              backgroundColor:
                theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_325,
            },
            pressed && styles.segmentedPressed,
          ]}
        >
          <ThemedText variant="sfBody14Semibold" align="center">
            Version
          </ThemedText>
        </Pressable>
        
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: getAdaptiveSize(44, false, 10),
              borderRadius: getAdaptiveSize(12, false, 1),
              width: tabWidth,
              backgroundColor: theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_550,
              transform: [{ translateX }],
              zIndex: -1,
            },
          ]}
        />
      </ThemedView>
    </View >
  );
};

export default PickerTabs;

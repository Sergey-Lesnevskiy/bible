import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { COLORS_THEME } from '../../constants/theme';
import IconMenu, { IconMenuKey } from '../../components/IconMenu/IconMenu';
import { RestoreStreakPage } from '../StreakPages/RestoreStreakPage/RestoreStreakPage';
import SettingsNoProPage from '../SettingsPages/SettingsPage';
import BiblePage from '../BiblePage/BiblePage';
import { useAppSelector } from '../../store/store';
import { currentPageSelector } from '../../store/features/page/selectors';
import { getAdaptiveSize } from '../../constants/typography';
import { PADDING, REMOVE_SIZE } from '../../constants/metrics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type MainPageKey = 'Today' | 'Settings' | 'Bible';

const pageToIconMenuKey: Record<MainPageKey, IconMenuKey> = {
  Today: 'home',
  Settings: 'settings',
  Bible: 'bible',
};

export const MainPages = memo(() => {
  const currentPage = useAppSelector(currentPageSelector);
  const { theme } = useTheme();

  const [currentMainPage, setCurrentMainPage] = useState<MainPageKey>(
    currentPage === 'Today' || currentPage === 'Settings' || currentPage === 'Bible'
      ? currentPage
      : 'Today'
  );
  const [previousMainPage, setPreviousMainPage] = useState<MainPageKey>(currentMainPage);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const currentPageRef = useRef(currentMainPage);

  useEffect(() => {
    currentPageRef.current = currentMainPage;
  }, [currentMainPage]);

  useEffect(() => {
    if (
      currentPage === 'Today' ||
      currentPage === 'Settings' ||
      currentPage === 'Bible'
    ) {
      if (currentPageRef.current !== currentPage) {
        setPreviousMainPage(currentPageRef.current);
        setCurrentMainPage(currentPage);

        slideAnim.setValue(0);
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      }
    }
  }, [currentPage, slideAnim]);

  const renderPageContent = useCallback((page: MainPageKey) => {
    switch (page) {
      case 'Today':
        return <RestoreStreakPage />;
      case 'Settings':
        return <SettingsNoProPage />;
      case 'Bible':
        return <BiblePage />;
      default:
        return null;
    }
  }, []);

  const backgroundColor = COLORS_THEME[theme].background;

  const pageOrder: MainPageKey[] = ['Today', 'Bible', 'Settings'];
  const currentIndex = pageOrder.indexOf(currentMainPage);
  const previousIndex = pageOrder.indexOf(previousMainPage);

  const direction = currentIndex > previousIndex ? 1 : -1;

  const previousPageTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH * direction],
  });

  const currentPageTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH * direction, 0],
  });

  const isTransitioning = previousMainPage !== currentMainPage;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        {isTransitioning && (
          <Animated.View
            style={[
              styles.pageContainer,
              {
                transform: [{ translateX: previousPageTranslateX }],
              },
            ]}
            pointerEvents="none"
          >
            {renderPageContent(previousMainPage)}
          </Animated.View>
        )}
        <Animated.View
          style={[
            styles.pageContainer,
            {
              transform: [
                { translateX: isTransitioning ? currentPageTranslateX : 0 },
              ],
            },
          ]}
        >
          {renderPageContent(currentMainPage)}
        </Animated.View>
      </View>

      <View pointerEvents="box-none" style={styles.iconMenuContainer}>
        <IconMenu activeKey={pageToIconMenuKey[currentMainPage]} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  pageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  iconMenuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: getAdaptiveSize(10, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: getAdaptiveSize(
      PADDING.screenBottomSmall,
      false,
      REMOVE_SIZE.SIZE_10,
    ),
    zIndex: 30,
  },
});

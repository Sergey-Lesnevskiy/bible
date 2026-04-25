import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { ErrorUtils } from 'react-native';
import * as Sentry from '@sentry/react-native';

import LaunchPage from './pages/OnboardingPages/LaunchPage/LaunchPage';
import { useFonts } from './hooks/useFonts';
import { loadFonts } from './utils/fontLoader';
import DayStreakPage from './pages/StreakPages/DayStreakPage/DayStreakPage';
import { MainPages } from './pages/MainPages';
import { PopupHost } from './components/Popups/PopupHost';
import { useAppDispatch, useAppSelector } from './store/store';
import { selectUserDataStatusSelector } from './store/features/userData/selectors';
import { currentPageSelector } from './store/features/page/selectors';
import { OnboardingPages } from './pages/OnboardingPages';
import { loadUserDataAction } from './store/features/userData/actions';
import { loadFavouritesVersesAction } from './store/features/favouritesVerses/actions';
import { COLORS_THEME } from './constants/theme';
import { useTheme } from './context/ThemeContext';
import CalendarPage from './pages/CalendarPages/CalendarPage';
import { PageTransition } from './components/PageTransition/PageTransition';
import PayWallPage from './pages/OnboardingPages/PayWallPage/PayWallPage';
import { TPage } from './store/features/page/constants';

// Sentry init (оставляем простой вариант для продакшена)
Sentry.init({
  dsn: 'https://c0453ba141d2c7ad163b6da80eeee892@o4510651741372416.ingest.de.sentry.io/4510677198110800',
  debug: false,
  enableNative: true,
  enabled: !__DEV__,
});

// Глобальный обработчик ошибок (только продакшен)
if (!__DEV__ && ErrorUtils) {
  const defaultHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log('[GLOBAL ERROR]', error?.message || error);
    Sentry.captureException(error);
    
    // Для фатальных ошибок показываем пользователю
    if (isFatal && global?.HermesInternal) {
      defaultHandler(error, isFatal);
    }
  });
}

export default Sentry.wrap(function App() {
  const isAppReady = useFonts(loadFonts);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const currentPage = useAppSelector(currentPageSelector);
  const userDataStatus = useAppSelector(selectUserDataStatusSelector);
  const [displayedPage, setDisplayedPage] = useState<TPage>('Loading');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [apphudInitialized, setApphudInitialized] = useState(false);

  // Инициализация Apphud (безопасно)
  useEffect(() => {
    let isMounted = true;
    
    const initApphud = async () => {
      // Пропускаем если уже инициализирован
      if (apphudInitialized) return;
      
      // Пропускаем на вебе и симуляторах
      if (Platform.OS === 'web') return;
      
      // Пропускаем если в __DEV__ (для локальной разработки)
      if (__DEV__) {
        console.log('[Apphud] Skipped in dev mode');
        return;
      }
      
      try {
        // Динамический импорт только в проде
        const { ApphudSdk } = await import('@apphud/react-native-apphud-sdk');
        
        if (!ApphudSdk || typeof ApphudSdk.start !== 'function') {
          console.log('[Apphud] SDK not available');
          return;
        }
        
        if (isMounted) {
          await ApphudSdk.start({
            apiKey: 'app_hw5LjkiU3WnzurYfz4zYyFmq6V4fN1',
          });
          console.log('[Apphud] Started successfully');
          setApphudInitialized(true);
        }
      } catch (error) {
        console.error('[Apphud] Init failed:', error);
        Sentry.captureException(error);
      }
    };
    
    initApphud();
    
    return () => {
      isMounted = false;
    };
  }, [apphudInitialized]);

  // Загрузка пользовательских данных
  useEffect(() => {
    if (userDataStatus === 'idle' && isAppReady) {
      dispatch(loadUserDataAction());
      dispatch(loadFavouritesVersesAction());
    }
  }, [userDataStatus, isAppReady, dispatch]);

  // Проверка готовности шрифтов
  if (!isAppReady) {
    return (
      <View style={[styles.root, styles.centered, { backgroundColor: '#FFFFFF' }]}>
        <Text style={{ fontSize: 16, color: '#000000' }}>Loading...</Text>
      </View>
    );
  }

  const isMainPage = (page: TPage) =>
    page === 'Today' || page === 'Settings' || page === 'Bible';

  useEffect(() => {
    if (currentPage === displayedPage) return;

    const isSwitchingWithinMainPages = isMainPage(currentPage) && isMainPage(displayedPage);

    if (isSwitchingWithinMainPages) {
      setDisplayedPage(currentPage);
      return;
    }

    setIsFadingOut(true);
    const timer = setTimeout(() => {
      setDisplayedPage(currentPage);
      setIsFadingOut(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentPage, displayedPage, isMainPage]);

  return (
    <View style={[styles.root, { backgroundColor: COLORS_THEME[theme].background }]}>
      {displayedPage === 'Loading' && (
        <PageTransition pageKey="Loading" isFadingOut={isFadingOut}>
          <LaunchPage />
        </PageTransition>
      )}

      {displayedPage === 'Onboarding' && (
        <PageTransition pageKey="Onboarding" isFadingOut={isFadingOut}>
          <OnboardingPages />
        </PageTransition>
      )}

      {(displayedPage === 'Today' || displayedPage === 'Settings' || displayedPage === 'Bible') && (
        <PageTransition pageKey={displayedPage} isFadingOut={isFadingOut}>
          <MainPages />
        </PageTransition>
      )}

      {displayedPage === 'Streak' && (
        <PageTransition pageKey="Streak" isFadingOut={isFadingOut}>
          <DayStreakPage />
        </PageTransition>
      )}

      {displayedPage === 'Calendar' && (
        <PageTransition pageKey="Calendar" isFadingOut={isFadingOut}>
          <CalendarPage />
        </PageTransition>
      )}

      {displayedPage === 'PayWall' && (
        <PageTransition pageKey="PayWall" isFadingOut={isFadingOut}>
          <PayWallPage />
        </PageTransition>
      )}
      
      <PopupHost />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
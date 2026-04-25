import { memo, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import LaunchPage from './LaunchPage/LaunchPage';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectUserDataSelector } from '../../store/features/userData/selectors';
import WelcomePage from './WelcomePage/WelcomePage';
import { isNotNil } from '../../utils/nil';
import NotificationPage from './NotificationPage/NotaficationPage';
import JoinFamilyPage from './JoinFamilyPage/JoinFamilyPage';
import ChoiceDenominationPage from './Choices/ChoiceDenominationPage/ChoiceDenominationPage';
import { useTheme } from '../../context/ThemeContext';
import { COLORS_THEME } from '../../constants/theme';
import {
  updateAgeGroupAction,
  updateBibleVersionAction,
  updateDenominationAction,
  updateGenderAction,
  updateStruggleAction,
} from '../../store/features/userData/actions';
import {
  TAgeGroup,
  TBibleVersion,
  TDenomination,
  TGender,
  TStruggle,
} from '../../store/features/userData/constants';
import ChoiceVersionPage from './Choices/ChoiceVersionPage/ChoiceVersionPage';
import ChoiceGroupPage from './Choices/ChoiceGroupPage/ChoiceGroupPage';
import ChoiceGenderPage from './Choices/ChoiceGenderPage/ChoiceGenderPage';
import ChoiceStrugglingPage from './Choices/ChoiceStrugglingPage/ChoiceStrugglingPage';
import LetterProblemPage from './LetterProblemPage/LetterProblemPage';
import RoadMapPage from './RoadMapPage/RoadMapPage';
import OfferPage from './ContinuoCenteredCtaPage/ContinuoOfferPage/OfferPage';
import ReminderPage from './ContinuoCenteredCtaPage/ContinuoReminderPage/ReminderPage';
import PayWallPage from './PayWallPage/PayWallPage';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { PADDING } from '../../constants/metrics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type TSelectedPage =
  | 'launch'
  | 'welcome'
  | 'joinMillionsOfBelievers'
  | 'joinFamily'
  | 'denomination'
  | 'bibleVersion'
  | 'ageGroup'
  | 'gender'
  | 'struggling'
  | 'facingMessage'
  | 'roadMap'
  | 'offerPage'
  | 'reminder'
  | 'payWallPage';

const OnboardingPages = memo(() => {
  const [currentPageOnboardingPage, setCurrentPageOnboardingPage] =
    useState<TSelectedPage>('launch');
  const [previousPage, setPreviousPage] = useState<TSelectedPage>('launch');
  const hasAutoNavigatedToWelcome = useRef(false);
  const hasAutoNavigatedToDenomination = useRef(false);

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(selectUserDataSelector);
  const { theme } = useTheme();

  const slideAnim = useRef(new Animated.Value(0)).current;

  const pageProgressMap: Record<TSelectedPage, number> = {
    launch: 0,
    welcome: 0,
    joinMillionsOfBelievers: 0,
    joinFamily: 0,
    denomination: 14,
    bibleVersion: 28,
    ageGroup: 42,
    gender: 56,
    struggling: 70,
    facingMessage: 84,
    roadMap: 90,
    offerPage: 95,
    reminder: 97,
    payWallPage: 100,
  };

  const pagesWithProgressBar: TSelectedPage[] = [
    'denomination',
    'bibleVersion',
    'ageGroup',
    'gender',
    'struggling',
    'facingMessage',
  ];

  const pageOrder: TSelectedPage[] = [
    'launch',
    'welcome',
    'joinMillionsOfBelievers',
    'joinFamily',
    'denomination',
    'bibleVersion',
    'ageGroup',
    'gender',
    'struggling',
    'facingMessage',
    'roadMap',
    'offerPage',
    'reminder',
    'payWallPage',
  ];

  const currentProgress = pageProgressMap[currentPageOnboardingPage];
  const hasProgressBar = (page: TSelectedPage) =>
    pagesWithProgressBar.includes(page);
  const currentHasProgressBar = hasProgressBar(currentPageOnboardingPage);
  const previousHasProgressBar = hasProgressBar(previousPage);
  const currentPageRef = useRef(currentPageOnboardingPage);
  
  useEffect(() => {
    currentPageRef.current = currentPageOnboardingPage;
  }, [currentPageOnboardingPage]);

  const handlePageChange = useCallback(
    (nextPage: TSelectedPage) => {
      if (currentPageRef.current === nextPage) {
        return;
      }

      setPreviousPage(currentPageRef.current);
      setCurrentPageOnboardingPage(nextPage);
      
      slideAnim.setValue(0);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    },
    [slideAnim],
  );
  useEffect(() => {
    if (
      isNotNil(userData.allowTrackActivity) &&
      currentPageOnboardingPage === 'launch' &&
      !hasAutoNavigatedToWelcome.current
    ) {
      hasAutoNavigatedToWelcome.current = true;
      handlePageChange('welcome');
    }

    if (
      isNotNil(userData.allowSendNotification) &&
      currentPageOnboardingPage === 'joinFamily' &&
      !hasAutoNavigatedToDenomination.current
    ) {
      hasAutoNavigatedToDenomination.current = true;
      handlePageChange('denomination');
    }
  }, [userData, currentPageOnboardingPage, handlePageChange]);

  const handleSelectDenomination = useCallback(
    (value: string) => {
      dispatch(updateDenominationAction(value as TDenomination));
    },
    [dispatch],
  );

  const handleSelectBibleVersion = useCallback(
    (value: string) => {
      dispatch(updateBibleVersionAction(value as TBibleVersion));
    },
    [dispatch],
  );

  const handleSelectAgeGroup = useCallback(
    (value: string) => {
      dispatch(updateAgeGroupAction(value as TAgeGroup));
    },
    [dispatch],
  );

  const handleSelectGender = useCallback(
    (value: string) => {
      dispatch(updateGenderAction(value as TGender));
    },
    [dispatch],
  );

  const handleSelectStruggling = useCallback(
    (value: string) => {
      dispatch(updateStruggleAction(value as TStruggle));
    },
    [dispatch],
  );

  const handleClickToBibleVersion = useCallback(() => {
    handlePageChange('bibleVersion');
  }, [handlePageChange]);

  const handleClickToAgeGroup = useCallback(() => {
    handlePageChange('ageGroup');
  }, [handlePageChange]);

  const handleClickToGender = useCallback(() => {
    handlePageChange('gender');
  }, [handlePageChange]);

  const handleClickToStruggling = useCallback(() => {
    handlePageChange('struggling');
  }, [handlePageChange]);

  const handleClickToFacingMessage = useCallback(() => {
    handlePageChange('facingMessage');
  }, [handlePageChange]);

  const handleClickToRoadMap = useCallback(() => {
    handlePageChange('roadMap');
  }, [handlePageChange]);

  const renderPageContent = useCallback(
    (page: TSelectedPage) => {
      switch (page) {
        case 'denomination':
          return (
            <ChoiceDenominationPage
              key="denomination"
              onClick={handleClickToBibleVersion}
              onSelect={handleSelectDenomination}
            />
          );
        case 'bibleVersion':
          return (
            <ChoiceVersionPage
              key="bibleVersion"
              onClick={handleClickToAgeGroup}
              onSelect={handleSelectBibleVersion}
            />
          );
        case 'ageGroup':
          return (
            <ChoiceGroupPage
              key="ageGroup"
              onClick={handleClickToGender}
              onSelect={handleSelectAgeGroup}
            />
          );
        case 'gender':
          return (
            <ChoiceGenderPage
              key="gender"
              onClick={handleClickToStruggling}
              onSelect={handleSelectGender}
            />
          );
        case 'struggling':
          return (
            <ChoiceStrugglingPage
              key="struggling"
              onClick={handleClickToFacingMessage}
              onSelect={handleSelectStruggling}
            />
          );
        case 'facingMessage':
          return (
            <LetterProblemPage key="facingMessage" onClick={handleClickToRoadMap} />
          );
        default:
          return null;
      }
    },
    [
      handleClickToBibleVersion,
      handleClickToAgeGroup,
      handleClickToGender,
      handleClickToStruggling,
      handleClickToFacingMessage,
      handleClickToRoadMap,
      handleSelectDenomination,
      handleSelectBibleVersion,
      handleSelectAgeGroup,
      handleSelectGender,
      handleSelectStruggling,
    ],
  );

  const renderPage = (page: TSelectedPage) => {
    switch (page) {
      case 'launch':
        return <LaunchPage onboarding />;
      case 'welcome':
        return (
          <WelcomePage
            onClick={() => handlePageChange('joinMillionsOfBelievers')}
          />
        );
      case 'joinMillionsOfBelievers':
        return (
          <NotificationPage onClick={() => handlePageChange('joinFamily')} />
        );
      case 'joinFamily':
        return <JoinFamilyPage />;
      case 'roadMap':
        return <RoadMapPage onClick={() => handlePageChange('offerPage')} />;
      case 'offerPage':
        return <OfferPage onClick={() => handlePageChange('reminder')} />;
      case 'reminder':
        return <ReminderPage onClick={() => handlePageChange('payWallPage')} />;
      case 'payWallPage':
        return <PayWallPage />;
      default:
        return null;
    }
  };

  const backgroundColor = COLORS_THEME[theme].launcher;

  const previousProgress = pageProgressMap[previousPage];

  const previousPageTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });

  const currentPageTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH, 0],
  });

  const isTransitioning = previousPage !== currentPageOnboardingPage;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {currentHasProgressBar && (
        <View style={styles.progressBarContainer}>
          <ProgressBar value={currentProgress} />
        </View>
      )}
      
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
            {previousHasProgressBar ? renderPageContent(previousPage) : renderPage(previousPage)}
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
          {currentHasProgressBar ? renderPageContent(currentPageOnboardingPage) : renderPage(currentPageOnboardingPage)}
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  progressBarContainer: {
    zIndex: 10,
    paddingHorizontal: PADDING.screenHorizontal,
    paddingTop: 28,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  pageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { OnboardingPages };

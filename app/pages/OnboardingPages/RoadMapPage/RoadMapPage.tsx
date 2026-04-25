import React, { FC, useRef, useState } from 'react';
import { styles } from './RoadMapPage.styles';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';

import SvgLight from '../../../assets/icons/onboarding/star-light.svg';
import SvgDark from '../../../assets/icons/onboarding/star-dark.svg';
import SvgBook from '../../../assets/icons/onboarding/book-dark.svg';

import IconBookLight from '../../../assets/icons/onboarding/book-light.svg';
import SvgTime from '../../../assets/icons/onboarding/time-dark.svg';
import SvgTimeLight from '../../../assets/icons/onboarding/time-light.svg';

import SvgBibleLight from '../../../assets/icons/onboarding/bible-light.svg';
import SvgGraphUpLight from '../../../assets/icons/onboarding/graph-up-light.svg';
import SvgStarsLight from '../../../assets/icons/onboarding/stars-light.svg';
import SvgHeartLight from '../../../assets/icons/onboarding/heart-light.svg';
import SvgBookLight from '../../../assets/icons/onboarding/book-light.svg';
import SvgHandHeatLight from '../../../assets/icons/onboarding/hand-heart-light.svg';
import { useTheme } from '../../../context/ThemeContext';

import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
} from 'react-native';
import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';
import WrapperContent from '../../../components/WrapperContent/WrapperContent';
import { SvgProps } from 'react-native-svg';
import SvgLightBulbLight from '../../../assets/icons/onboarding/light-bulb-light.svg';
import Step from '../../../components/Step/Step';
import { getAdaptiveSize } from '../../../constants/typography';
import { REMOVE_SIZE } from '../../../constants/metrics';
import TopScrollGradient from '../../../components/TopScrollGradient/TopScrollGradient';
import BottomScrollGradient from '../../../components/BottomScrollGradient/BottomScrollGradient';
import { IWithOnClick } from '../../../types/iWith';

interface DailyCard {
  id: number;
  day: string;
  title: string;
  description?: string;
  Icon: FC<SvgProps>;
  isFirstStep?: boolean;
}

const dailyCards: DailyCard[] = [
  {
    id: 1,
    day: 'DAY 1',
    title: 'Begin Your Day with Devotion and Reflection',
    description:
      "Begin with today's Scripture, devotion, and Bible wisdom. Take a moment to reflect and share — even the smallest steps lead to transformation",
    Icon: SvgBibleLight,
    isFirstStep: true,
  },
  {
    id: 2,
    day: 'DAY 2',
    title: 'Strengthen Your Insight',
    Icon: SvgLightBulbLight,
  },
  {
    id: 3,
    day: 'DAY 3',
    title: 'Commit to Steady Progress',
    Icon: SvgGraphUpLight,
  },
  {
    id: 4,
    day: 'DAY 4',
    title: 'Midweek Encouragement',
    Icon: SvgStarsLight,
  },
  {
    id: 5,
    day: 'DAY 5',
    title: 'Reflect and Renew',
    description:
      "Take a moment to look back on your week and go deeper into today's message. Notice how small steps create meaningful change",
    Icon: SvgHeartLight,
  },
  {
    id: 6,
    day: 'DAY 6',
    title: "Living Out What You've Learned",
    Icon: SvgBookLight,
  },
  {
    id: 7,
    day: 'DAY 7',
    title: 'Weekly Rest and Reflection',
    description:
      "You've reached the week's end! Take a moment to reflect on your progress and get ready for a peaceful, restorative day ahead",
    Icon: SvgHandHeatLight,
  },
];

const RoadMapPage = ({ onClick }: IWithOnClick) => {
  const { theme } = useTheme();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const currentScrollY = contentOffset.y;
    const paddingToBottom = 20;
    const isBottom =
      layoutMeasurement.height + currentScrollY >=
      contentSize.height - paddingToBottom;
    setIsAtBottom(isBottom);
  };

  const topGradientOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  const iconSize = getAdaptiveSize(40, false, REMOVE_SIZE.SIZE_10);
  const handleNextPage = () => {
    onClick();
  };
  return (
    <WrapperContent type="launcher" style={{ justifyContent: 'flex-start' }}>
      <View style={styles.scrollArea}>
        <TopScrollGradient
          style={styles.topGradient}
          opacity={topGradientOpacity}
        />

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.wrapperContainerScroll}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
              listener: handleScroll,
            },
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.containerHeader}>
            <View style={styles.imageContainer}>
              {theme === 'light' ? (
                <SvgDark width={iconSize} height={iconSize} />
              ) : (
                <SvgLight width={iconSize} height={iconSize} />
              )}
            </View>
            <View style={styles.containerText}>
              <ThemedText align="left" variant="sfTitle1Semibold">
                Start Your Walk of Faith
              </ThemedText>
              <ThemedText
                variant="sfBody17Regular"
                align="left"
                notifiCationText
              >
                Our mission is to support your spir itual growth and equip you
                with God’s Word to overcome life’s obstacles
              </ThemedText>
            </View>
            <ThemedView style={[styles.containerStatistic]} type="notification">
              <View style={[styles.firstsStatic, styles.static]}>
                {theme === 'light' ? <SvgBook /> : <IconBookLight />}
                <ThemedText variant="sfBody17Regular" align="left">
                  {'7 Sessions'}
                </ThemedText>
              </View>
              <View style={styles.static}>
                {theme === 'light' ? <SvgTime /> : <SvgTimeLight />}
                <ThemedText variant="sfBody17Regular" align="left">
                  {'<5 min/day'}
                </ThemedText>
              </View>
            </ThemedView>
          </View>
          <View style={styles.listStep}>
            {dailyCards.map((card, index) => (
              <Step
                key={card.id}
                day={card.day}
                title={card.title}
                description={card.description}
                Icon={card.Icon}
                isFirstStep={card.isFirstStep}
                isLastStep={index === dailyCards.length - 1}
              />
            ))}
          </View>
        </Animated.ScrollView>

        {!isAtBottom && <BottomScrollGradient style={styles.bottomGradient} />}
      </View>
      <View style={styles.containerButton}>
        <ThemedButton
          title="Continue"
          variant="primary"
          onlyWhiteText
          onPress={handleNextPage}
        />
      </View>
    </WrapperContent>
  );
};

export default RoadMapPage;

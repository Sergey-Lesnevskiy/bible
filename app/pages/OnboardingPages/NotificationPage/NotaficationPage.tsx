import React, { useRef, useState } from 'react';
import { styles } from './NotificationPage.styles';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';

import { useTheme } from '../../../context/ThemeContext';
import BottomScrollGradient from '../../../components/BottomScrollGradient/BottomScrollGradient';
import TopScrollGradient from '../../../components/TopScrollGradient/TopScrollGradient';

import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';
import { Notification } from '../../../components/Notification/Notification';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';
import { COLORS } from '../../../constants/theme';
import {
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import { IWithOnClick } from '../../../types/iWith';
import { MaxWidthContainerOnboarding } from '../../../components/MaxWidthContainer/MaxWidthContainerOnboarding/MaxWidthContainerOnboarding';

const NOTIFICATION_DATA = [
  {
    id: 1,
    name: 'Sophia',
    text: 'I love having a Bible verse always visible on my phone. It keeps me connected to scripture in a subtle, yet impactful way throughout the day.',
    star: 5,
  },
  {
    id: 2,
    name: 'John',
    text: 'This app is a wonderful tool for staying spiritually focused. I love how it helps me stay grounded in my faith with daily scripture reminders.',
    star: 5,
  },
  {
    id: 3,
    name: 'Olivia',
    text: "I added the widget, and it's been such a blessing. It reminds me of God's word whenever I need it, helping me stay centered throughout the day.",
    star: 5,
  },
  {
    id: 4,
    name: 'David',
    text: "This app helps me integrate scripture into my daily life. I love how I can have a verse available at all times to keep my focus on God's word.",
    star: 5,
  },
  {
    id: 5,
    name: 'Maya',
    text: "The daily scripture is such a great reminder of God's love and presence. I feel more spiritually connected just by having it visible on my phone.",
    star: 5,
  },
  {
    id: 6,
    name: 'Ethan',
    text: "The ability to keep a Bible verse easily accessible helps me stay focused on my faith. It's an easy way to reflect on God's word during the day.",
    star: 5,
  },
  {
    id: 7,
    name: 'Isabella',
    text: "I love how this app provides a quick spiritual boost every time I check my phone. It's the perfect way to keep God's word close to me.",
    star: 5,
  },
  {
    id: 8,
    name: 'Lucas',
    text: "This app has made it so much easier for me to stay connected to God's word. The verses I see every day are a daily source of strength and encouragement.",
    star: 5,
  },
  {
    id: 9,
    name: 'Amelia',
    text: "Having scripture on my phone helps me stay spiritually focused, especially during busy days. I love how it never gets in the way, but always reminds me of God's love.",
    star: 5,
  },
  {
    id: 10,
    name: 'Benjamin',
    text: "I love how the app integrates into my daily life. I can have a verse whenever I need to be reminded of God's word and stay spiritually focused.",
    star: 5,
  },
  {
    id: 11,
    name: 'Kate K.',
    text: "This app helped me build a consistent daily habit with God's Word. Simple, beautiful, and truly uplifting.",
    star: 5,
  },
];
const NotificationPage = ({ onClick }: IWithOnClick) => {
  const { theme } = useTheme();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollViewRef = useRef<any>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const currentScrollY = contentOffset.y;

    const paddingToBottom = 20;
    const isBottom =
      layoutMeasurement.height + currentScrollY >=
      contentSize.height - paddingToBottom;
    setIsAtBottom(isBottom);
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const topGradientOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <MaxWidthContainerOnboarding>
      <ThemedView style={styles.container} type="launcher">
        <TopScrollGradient
          style={styles.topGradient}
          opacity={topGradientOpacity}
          colorsLight={
            [
              'rgba(255,255,255,1)',
              'rgba(255,255,255,0.6)',
              'rgba(255,255,255,0)',
            ] as const
          }
          colorsDark={
            [
              COLORS.BLACK_10,
              'rgba(10, 10, 11, 0.7)',
              'rgba(10, 10, 11, 0)',
            ] as const
          }
          locations={[0, 0.55, 1] as const}
        />
        <Animated.ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
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
            {NOTIFICATION_DATA.map((item) => (
              <Notification
                key={item.id}
                name={item.name}
                text={item.text}
                star={item.star}
              />
            ))}
          </View>
          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>

        {!isAtBottom && (
          <BottomScrollGradient
            style={styles.bottomGradient}
            colorsLight={
              [
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.75)',
                'rgba(255,255,255,1)',
              ] as const
            }
            colorsDark={
              [
                'rgba(10, 10, 11, 0)',
                'rgba(10, 10, 11, 0.75)',
                'rgba(10, 10, 11, 0.99)',
                COLORS.BLACK_10,
              ] as const
            }
            locations={[0, 0.1, 0.2, 1] as const}
          />
        )}

        <View style={styles.overFlow}>
          <View style={[styles.overFlowContent]}>
            <ThemedText align="left" variant="sfTitle1Semibold">
              Join Millions of Believers Worldwide
            </ThemedText>
            <View style={styles.containerButton}>
              <ThemedButton
                title="Continue"
                variant="primary"
                onlyWhiteText
                onPress={onClick}
              />
            </View>
          </View>
        </View>
      </ThemedView>
    </MaxWidthContainerOnboarding>
  );
};

export default NotificationPage;

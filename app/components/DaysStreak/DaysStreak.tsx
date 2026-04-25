import React from 'react';
import { View } from 'react-native';
import { styles } from './DaysStreak.styles';
import { ThemedText } from '../General/ThemedText/ThemedText';

import CheckBlue from '../../assets/icons/streak/check-blue.svg';
import CheckLight from '../../assets/icons/streak/check-light.svg';
import { ThemedView } from '../General/ThemedView/ThemedView';
import { COLORS_THEME } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export interface DayContainerItem {
  day: number;
  isDone: boolean;
  nameDay: string;
}

interface DaysStreakProps {
  days?: DayContainerItem[];
  isNameContainer?: boolean;
}

const DaysStreak: React.FC<DaysStreakProps> = ({ days, isNameContainer }) => {
  const today = new Date().getDate();
  const { theme } = useTheme();
  return (
    <ThemedView type="notification" style={styles.container}>
      {isNameContainer && (
        <ThemedText variant="sfBody15Semibold">Calendar</ThemedText>
      )}
      <View style={styles.list}>
        {days?.map((item) => {
          const isToday = item.day === today;
          const isFuture = item.day > today;
          const showDoneAsToday = item.isDone && isToday;

          return (
            <View key={item.day} style={styles.item}>
              <ThemedView
                type="background"
                style={[
                  styles.circle,
                  showDoneAsToday && styles.circleDone,
                  !showDoneAsToday && {
                    backgroundColor: COLORS_THEME[theme].tabs,
                  },
                ]}
              >
                {item.isDone ? (
                  showDoneAsToday ? (
                    <CheckLight width={18} height={18} />
                  ) : (
                    <CheckBlue width={18} height={18} />
                  )
                ) : (
                  <ThemedText
                    variant="sfBody13Regular"
                    notifiCationText={isFuture}
                    align="center"
                  >
                    {item.day}
                  </ThemedText>
                )}
              </ThemedView>
              <ThemedText
                variant="sfBody13Regular"
                align="center"
                notifiCationText={isFuture}
                style={styles.nameDay}
              >
                {item.nameDay}
              </ThemedText>
            </View>
          );
        })}
      </View>
    </ThemedView>
  );
};

export default DaysStreak;

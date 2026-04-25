import React from 'react';

import { Pressable, View } from 'react-native';
import { styles } from './DayCell.styles';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { COLORS, COLORS_THEME } from '../../../constants/theme';
import { useTheme } from '../../../context/ThemeContext';

export type DayCellProps = {
  dayNumber: number;
  isInMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isHoliday?: boolean;
  workedSegment?: 'single' | 'start' | 'middle' | 'end';
  longestWorkedSegment?: 'single' | 'start' | 'middle' | 'end';
  onPress: () => void;
};

const DayCell = ({
  dayNumber,
  isInMonth,
  isSelected,
  isToday,
  isHoliday,
  workedSegment,
  longestWorkedSegment,
  onPress,
}: DayCellProps) => {
  const { theme } = useTheme();

  const outMonthColor = theme === 'light' ? COLORS.GRAY_230 : COLORS.GRAY_425;

  const isSelectedColorPrimary = COLORS_THEME[theme].notification;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {workedSegment && workedSegment !== 'single' ? (
        <View
          style={[
            styles.workBar,
            workedSegment === 'start' && [
              styles.workBarStart,
              {
                backgroundColor: isSelectedColorPrimary,
              },
            ],

            workedSegment === 'middle' &&
            styles.workBarMiddle && { backgroundColor: isSelectedColorPrimary },

            workedSegment === 'end' && [
              styles.workBarEnd,
              workedSegment === 'end' && isToday && styles.workBarEndToday,
              {
                backgroundColor: isSelectedColorPrimary,
              },
            ],
          ]}
        />
      ) : null}
      {longestWorkedSegment && longestWorkedSegment !== 'single' ? (
        <View
          style={[
            styles.workBar,
            longestWorkedSegment === 'start' && [
              styles.workBarStart,
              {
                backgroundColor: isSelectedColorPrimary,
              },
            ],

            longestWorkedSegment === 'middle' &&
            styles.workBarMiddle && { backgroundColor: isSelectedColorPrimary },
            longestWorkedSegment === 'end' && isToday && styles.workBarEndToday,

            longestWorkedSegment === 'end' && [
              styles.workBarEnd,
              {
                backgroundColor: isSelectedColorPrimary,
              },
            ],
          ]}
        />
      ) : null}
      <View
        style={[
          styles.circle,
          isToday && styles.todayCircle,
          isHoliday && !isToday && { backgroundColor: isSelectedColorPrimary },
          workedSegment &&
          !isToday &&
          !isHoliday && { backgroundColor: isSelectedColorPrimary },
        ]}
      >
        <ThemedText
          variant="sfBody17Regular"
          align="center"
          onlyWhiteText={isToday}
          color={!isInMonth ? outMonthColor : undefined}
        >
          {dayNumber}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default DayCell;

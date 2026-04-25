import React from 'react';

import { View } from 'react-native';
import DayCell from '../DayCell/DayCell';
import { styles } from './MonthGrid.styles';

export type CalendarDay = {
  date: Date;
  dayNumber: number;
  isInMonth: boolean;
};

export type MonthGridProps = {
  days: CalendarDay[];
  selectedDate: Date;
  today: Date;
  holidayDates?: string[]; // ISO yyyy-mm-dd
  currentStreakDates?: string[]; // ISO yyyy-mm-dd
  longestStreakDates?: string[]; // ISO yyyy-mm-dd
  onSelectDay: (day: CalendarDay) => void;
};

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const pad2 = (n: number) => String(n).padStart(2, '0');

const toIsoDate = (d: Date) => {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const addDays = (d: Date, delta: number) => {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  copy.setDate(copy.getDate() + delta);
  return copy;
};

const MonthGrid = ({
  days,
  selectedDate,
  today,
  holidayDates,
  currentStreakDates,
  longestStreakDates,
  onSelectDay,
}: MonthGridProps) => {
  return (
    <View style={styles.container}>
      {days.map((d) => {
        const key = `${d.date.getFullYear()}-${d.date.getMonth()}-${d.date.getDate()}`;
        const isHoliday = holidayDates
          ? holidayDates.includes(toIsoDate(d.date))
          : false;
        const iso = toIsoDate(d.date);
        const isWorked = currentStreakDates ? currentStreakDates.includes(iso) : false;
        const isLongestWorked = longestStreakDates ? longestStreakDates.includes(iso) : false;

        const prevIso = toIsoDate(addDays(d.date, -1));
        const nextIso = toIsoDate(addDays(d.date, 1));
        const prevWorked = currentStreakDates ? currentStreakDates.includes(prevIso) : false;
        const nextWorked = currentStreakDates ? currentStreakDates.includes(nextIso) : false;

        const workedSegment = isWorked
          ? prevWorked && nextWorked
            ? 'middle'
            : prevWorked
              ? 'end'
              : nextWorked
                ? 'start'
                : 'single'
          : undefined;

        const prevLongestWorked = longestStreakDates ? longestStreakDates.includes(prevIso) : false;
        const nextLongestWorked = longestStreakDates ? longestStreakDates.includes(nextIso) : false;

        const longestWorkedSegment = isLongestWorked
          ? prevLongestWorked && nextLongestWorked
            ? 'middle'
            : prevLongestWorked
              ? 'end'
              : nextLongestWorked
                ? 'start'
                : 'single'
          : undefined;
        return (
          <DayCell
            key={key}
            dayNumber={d.dayNumber}
            isInMonth={d.isInMonth}
            isSelected={sameDay(d.date, selectedDate)}
            isToday={sameDay(d.date, today)}
            isHoliday={isHoliday}
            workedSegment={workedSegment}
            longestWorkedSegment={longestWorkedSegment}
            onPress={() => onSelectDay(d)}
          />
        );
      })}
    </View>
  );
};

export default MonthGrid;

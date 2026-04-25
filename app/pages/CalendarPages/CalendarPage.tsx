import React, { useMemo } from 'react';

import { styles } from './CalendarPage.styles';
import WrapperContent from '../../components/WrapperContent/WrapperContent';
import BaseCalendarContainer, {
  CalendarContext,
} from '../../components/Calendar/BaseCalendarContainer/BaseCalendarContainer';

import StatsCards from '../../components/Calendar/StatsCards/StatsCards';

import {
  currentStreakSelector,
  currentStreakLengthSelector,
  longestStreakLengthSelector,
  longestStreakSelector,
} from '../../store/features/streak/selectors';

import {
  getHolidaysForDate,
  getHolidaysForMonth,
} from '../../utils/getHolidaysFromStore';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCalendarModeAction } from '../../store/features/page/actions';
import { selectHolidaysDataSelector } from '../../store/features/holidays/selectors';
import { selectUserDataDenominationSelector } from '../../store/features/userData/selectors';
import { calendarPageModeSelector } from '../../store/features/page/selectors';
import HolidayNotification from '../../components/Calendar/HolidayNotification/HolidayNotification';

/* utils */
const pad2 = (n: number) => String(n).padStart(2, '0');
const toIsoDate = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const CalendarPage = () => {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(
    calendarPageModeSelector,
  );

  /* DAILY */
  const currentStreakDays = useAppSelector(currentStreakSelector);
  const dailyStreakDays = useAppSelector(currentStreakLengthSelector);
  const longestStreakDaysLength = useAppSelector(longestStreakLengthSelector);
  const longestStreakDays = useAppSelector(longestStreakSelector);

  /* HOLY */
  const holidaysData = useAppSelector(selectHolidaysDataSelector);
  const denomination = useAppSelector(selectUserDataDenominationSelector);

  const onTabChange = () => {
    dispatch(
      setCalendarModeAction({
        mode: mode === 'daily' ? 'holy' : 'daily',
      }),
    );
  };
  /* min / max month */
  const minMonth = useMemo(() => {
    if (mode === 'daily') {
      return new Date(2025, 7, 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }, [mode]);

  const maxMonth = useMemo(() => {
    if (mode === 'daily') {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    return undefined;
  }, [mode]);
  /* GRID PROPS */
  const getMonthGridProps = useMemo(() => {
    if (mode === 'daily') {
      return (ctx: CalendarContext) => {
        const year = ctx.currentMonth.getFullYear();
        const monthIndex = ctx.currentMonth.getMonth();

        const currentStreakDates = currentStreakDays
          ?.filter(
            (d) =>
              d.getFullYear() === year &&
              d.getMonth() === monthIndex,
          )
          .map(toIsoDate);

        const longestStreakDates = longestStreakDays
          ?.filter(
            (d) =>
              d.getFullYear() === year &&
              d.getMonth() === monthIndex,
          )
          .map(toIsoDate);

        return { currentStreakDates, longestStreakDates };
      };
    }

    return (ctx: CalendarContext) => {
      const monthHolidays = getHolidaysForMonth(
        holidaysData,
        denomination,
        ctx.currentMonth.getFullYear(),
        ctx.currentMonth.getMonth(),
      );
      return { holidayDates: monthHolidays.map((h) => h.date) };
    };
  }, [mode, currentStreakDays, longestStreakDays, holidaysData, denomination]);

  /* FOOTER */
  const renderFooter = useMemo(() => {
    if (mode === 'daily') {
      return () => (
        <StatsCards
          left={{
            icon: 'moon',
            value: dailyStreakDays,
            label: 'Daily Streak',
            isDaily: true,
          }}
          right={{
            icon: 'moon',
            value: longestStreakDaysLength,
            label: 'Longest Streak',
          }}
        />
      );
    }

    return (ctx: CalendarContext) => {
      const selected = getHolidaysForDate(
        holidaysData,
        denomination,
        ctx.selectedDate,
      );

      if (!selected.length) return null;

      const h = selected[0];

      return (
        <HolidayNotification
          title={h.title}
          description={h.description || ''}
          date={h.date} 
        />
      );
    };
  }, [
    mode,
    dailyStreakDays,
    longestStreakDaysLength,
    holidaysData,
    denomination,
  ]);

  return (
    <WrapperContent style={styles.wrapperContent}>
        <BaseCalendarContainer
          headerTitle="Calendar"
          activeTab={mode === 'daily' ? 'daily_streak' : 'holy_calendar'}
          onTabChange={onTabChange}
          minMonth={minMonth}
          maxMonth={maxMonth}
          getMonthGridProps={getMonthGridProps}
          renderFooter={renderFooter}
        />
      </WrapperContent>
  );
};

export default CalendarPage;
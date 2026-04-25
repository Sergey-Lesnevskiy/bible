import React, { useMemo } from 'react';

import { PanResponder, View, type ViewStyle } from 'react-native';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarTabs, {
  type CalendarTabKey,
} from '../CalendarTabs/CalendarTabs';
import MonthNavigator from '../MonthNavigator/MonthNavigator';
import WeekdayRow from '../WeekdayRow/WeekdayRow';
import MonthGrid, { type MonthGridProps } from '../MonthGrid/MonthGrid';
import { useCalendarMonth } from '../../../hooks/useCalendarMonth';
import { defaultStyles } from './BaseCalendarContainer.styles';
import { useTheme } from '../../../context/ThemeContext';
import { useAppDispatch } from '../../../store/store';
import { selectPageAction } from '../../../store/features/page/actions';

export type BaseCalendarPageStyles = {
  container: ViewStyle;
  card: ViewStyle;
  divider: ViewStyle;
  footerCards: ViewStyle;
};

export type CalendarContext = {
  currentMonth: Date;
  selectedDate: Date;
  monthTitle: string;
  today: Date;
};

export type BaseCalendarContainerProps = {
  headerTitle: string;
  activeTab: CalendarTabKey;
  onTabChange: (next: CalendarTabKey) => void;
  styles?: BaseCalendarPageStyles;
  minMonth?: Date;
  maxMonth?: Date;
  getMonthGridProps?: (
    ctx: CalendarContext,
  ) => Pick<MonthGridProps, 'holidayDates' | 'currentStreakDates' | 'longestStreakDates'>;
  renderFooter?: (ctx: CalendarContext) => React.ReactNode;
};

const monthStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

const isSameOrAfterMonth = (a: Date, b: Date) => {
  const aa = monthStart(a);
  const bb = monthStart(b);
  return aa.getTime() >= bb.getTime();
};

const isSameOrBeforeMonth = (a: Date, b: Date) => {
  const aa = monthStart(a);
  const bb = monthStart(b);
  return aa.getTime() <= bb.getTime();
};

const BaseCalendarContainer = ({
  headerTitle,
  activeTab,
  onTabChange,
  styles,
  minMonth,
  maxMonth,
  getMonthGridProps,
  renderFooter,
}: BaseCalendarContainerProps) => {
  const resolvedStyles = styles ?? defaultStyles;
  const {
    currentMonth,
    selectedDate,
    monthTitle,
    days,
    today,
    onPrevMonth,
    onNextMonth,
    onSelectDay,
  } = useCalendarMonth();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const handleBackToHome = () => {
    dispatch(selectPageAction({ page: 'Today' }));
  };

  const canGoPrev = minMonth
    ? isSameOrAfterMonth(currentMonth, minMonth) &&
      currentMonth.getTime() !== monthStart(minMonth).getTime()
    : true;
  const canGoNext = maxMonth
    ? isSameOrBeforeMonth(currentMonth, maxMonth) &&
      currentMonth.getTime() !== monthStart(maxMonth).getTime()
    : true;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    onPrevMonth();
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    onNextMonth();
  };
  const panResponder = useMemo(() => {
    const swipeThreshold = 50;
    const activateThreshold = 10;

    return PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) => {
        const { dx, dy } = gesture;
        return Math.abs(dx) > activateThreshold && Math.abs(dx) > Math.abs(dy);
      },
      onPanResponderRelease: (_evt, gesture) => {
        const { dx } = gesture;
        if (dx <= -swipeThreshold) handleNextMonth();
        if (dx >= swipeThreshold) handlePrevMonth();
      },
      onPanResponderTerminate: () => {
        // no-op
      },
    });
  }, [handleNextMonth, handlePrevMonth]);

  const ctx = useMemo<CalendarContext>(() => {
    return { currentMonth, selectedDate, monthTitle, today };
  }, [currentMonth, selectedDate, monthTitle, today]);

  const monthGridExtras = getMonthGridProps
    ? getMonthGridProps(ctx)
    : undefined;
    
  return (
    <View style={resolvedStyles.container}>
      <CalendarHeader title={headerTitle} onBack={handleBackToHome} />

      <View style={resolvedStyles.card}>
        <CalendarTabs value={activeTab} onChange={onTabChange} />

        <MonthNavigator
          title={monthTitle}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          prevDisabled={!canGoPrev}
          nextDisabled={!canGoNext}
        />

        <WeekdayRow />
        <View
          style={[
            resolvedStyles.divider,
            { backgroundColor: theme === 'light' ? '#1823461F' : '#BBBBBB1F' },
          ]}
        />

        <View {...panResponder.panHandlers}>
          <MonthGrid
            days={days}
            selectedDate={selectedDate}
            today={today}
            onSelectDay={onSelectDay}
            holidayDates={monthGridExtras?.holidayDates}
            currentStreakDates={monthGridExtras?.currentStreakDates}
            longestStreakDates={monthGridExtras?.longestStreakDates}
          />
        </View>

        <View style={resolvedStyles.footerCards}>
          {renderFooter ? renderFooter(ctx) : null}
        </View>
      </View>
    </View>
  );
};

export default BaseCalendarContainer;

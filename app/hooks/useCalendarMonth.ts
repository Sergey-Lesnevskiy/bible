import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';

import { buildMonthDays, monthNames } from '../utils/calendarUtils';

export type UseCalendarMonthResult = {
  currentMonth: Date;
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  monthTitle: string;
  days: Array<{ date: Date; dayNumber: number; isInMonth: boolean }>;
  today: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: { date: Date }) => void;
};

export const useCalendarMonth = (): UseCalendarMonthResult => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  const monthTitle = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  const days = useMemo(() => buildMonthDays(currentMonth), [currentMonth]);

  const today = new Date();

  const onPrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const onNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const onSelectDay = (day: { date: Date }) => {
    setSelectedDate(day.date);
  };

  return {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    monthTitle,
    days,
    today,
    onPrevMonth,
    onNextMonth,
    onSelectDay,
  };
};

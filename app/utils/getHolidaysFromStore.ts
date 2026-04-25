import type { Holiday } from '../types/calendar';
import type { IHolidaysData, IHoliday } from '../store/features/holidays/constants';
import type { TDenomination } from '../store/features/userData/constants';

const pad2 = (n: number) => String(n).padStart(2, '0');

const toIsoDate = (d: Date) => {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const sameMonth = (dateIso: string, year: number, monthIndex: number) => {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getFullYear() === year && d.getMonth() === monthIndex;
};

const convertHolidayToCalendarFormat = (holiday: IHoliday): Holiday => ({
  id: `${holiday.date}-${holiday.title}`,
  date: holiday.date,
  title: holiday.title,
  description: holiday.description,
  type: 'religious',
});

const getDenominationHolidays = (
  holidaysData: IHolidaysData | null,
  denomination: TDenomination | undefined,
): IHoliday[] => {
  if (!holidaysData || !denomination) {
    return [];
  }

  const denominationKey = denomination as keyof IHolidaysData;
  
  if (denominationKey in holidaysData) {
    return holidaysData[denominationKey];
  }

  return holidaysData.Catholic || [];
};

export const getHolidaysForMonth = (
  holidaysData: IHolidaysData | null,
  denomination: TDenomination | undefined,
  year: number,
  monthIndex: number,
): Holiday[] => {
  const holidays = getDenominationHolidays(holidaysData, denomination);
  
  return holidays
    .filter((h) => sameMonth(h.date, year, monthIndex))
    .map(convertHolidayToCalendarFormat);
};

export const getHolidaysForDate = (
  holidaysData: IHolidaysData | null,
  denomination: TDenomination | undefined,
  date: Date,
): Holiday[] => {
  const iso = toIsoDate(date);
  const holidays = getDenominationHolidays(holidaysData, denomination);
  
  return holidays
    .filter((h) => h.date === iso)
    .map(convertHolidayToCalendarFormat);
};

export const getTodayHoliday = (
  holidaysData: IHolidaysData | null,
  denomination: TDenomination | undefined,
): IHoliday | null => {
  const today = new Date();
  const iso = toIsoDate(today);
  const holidays = getDenominationHolidays(holidaysData, denomination);
  
  return holidays.find((h) => h.date === iso) || null;
};

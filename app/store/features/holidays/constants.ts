export const HOLIDAYS_FEATURE_KEY = 'holidays';

export interface IHoliday {
  date: string;
  variation: string;
  title: string;
  description: string;
  observanceLevel: string;
}

export interface IHolidaysData {
  Catholic: IHoliday[];
  Protestant: IHoliday[];
  Methodist: IHoliday[];
}

export type THolidaysStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface IHolidaysState {
  data: IHolidaysData | null;
  status: THolidaysStatus;
}

import { RootState } from '../../store';

export const selectHolidaysSelector = (state: RootState) => state.holidays;

export const selectHolidaysDataSelector = (state: RootState) =>
  state.holidays.data;

export const selectHolidaysStatusSelector = (state: RootState) =>
  state.holidays.status;

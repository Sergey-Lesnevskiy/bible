import { RootState } from '../../store';

export const currentPageSelector = (state: RootState) => state.page.page;
export const calendarPageModeSelector = (state: RootState) => state.page.calendarMode;

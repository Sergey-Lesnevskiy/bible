import { createAction } from '@reduxjs/toolkit';
import { PAGE_FEATURE_KEY, TPage } from './constants';

export const selectPageAction = createAction<{ page: TPage }>(
  `${PAGE_FEATURE_KEY}/selectPageAction`,
);
export const setCalendarModeAction = createAction<{
  mode: 'daily' | 'holy';
}>('page/setCalendarMode');
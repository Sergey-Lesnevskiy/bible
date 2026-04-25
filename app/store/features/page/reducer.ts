import { IPageState } from './constants';
import { createReducer } from '@reduxjs/toolkit';
import { selectPageAction, setCalendarModeAction } from './actions';

const initialState: IPageState = {
  page: 'Loading',
  calendarMode: 'daily',
};

const pageReducer = createReducer(initialState, (builder) => {
  builder.addCase(selectPageAction, (state, action) => {
    state.page = action.payload.page;
  });
  builder.addCase(setCalendarModeAction, (state, action) => {
  state.calendarMode = action.payload.mode;
});
});

export { pageReducer };

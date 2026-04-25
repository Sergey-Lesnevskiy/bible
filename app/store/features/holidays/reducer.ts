import { createReducer } from '@reduxjs/toolkit';
import { IHolidaysState } from './constants';
import {
  setHolidaysDataAction,
  setHolidaysStatusAction,
} from './actions';

const initialState: IHolidaysState = {
  data: null,
  status: 'idle',
};

const holidaysReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setHolidaysDataAction, (state, action) => {
      state.data = action.payload;
    })
    .addCase(setHolidaysStatusAction, (state, action) => {
      state.status = action.payload;
    });
});

export { holidaysReducer };

import { createReducer } from '@reduxjs/toolkit';
import { type IStreakState } from './constants';
import {
  addCurrentStreakAction,
  addLongestStreakAction,
  setCurrentStreakAction,
  setLastRestoreDateAction,
  setLongestStreakAction,
  setRestoreChancesAction,
  setStreaksAction,
} from './actions';

const initialState: IStreakState = {
  longestStreakDates: null,
  currentStreakDates: null,
  lastRestoreDate: null,
  restoreChances: null,
  docId: null,
};

const streakReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentStreakAction, (state, action) => {
      state.currentStreakDates = action.payload;
    })
    .addCase(setLongestStreakAction, (state, action) => {
      state.longestStreakDates = action.payload;
    })
    .addCase(addCurrentStreakAction, (state, action) => {
      state.currentStreakDates?.push(action.payload);
    })
    .addCase(addLongestStreakAction, (state, action) => {
      state.longestStreakDates?.push(action.payload);
    })
    .addCase(setStreaksAction, (state, action) => {
      state.longestStreakDates = action.payload.longestStreakDates;
      state.currentStreakDates = action.payload.currentStreakDates;
      state.lastRestoreDate = action.payload.lastRestoreDate;
      state.restoreChances = action.payload.restoreChances;
      state.docId = action.payload.docId;
    })
    .addCase(setLastRestoreDateAction, (state, action) => {
      state.lastRestoreDate = action.payload;
    })
    .addCase(setRestoreChancesAction, (state, action) => {
      state.restoreChances = action.payload;
    });
});

export { streakReducer };

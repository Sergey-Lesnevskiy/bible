import { createAction } from '@reduxjs/toolkit';
import { IStreakState, STREAK_FEATURE_KEY } from './constants';
import { TNullable } from '../../../types/Nullable';

const loadStreaksAction = createAction(
  `${STREAK_FEATURE_KEY}/loadStreaksAction`,
);

interface IUploadStreaksAction {
  currentStreak: Date[];
  longestStreak: Date[];
  lastRestoreDate: TNullable<Date>;
  restoreChances: number;
  tryAgainAction: VoidFunction;
  cancelAction: VoidFunction;
}

const uploadStreaksAction = createAction<IUploadStreaksAction>(
  `${STREAK_FEATURE_KEY}/uploadStreaksAction`,
);

const incrementCurrentStreakAction = createAction(
  `${STREAK_FEATURE_KEY}/incrementCurrentStreakAction`,
);

const setStreaksAction = createAction<IStreakState>(
  `${STREAK_FEATURE_KEY}/setStreaksAction`,
);

const setCurrentStreakAction = createAction<Date[]>(
  `${STREAK_FEATURE_KEY}/setCurrentStreakAction`,
);

const setLongestStreakAction = createAction<Date[]>(
  `${STREAK_FEATURE_KEY}/setLongestStreakAction`,
);

const addCurrentStreakAction = createAction<Date>(
  `${STREAK_FEATURE_KEY}/addCurrentStreakAction`,
);

const addLongestStreakAction = createAction<Date>(
  `${STREAK_FEATURE_KEY}/addLongestStreakAction`,
);

const setLastRestoreDateAction = createAction<Date>(
  `${STREAK_FEATURE_KEY}/setLastRestoreDateAction`,
);

const setRestoreChancesAction = createAction<number>(
  `${STREAK_FEATURE_KEY}/setRestoreChancesAction`,
);

const restoreStreakAction = createAction(
  `${STREAK_FEATURE_KEY}/restoreStreakAction`,
);

const startNewStreakAction = createAction(
  `${STREAK_FEATURE_KEY}/startNewStreakAction`,
);

export {
  loadStreaksAction,
  uploadStreaksAction,
  incrementCurrentStreakAction,
  setCurrentStreakAction,
  setLongestStreakAction,
  addCurrentStreakAction,
  addLongestStreakAction,
  setStreaksAction,
  setLastRestoreDateAction,
  setRestoreChancesAction,
  restoreStreakAction,
  startNewStreakAction,
};

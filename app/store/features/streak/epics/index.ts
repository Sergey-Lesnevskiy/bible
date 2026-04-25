import { combineEpics } from 'redux-observable';
import { loadStreaksEpic } from './loadStreaksEpic';
import { incrementCurrentStreakEpic } from './incrementCurrentStreakEpic';
import { uploadStreaksEpic } from './uploadStreaksEpic';
import { restoreStreakEpic } from './restoreStreakEpic';
import { startNewStreakEpic } from './startNewStreakEpic';

const streakRootEpic = combineEpics(
  loadStreaksEpic,
  incrementCurrentStreakEpic,
  uploadStreaksEpic,
  restoreStreakEpic,
  startNewStreakEpic,
);

export { streakRootEpic };

import type { TNullable } from '../../../types/Nullable';

const STREAK_FEATURE_KEY = 'streak';

interface IStreakState {
  longestStreakDates: TNullable<Date[]>;
  currentStreakDates: TNullable<Date[]>;
  lastRestoreDate: TNullable<Date>;
  restoreChances: TNullable<number>;
  docId: TNullable<string>;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export { STREAK_FEATURE_KEY, type IStreakState, DAY_MS };

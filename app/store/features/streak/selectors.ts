import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { DAY_MS } from './constants';
import { isNil } from '../../../utils/nil';

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const todayStart = () => startOfDay(new Date());

const getLastDateStart = (dates: Date[] | null) => {
  if (isNil(dates) || dates.length === 0) return null;
  return startOfDay(dates[dates.length - 1]);
};

const currentStreakSelector = (state: RootState) =>
  state.streak.currentStreakDates;

const longestStreakSelector = (state: RootState) =>
  state.streak.longestStreakDates;

const currentStreakLengthSelector = createSelector(
  currentStreakSelector,
  (currentStreak) => (isNil(currentStreak) ? 0 : currentStreak.length),
);

const longestStreakLengthSelector = createSelector(
  longestStreakSelector,
  (longestStreak) => {
    if (isNil(longestStreak) || longestStreak.length === 0) return 0;
    if (longestStreak.length === 1) return 1;
    
    // Сортируем даты
    const sortedDates = [...longestStreak]
    .map(date => new Date(date).getTime())
    .sort((a, b) => a - b);
    
    let maxStreak = 1;
    let currentStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currentDate = new Date(sortedDates[i]);
      
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Непрерывная серия продолжается
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        // Серия прервалась, начинаем новую
        currentStreak = 1;
      }
    }
    
    return maxStreak;
  },
);


const isLastCurrentStreakYesterdaySelector = createSelector(
  currentStreakSelector,
  (currentStreak) => {
    const lastDate = getLastDateStart(currentStreak);
    if (isNil(lastDate)) return false;

    const yesterday = todayStart() - DAY_MS;
    return lastDate === yesterday;
  },
);

const isLastCurrentStreakTodaySelector = createSelector(
  currentStreakSelector,
  (currentStreak) => {
    const lastDate = getLastDateStart(currentStreak);
    if (isNil(lastDate)) return false;

    return lastDate === todayStart();
  },
);

const isLastCurrentStreakExactlyTwoDaysAgoSelector = createSelector(
  currentStreakSelector,
  (currentStreak) => {
    const lastDate = getLastDateStart(currentStreak);
    if (isNil(lastDate)) return false;

    const twoDaysAgo = todayStart() - DAY_MS * 2;
    return lastDate === twoDaysAgo;
  },
);

const isLastCurrentStreakOlderThanTwoDaysSelector = createSelector(
  currentStreakSelector,
  (currentStreak) => {
    const lastDate = getLastDateStart(currentStreak);
    if (isNil(lastDate)) return false;

    const twoDaysAgo = todayStart() - DAY_MS * 2;
    return lastDate < twoDaysAgo;
  },
);

const lastRestoreDateSelector = (state: RootState) =>
  state.streak.lastRestoreDate;

const restoreChancesSelector = (state: RootState) =>
  state.streak.restoreChances;

const docIdSelector = (state: RootState) => state.streak.docId;

export {
  currentStreakSelector,
  longestStreakSelector,
  currentStreakLengthSelector,
  longestStreakLengthSelector,
  isLastCurrentStreakYesterdaySelector,
  isLastCurrentStreakTodaySelector,
  isLastCurrentStreakExactlyTwoDaysAgoSelector,
  isLastCurrentStreakOlderThanTwoDaysSelector,
  lastRestoreDateSelector,
  restoreChancesSelector,
  docIdSelector,
};

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { currentStreakSelector, currentStreakLengthSelector } from '../store/features/streak/selectors';
import { getCurrentWeekDays } from '../utils/streakUtils';

export const useStreakData = () => {
  const currentStreakDates = useSelector((state: RootState) => currentStreakSelector(state));
  const currentStreakLength = useSelector((state: RootState) => currentStreakLengthSelector(state));
  
  const DayContainer = getCurrentWeekDays(currentStreakDates);
  const day = currentStreakLength || 1;
  
  return {
    currentStreakDates,
    currentStreakLength,
    DayContainer,
    day
  };
};

import { EpicType } from '../../../common/constants';
import { ofType } from 'redux-observable';
import {
  addCurrentStreakAction,
  incrementCurrentStreakAction,
  setCurrentStreakAction,
  setLongestStreakAction,
  uploadStreaksAction,
} from '../actions';
import { catchError, switchMap } from 'rxjs/operators';
import { Logger } from '../../../../api/logger';
import {
  currentStreakSelector,
  isLastCurrentStreakExactlyTwoDaysAgoSelector,
  isLastCurrentStreakOlderThanTwoDaysSelector,
  isLastCurrentStreakTodaySelector,
  isLastCurrentStreakYesterdaySelector,
  lastRestoreDateSelector,
  longestStreakSelector,
  restoreChancesSelector,
} from '../selectors';
import { isNil } from '../../../../utils/nil';
import { of } from 'rxjs';
import { openPopupAction } from '../../popup/actions';
import { selectPageAction } from '../../page/actions';

const tryAgainAction = () => {
  import('./../../../store').then(({ store }) => {
    store.dispatch(incrementCurrentStreakAction());
  });
};

const incrementCurrentStreakEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(incrementCurrentStreakAction.type),
    switchMap(() => {
      const currentStreak = currentStreakSelector(state$.value);
      const longestStreak = longestStreakSelector(state$.value);
      const lastRestoreDate = lastRestoreDateSelector(state$.value);
      const restoreChances = restoreChancesSelector(state$.value);

      const isCurrentStreakToday = isLastCurrentStreakTodaySelector(state$.value);
      const isCurrentStreakYesterday = isLastCurrentStreakYesterdaySelector(
        state$.value,
      );
      const isCurrentStreakExactlyTwoDaysAgo =
        isLastCurrentStreakExactlyTwoDaysAgoSelector(state$.value);
      const isCurrentStreakOlderThanTwoDays =
        isLastCurrentStreakOlderThanTwoDaysSelector(state$.value);

      if (
        isNil(currentStreak) ||
        isNil(longestStreak) ||
        isNil(restoreChances)
      ) {
        Logger.error(
          'Increment current streak',
          'Current streak, longest streak or restore chances are nil',
          ['incrementCurrentStreakEpic'],
        );

        return of(
          openPopupAction({
            key: 'somethingWrong',
            payload: { onCancel: tryAgainAction, onTryAgain: tryAgainAction },
          }),
        );
      }

      // Если стрик уже увеличен сегодня - ничего не делаем
      if (isCurrentStreakToday) {
        return of();
      }

      // Если последний стрик был вчера - автоматически увеличиваем и показываем DayStreakPage
      if (isCurrentStreakYesterday) {
        const newCurrentStreak = [...currentStreak, new Date()];
        const shouldUpdateLongest = newCurrentStreak.length >= longestStreak.length;

        const newLongestStreak = shouldUpdateLongest
          ? newCurrentStreak
          : longestStreak;

        return of(
          addCurrentStreakAction(new Date()),
          ...(shouldUpdateLongest ? [setLongestStreakAction(newLongestStreak)] : []),
          uploadStreaksAction({
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastRestoreDate,
            restoreChances,
            tryAgainAction,
            cancelAction: tryAgainAction,
          }),
          selectPageAction({ page: 'Streak' }),
        );
      }

      // Если прошло ровно 2 дня - показываем попап восстановления
      if (isCurrentStreakExactlyTwoDaysAgo) {
        return of(openPopupAction({ key: 'restoreStreak' }));
      }

      // Если прошло больше 2 дней - автоматически сбрасываем стрик
      if (isCurrentStreakOlderThanTwoDays) {
        const newCurrentStreak = [new Date()];

        return of(
          setCurrentStreakAction(newCurrentStreak),
          uploadStreaksAction({
            currentStreak: newCurrentStreak,
            longestStreak: longestStreak,
            lastRestoreDate,
            restoreChances,
            tryAgainAction,
            cancelAction: tryAgainAction,
          }),
          selectPageAction({ page: 'Streak' }),
        );
      }

      // Если стрик был сегодня или вчера уже обработали выше
      return of();
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['incrementCurrentStreakEpic']);

      return source$;
    }),
  );

export { incrementCurrentStreakEpic };

import { ofType } from 'redux-observable';
import {
  startNewStreakAction,
  setCurrentStreakAction,
  uploadStreaksAction,
} from '../actions';
import { EpicType } from '../../../common/constants';
import { switchMap, catchError } from 'rxjs/operators';
import { Logger } from '../../../../api/logger';
import { of } from 'rxjs';
import {
  longestStreakSelector,
  lastRestoreDateSelector,
  restoreChancesSelector,
} from '../selectors';
import { isNil } from '../../../../utils/nil';
import { openPopupAction } from '../../popup/actions';

const tryAgainAction = () => {
  import('./../../../store').then(({ store }) => {
    store.dispatch(startNewStreakAction());
  });
};

const startNewStreakEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(startNewStreakAction.type),
    switchMap(() => {
      const longestStreak = longestStreakSelector(state$.value);
      const lastRestoreDate = lastRestoreDateSelector(state$.value);
      const restoreChances = restoreChancesSelector(state$.value);

      if (isNil(longestStreak) || isNil(restoreChances)) {
        Logger.error(
          'Start new streak',
          'Longest streak or restore chances are nil',
          ['startNewStreakEpic'],
        );

        return of(
          openPopupAction({
            key: 'somethingWrong',
            payload: { onCancel: tryAgainAction, onTryAgain: tryAgainAction },
          }),
        );
      }

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
      );
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['startNewStreakEpic']);

      return source$;
    }),
  );

export { startNewStreakEpic };

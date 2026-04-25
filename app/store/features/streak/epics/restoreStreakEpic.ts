import { EpicType } from '../../../common/constants';
import { ofType } from 'redux-observable';
import {
  restoreStreakAction,
  addCurrentStreakAction,
  setLongestStreakAction,
  uploadStreaksAction,
  setLastRestoreDateAction,
  setRestoreChancesAction,
} from '../actions';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Logger } from '../../../../api/logger';
import { defer, of } from 'rxjs';
import {
  currentStreakSelector,
  longestStreakSelector,
  lastRestoreDateSelector,
  isLastCurrentStreakYesterdaySelector,
  isLastCurrentStreakOlderThanTwoDaysSelector,
} from '../selectors';
import { isNil } from '../../../../utils/nil';
import { openPopupAction } from '../../popup/actions';
import { StorageService } from '../../../../api/storageService';
import { selectUserDataIsProSelector } from '../../userData/selectors';

const RESTORE_DATA_STORAGE_KEY = 'restoreData';
const storageService = new StorageService();

interface IRestoreData {
  restreaksLeft: number;
  lastRestreakDate: Date;
  restoreChances: number;
}

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

const tryAgainAction = () => {
  import('./../../../store').then(({ store }) => {
    store.dispatch(restoreStreakAction());
  });
};

const restoreStreakEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(restoreStreakAction.type),
    switchMap(() => {
      const currentStreak = currentStreakSelector(state$.value);
      const longestStreak = longestStreakSelector(state$.value);
      const lastRestoreDate = lastRestoreDateSelector(state$.value);
      const isPro = selectUserDataIsProSelector(state$.value);
      const isYesterday = isLastCurrentStreakYesterdaySelector(state$.value);
      const isOlderThanTwoDays = isLastCurrentStreakOlderThanTwoDaysSelector(state$.value);

      if (isNil(currentStreak) || isNil(longestStreak)) {
        Logger.error(
          'Restore streak',
          'Current streak or longest streak are nil',
          ['restoreStreakEpic'],
        );

        return of(
          openPopupAction({
            key: 'somethingWrong',
            payload: { onCancel: tryAgainAction, onTryAgain: tryAgainAction },
          }),
        );
      }

      // Non-PRO users can only restore if they missed exactly 1 day (yesterday)
      if (!isPro && !isYesterday) {
        return of(
          openPopupAction({
            key: 'confirmToast',
            payload: { text: 'Only PRO users can restore streaks after missing 2+ days' },
          }),
        );
      }

      // PRO users can restore even after 2+ missed days
      // Non-PRO users can only restore if last streak was yesterday

      return defer(() =>
        storageService.getItem<IRestoreData>(RESTORE_DATA_STORAGE_KEY),
      ).pipe(
        mergeMap((restoreData) => {
          const today = new Date();
          let restreaksLeft = 3;
          let restoreChances = 3;

          if (restoreData && restoreData.lastRestreakDate) {
            const lastDate = new Date(restoreData.lastRestreakDate);
            restoreChances = restoreData.restoreChances || 3;

            if (isSameMonth(lastDate, today)) {
              restreaksLeft = restoreData.restreaksLeft;

              if (restreaksLeft <= 0) {
                return of(
                  openPopupAction({
                    key: 'somethingWrong',
                    payload: {
                      onCancel: tryAgainAction,
                      onTryAgain: tryAgainAction,
                    },
                  }),
                );
              }

              restreaksLeft -= 1;
              restoreChances -= 1;
            } else {
              restreaksLeft = 2;
              restoreChances = 2;
            }
          } else {
            restreaksLeft = 2;
            restoreChances = 2;
          }

          const newRestoreData: IRestoreData = {
            restreaksLeft,
            lastRestreakDate: today,
            restoreChances,
          };

          return defer(() =>
            storageService.setItem(RESTORE_DATA_STORAGE_KEY, newRestoreData),
          ).pipe(
            mergeMap(() => {
              const isSameLength =
                currentStreak.length + 1 >= longestStreak.length;

              const updatedCurrentStreak = [...currentStreak, today];
              const newLastRestoreDate = today;
              const newRestoreChances = restoreChances - 1;

              if (isSameLength) {
                const updatedLongestStreak = [...currentStreak, today];

                return of(
                  addCurrentStreakAction(today),
                  setLongestStreakAction(updatedLongestStreak),
                  setLastRestoreDateAction(newLastRestoreDate),
                  setRestoreChancesAction(newRestoreChances),
                  uploadStreaksAction({
                    currentStreak: updatedCurrentStreak,
                    longestStreak: updatedLongestStreak,
                    lastRestoreDate: newLastRestoreDate,
                    restoreChances: newRestoreChances,
                    tryAgainAction,
                    cancelAction: tryAgainAction,
                  }),
                );
              }

              return of(
                addCurrentStreakAction(today),
                setLastRestoreDateAction(newLastRestoreDate),
                setRestoreChancesAction(newRestoreChances),
                uploadStreaksAction({
                  currentStreak: updatedCurrentStreak,
                  longestStreak: longestStreak,
                  lastRestoreDate: newLastRestoreDate,
                  restoreChances: newRestoreChances,
                  tryAgainAction,
                  cancelAction: tryAgainAction,
                }),
                openPopupAction({
                  key: 'confirmToast',
                  payload: { text: 'Your streak is restored 🙏 Keep going!' },
                }),
              );
            }),
            catchError((error) => {
              Logger.error('Restore streak storage', error, [
                'restoreStreakEpic',
              ]);

              return of(
                openPopupAction({
                  key: 'somethingWrong',
                  payload: {
                    onCancel: tryAgainAction,
                    onTryAgain: tryAgainAction,
                  },
                }),
              );
            }),
          );
        }),
      );
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['restoreStreakEpic']);

      return source$;
    }),
  );

export { restoreStreakEpic };

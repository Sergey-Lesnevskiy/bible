import { EpicType } from '../../../common/constants';
import { ofType } from 'redux-observable';
import {
  incrementCurrentStreakAction,
  loadStreaksAction,
  setStreaksAction,
  uploadStreaksAction,
} from '../actions';
import { catchError, switchMap, delay, mergeMap } from 'rxjs/operators';
import { selectUserDataIdSelector } from '../../userData/selectors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../api/firebase';
import { EDBCollection } from '../../../../constants/firebase';
import { from, of, timer, concat } from 'rxjs';
import { isNetworkError } from '../../../../utils/isNetworkError';
import { openPopupAction } from '../../popup/actions';
import { Logger } from '../../../../api/logger';
import { selectPageAction } from '../../page/actions';
import { isNil } from '../../../../utils/nil';
import { convertFirestoreTimestamps } from '../../../common/utils';

const MINIMUM_LOADING_TIME = 2000;
let loadingStartTime: number | null = null;

const tryAgainAction = () => {
  import('./../../../store').then(({ store }) => {
    store.dispatch(loadStreaksAction());
  });
};

const loadStreaksEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(loadStreaksAction.type),
    switchMap(() => {
      loadingStartTime = Date.now();
      const userId = selectUserDataIdSelector(state$.value);
      const streaksQuery = query(
        collection(db, EDBCollection.STREAKS),
        where('id', '==', userId),
      );

      if (isNil(userId)) {
        Logger.error('Load streaks data', 'User id is nil', [
          'loadStreaksEpic',
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
      }

      return from(getDocs(streaksQuery)).pipe(
        switchMap((querySnapshot) => {
          const elapsedTime = Date.now() - (loadingStartTime || 0);
          const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const streaksData = docSnap.data();

            const dataActions = [
              setStreaksAction({
                longestStreakDates: convertFirestoreTimestamps(
                  streaksData.longestStreak,
                ),
                currentStreakDates: convertFirestoreTimestamps(
                  streaksData.currentStreak,
                ),
                lastRestoreDate: streaksData.lastRestoreDate,
                restoreChances: streaksData.restoreChances,
                docId: docSnap.id,
              }),
              incrementCurrentStreakAction(),
            ];

            const pageAction = [selectPageAction({ page: 'Today' })];

            return concat(
              from(dataActions),
              timer(remainingTime).pipe(mergeMap(() => from(pageAction))),
            );
          } else {
            const dataActions = [
              setStreaksAction({
                longestStreakDates: [new Date()],
                currentStreakDates: [new Date()],
                lastRestoreDate: null,
                restoreChances: 3,
                docId: null,
              }),
              uploadStreaksAction({
                currentStreak: [new Date()],
                longestStreak: [new Date()],
                lastRestoreDate: null,
                restoreChances: 3,
                tryAgainAction,
                cancelAction: tryAgainAction,
              }),
            ];

            const pageAction = [selectPageAction({ page: 'Today' })];

            return concat(
              from(dataActions),
              timer(remainingTime).pipe(mergeMap(() => from(pageAction))),
            );
          }
        }),
        catchError((error) => {
          const networkIssue = isNetworkError(error);

          if (networkIssue) {
            return of(
              openPopupAction({
                key: 'noInternet',
                payload: {
                  onCancel: tryAgainAction,
                  onTryAgain: tryAgainAction,
                },
              }),
            );
          }

          Logger.error('Load streaks data', error, ['loadStreaksEpic']);

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
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['loadStreaksEpic']);

      return source$;
    }),
  );

export { loadStreaksEpic };

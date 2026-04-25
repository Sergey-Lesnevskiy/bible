import { EpicType } from '../../../common/constants';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Logger } from '../../../../api/logger';
import { selectUserDataIdSelector } from '../../userData/selectors';
import { isNilValues } from '../../../../utils/nil';
import { from, of } from 'rxjs';
import { openPopupAction } from '../../popup/actions';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../api/firebase';
import { EDBCollection } from '../../../../constants/firebase';
import { isNetworkError } from '../../../../utils/isNetworkError';
import { ofType } from 'redux-observable';
import { uploadStreaksAction, setStreaksAction } from '../actions';
import { docIdSelector } from '../selectors';

const uploadStreaksEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(uploadStreaksAction.type),
    map((action) => (action as ReturnType<typeof uploadStreaksAction>).payload),
    switchMap(
      ({
        currentStreak,
        longestStreak,
        tryAgainAction,
        cancelAction,
        restoreChances,
        lastRestoreDate,
      }) => {
        const userId = selectUserDataIdSelector(state$.value);
        const existingDocId = docIdSelector(state$.value);

        if (isNilValues(userId, currentStreak, longestStreak)) {
          Logger.error('Upload streaks data', 'User id is nil', [
            'uploadStreaksEpic',
          ]);

          return of(
            openPopupAction({
              key: 'somethingWrong',
              payload: {
                onCancel: cancelAction,
                onTryAgain: tryAgainAction,
              },
            }),
          );
        }

        const streakData = {
          id: userId,
          currentStreak: currentStreak,
          longestStreak: longestStreak,
          restoreChances: restoreChances,
          lastRestoreDate: lastRestoreDate,
        };

        const uploadPromise = existingDocId
          ? setDoc(doc(db, EDBCollection.STREAKS, existingDocId), streakData)
          : addDoc(collection(db, EDBCollection.STREAKS), streakData);

        return from(uploadPromise).pipe(
          switchMap((result) => {
            if (!existingDocId && result) {
              return of(
                setStreaksAction({
                  longestStreakDates: longestStreak,
                  currentStreakDates: currentStreak,
                  lastRestoreDate: lastRestoreDate,
                  restoreChances: restoreChances,
                  docId: result.id,
                }),
              );
            }
            return of();
          }),
          catchError((error) => {
            const networkIssue = isNetworkError(error);

            if (networkIssue) {
              return of(
                openPopupAction({
                  key: 'noInternet',
                  payload: {
                    onCancel: cancelAction,
                    onTryAgain: tryAgainAction,
                  },
                }),
              );
            }

            Logger.error('Upload streaks data', error, ['uploadStreaksEpic']);

            return of(
              openPopupAction({
                key: 'somethingWrong',
                payload: {
                  onCancel: cancelAction,
                  onTryAgain: tryAgainAction,
                },
              }),
            );
          }),
        );
      },
    ),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['uploadStreaksEpic']);

      return source$;
    }),
  );

export { uploadStreaksEpic };

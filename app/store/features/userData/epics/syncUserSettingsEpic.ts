import { ofType } from 'redux-observable';
import { concat, EMPTY, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { EpicType, MOCK_APPLE_ID } from '../../../common/constants';
import {
  changeDenominationAndSyncAction,
  changeBibleVersionAndSyncAction,
  updateBibleVersionAction,
  updateDenominationAction,
  updateDocIdAction,
} from '../actions';
import { selectUserDataDocIdSelector, selectUserDataSelector } from '../selectors';
import { db } from '../../../../api/firebase';
import { EDBCollection } from '../../../../constants/firebase';
import { isNetworkError } from '../../../../utils/isNetworkError';
import { openPopupAction } from '../../popup/actions';
import { voidFn } from '../../../../constants/voidFn';
import { Logger } from '../../../../api/logger';

const tryAgainFactory = (action: any) => () => {
  import('./../../../store').then(({ store }) => {
    store.dispatch(action);
  });
};

const syncUserSettingsEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(
      changeDenominationAndSyncAction.type,
      changeBibleVersionAndSyncAction.type,
    ),
    switchMap((action) => {
      const existingDocId = selectUserDataDocIdSelector(state$.value);
      const { userData } = selectUserDataSelector(state$.value);

      if (action.type === changeDenominationAndSyncAction.type) {
        const payload = (action as ReturnType<typeof changeDenominationAndSyncAction>)
          .payload;
        const denomination = payload;
        const optimisticAction = updateDenominationAction(denomination as any);

        const uploadPromise = existingDocId
          ? setDoc(
              doc(db, EDBCollection.USERS, existingDocId),
              { denomination },
              { merge: true },
            )
          : addDoc(collection(db, EDBCollection.USERS), {
              id: MOCK_APPLE_ID,
              ...userData,
              denomination,
            });

        const upload$ = from(uploadPromise).pipe(
          switchMap((result) => {
            if (!existingDocId && result) {
              return of(updateDocIdAction(result.id));
            }
            return EMPTY;
          }),
          catchError((error) => {
            const networkIssue = isNetworkError(error);
            if (networkIssue) {
              return of(
                openPopupAction({
                  key: 'noInternet',
                  payload: {
                    onCancel: voidFn,
                    onTryAgain: tryAgainFactory(action),
                  },
                }),
              );
            }

            Logger.error('Sync denomination', error, ['syncUserSettingsEpic']);

            return of(
              openPopupAction({
                key: 'somethingWrong',
                payload: {
                  onCancel: voidFn,
                  onTryAgain: tryAgainFactory(action),
                },
              }),
            );
          }),
        );

        return concat(of(optimisticAction), upload$);
      }

      const payload = (action as ReturnType<typeof changeBibleVersionAndSyncAction>)
        .payload;
      const optimisticAction = updateBibleVersionAction(payload as any);

      const uploadPromise = existingDocId
        ? setDoc(
            doc(db, EDBCollection.USERS, existingDocId),
            { bibleVersion: payload },
            { merge: true },
          )
        : addDoc(collection(db, EDBCollection.USERS), {
            id: MOCK_APPLE_ID,
            ...userData,
            bibleVersion: payload,
          });

      const upload$ = from(uploadPromise).pipe(
        switchMap((result) => {
          if (!existingDocId && result) {
            return of(updateDocIdAction(result.id));
          }
          return EMPTY;
        }),
        catchError((error) => {
          const networkIssue = isNetworkError(error);
          if (networkIssue) {
            return of(
              openPopupAction({
                key: 'noInternet',
                payload: {
                  onCancel: voidFn,
                  onTryAgain: tryAgainFactory(action),
                },
              }),
            );
          }

          Logger.error('Sync bibleVersion', error, ['syncUserSettingsEpic']);

          return of(
            openPopupAction({
              key: 'somethingWrong',
              payload: {
                onCancel: voidFn,
                onTryAgain: tryAgainFactory(action),
              },
            }),
          );
        }),
      );

      return concat(of(optimisticAction), upload$);
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['syncUserSettingsEpic']);
      return source$;
    }),
  );

export { syncUserSettingsEpic };

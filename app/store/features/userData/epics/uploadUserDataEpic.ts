import { EpicType, MOCK_APPLE_ID } from '../../../common/constants';
import { ofType } from 'redux-observable';
import {
  setUserDataStatusAction,
  updateIdAction,
  updateDocIdAction,
  updateUserDataPaymentMethodAction,
  uploadUserDataAction,
  updateBibleVersionAction,
  updateDenominationAction,
  updateAgeGroupAction,
  updateGenderAction,
  updateStruggleAction,
  updateFacingMessageAction,
  updateAllowTrackActivityAction,
  updateAllowSendNotificationAction,
} from '../actions';
import { catchError, switchMap } from 'rxjs/operators';
import { selectUserDataSelector, selectUserDataDocIdSelector } from '../selectors';
import { from, of } from 'rxjs';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../api/firebase';
import { EDBCollection } from '../../../../constants/firebase';
import { isNetworkError } from '../../../../utils/isNetworkError';
import { openPopupAction } from '../../popup/actions';
import { voidFn } from '../../../../constants/voidFn';
import { Logger } from '../../../../api/logger';
import { loadStreaksAction } from '../../streak/actions';
import { loadHolidaysAction } from '../../holidays/actions';

const tryAgainActionFactory =
  (paymentMethod: 'not now' | 'restore' | 'weekly' | 'yearly') => () => {
    import('./../../../store').then(({ store }) => {
      store.dispatch(uploadUserDataAction({ paymentMethod }));
    });
  };

const uploadUserDataEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(uploadUserDataAction.type),
    switchMap((action) => {
      const payload = (action as ReturnType<typeof uploadUserDataAction>)
        .payload;
      const { paymentMethod } = payload;
      const { userData } = selectUserDataSelector(state$.value);
      const existingDocId = selectUserDataDocIdSelector(state$.value);

      const userDataToUpload = {
        id: MOCK_APPLE_ID,
        denomination:
          userData.denomination === 'Other'
            ? 'Catholic'
            : userData.denomination,
        ...userData,
        paymentMethod,
      };

      const uploadPromise = existingDocId
        ? setDoc(doc(db, EDBCollection.USERS, existingDocId), userDataToUpload)
        : addDoc(collection(db, EDBCollection.USERS), userDataToUpload);

      return from(uploadPromise).pipe(
        switchMap((result) => {
          const actions = [];

          if (!existingDocId && result) {
            actions.push(updateDocIdAction(result.id));
          }

          actions.push(updateIdAction(MOCK_APPLE_ID));
          actions.push(updateUserDataPaymentMethodAction({ paymentMethod }));

          if (userData.bibleVersion) {
            actions.push(updateBibleVersionAction(userData.bibleVersion));
          }

          if (userData.denomination) {
            const denomination =
              userData.denomination === 'Other'
                ? 'Catholic'
                : userData.denomination;
            actions.push(updateDenominationAction(denomination));
          }

          if (userData.ageGroup) {
            actions.push(updateAgeGroupAction(userData.ageGroup));
          }

          if (userData.gender) {
            actions.push(updateGenderAction(userData.gender));
          }

          if (userData.struggle) {
            actions.push(updateStruggleAction(userData.struggle));
          }

          if (userData.facingMessage) {
            actions.push(updateFacingMessageAction(userData.facingMessage));
          }

          if (userData.allowTrackActivity !== undefined) {
            actions.push(
              updateAllowTrackActivityAction(userData.allowTrackActivity),
            );
          }

          if (userData.allowSendNotification !== undefined) {
            actions.push(
              updateAllowSendNotificationAction(
                userData.allowSendNotification,
              ),
            );
          }

          actions.push(setUserDataStatusAction('loaded'));
          actions.push(loadStreaksAction());
          actions.push(loadHolidaysAction());

          return from(actions);
        }),
        catchError((error) => {
          const networkIssue = isNetworkError(error);

          if (networkIssue) {
            return of(
              openPopupAction({
                key: 'noInternet',
                payload: {
                  onCancel: voidFn,
                  onTryAgain: tryAgainActionFactory(paymentMethod),
                },
              }),
            );
          }

          Logger.error('Upload user data', error, ['uploadUserDataEpic']);

          return of(
            openPopupAction({
              key: 'somethingWrong',
              payload: {
                onCancel: voidFn,
                onTryAgain: tryAgainActionFactory(paymentMethod),
              },
            }),
          );
        }),
      );
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['uploadUserDataEpic']);

      return source$;
    }),
  );

export { uploadUserDataEpic };

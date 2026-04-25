import { EpicType, MOCK_APPLE_ID } from '../../../common/constants';
import { ofType } from 'redux-observable';
import {
  loadUserDataAction,
  setUserDataStatusAction,
  updateIdAction,
  updateDocIdAction,
  updateUserDataPaymentMethodAction,
  updateBibleVersionAction,
  updateDenominationAction,
  updateAgeGroupAction,
  updateGenderAction,
  updateStruggleAction,
  updateFacingMessageAction,
  updateAllowTrackActivityAction,
  updateAllowSendNotificationAction,
  updateIsProAction,
  updateLastPaymentDateAction,
  updateSubscriptionStatusAction,
} from '../actions';
import { catchError, switchMap } from 'rxjs/operators';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../api/firebase';
import { EDBCollection } from '../../../../constants/firebase';
import { from, of } from 'rxjs';
import { selectPageAction } from '../../page/actions';
import { isNetworkError } from '../../../../utils/isNetworkError';
import { openPopupAction } from '../../popup/actions';
import { voidFn } from '../../../../constants/voidFn';
import { Logger } from '../../../../api/logger';
import { loadStreaksAction } from '../../streak/actions';
import { loadHolidaysAction } from '../../holidays/actions';

const tryAgainAction = () => {
  import('./../../../store').then(({ store }) => {
    store.dispatch(loadUserDataAction());
  });
};

const loadUserDataEpic: EpicType = (action$) =>
  action$.pipe(
    ofType(loadUserDataAction.type),
    switchMap(() => {
      const usersQuery = query(
        collection(db, EDBCollection.USERS),
        where('id', '==', MOCK_APPLE_ID),
      );

      return from(getDocs(usersQuery)).pipe(
        switchMap((querySnapshot) => {
          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const userData = docSnap.data();

            const actions = [];

            actions.push(updateDocIdAction(docSnap.id));

            if (userData.id) {
              actions.push(updateIdAction(userData.id));
            }

            if (userData.paymentMethod) {
              actions.push(
                updateUserDataPaymentMethodAction({
                  paymentMethod: userData.paymentMethod,
                }),
              );
            }

            if (userData.bibleVersion) {
              actions.push(updateBibleVersionAction(userData.bibleVersion));
            }

            if (userData.denomination) {
              actions.push(updateDenominationAction(userData.denomination));
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

            if (userData.isPro !== undefined) {
              actions.push(updateIsProAction(userData.isPro));
            }

            if (userData.lastPaymentDate) {
              actions.push(
                updateLastPaymentDateAction(
                  userData.lastPaymentDate instanceof Date
                    ? userData.lastPaymentDate
                    : new Date(userData.lastPaymentDate),
                ),
              );
            }

            if (userData.subscriptionStatus) {
              actions.push(
                updateSubscriptionStatusAction(userData.subscriptionStatus),
              );
            }

            actions.push(setUserDataStatusAction('loaded'));
            actions.push(loadStreaksAction());
            actions.push(loadHolidaysAction());

            return from(actions);
          } else {
            return of(selectPageAction({ page: 'Onboarding' }));
          }
        }),
        catchError((error) => {
          const networkIssue = isNetworkError(error);

          if (networkIssue) {
            return of(
              openPopupAction({
                key: 'noInternet',
                payload: {
                  onCancel: voidFn,
                  onTryAgain: tryAgainAction,
                },
              }),
            );
          }

          Logger.error('Load user data', error, ['loadUserDataEpic']);

          return of(
            openPopupAction({
              key: 'somethingWrong',
              payload: {
                onCancel: voidFn,
                onTryAgain: tryAgainAction,
              },
            }),
          );
        }),
      );
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['loadUserDataEpic']);
      return source$;
    }),
  );

export { loadUserDataEpic };

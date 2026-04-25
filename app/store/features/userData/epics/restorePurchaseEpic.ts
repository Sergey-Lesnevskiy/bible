import { EpicType } from '../../../common/constants';
import { ofType } from 'redux-observable';
import { restorePurchaseAction, updateIsProAction, updateLastPaymentDateAction, updateSubscriptionStatusAction } from '../actions';
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Logger } from '../../../../api/logger';
import { Platform } from 'react-native';
import { openPopupAction } from '../../popup/actions';
import { voidFn } from '../../../../constants/voidFn';
import { selectUserDataDocIdSelector, selectUserDataSelector } from '../selectors';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../api/firebase';
import { EDBCollection } from '../../../../constants/firebase';

const restorePurchaseEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(restorePurchaseAction.type),
    switchMap(() => {
      // For non-iOS platforms, show message that restore is not available
      if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
        return of(
          openPopupAction({
            key: 'confirmToast',
            payload: { text: 'Restore purchases is only available on mobile devices' },
          }),
        );
      }

      const { ApphudSdk } = require('@apphud/react-native-apphud-sdk');

      return from(ApphudSdk.restorePurchases()).pipe(
        mergeMap(async () => {
          try {
            const hasActiveSubscription = await ApphudSdk.hasActiveSubscription();
            
            if (hasActiveSubscription) {
              // User has active subscription - restore it
              const existingDocId = selectUserDataDocIdSelector(state$.value);
              const { userData } = selectUserDataSelector(state$.value);
              const now = new Date();

              const updateData = {
                isPro: true,
                lastPaymentDate: now,
                subscriptionStatus: 'active' as const,
              };

              // Update Firebase
              if (existingDocId) {
                await setDoc(
                  doc(db, EDBCollection.USERS, existingDocId),
                  updateData,
                  { merge: true },
                );
              }

              return of(
                updateIsProAction(true),
                updateLastPaymentDateAction(now),
                updateSubscriptionStatusAction('active'),
                openPopupAction({
                  key: 'confirmToast',
                  payload: { text: 'Your PRO subscription has been restored! 🎉' },
                }),
              );
            } else {
              // No active subscription found
              return of(
                openPopupAction({
                  key: 'confirmToast',
                  payload: { text: 'No active subscription found. You are not PRO.' },
                }),
              );
            }
          } catch (error: any) {
            Logger.error('Check subscription status', error, ['restorePurchaseEpic']);
            return of(
              openPopupAction({
                key: 'somethingWrong',
                payload: {
                  onCancel: voidFn,
                  onTryAgain: voidFn,
                },
              }),
            );
          }
        }),
        mergeMap((actions) => actions),
        catchError((error) => {
          Logger.error('Restore purchases', error, ['restorePurchaseEpic']);
          
          return of(
            openPopupAction({
              key: 'somethingWrong',
              payload: {
                onCancel: voidFn,
                onTryAgain: voidFn,
              },
            }),
          );
        }),
      );
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['restorePurchaseEpic']);
      return source$;
    }),
  );

export { restorePurchaseEpic };

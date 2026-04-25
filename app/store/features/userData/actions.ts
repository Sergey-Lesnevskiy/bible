import { createAction } from '@reduxjs/toolkit';
import { IUserData, TUserDataStatus, USER_DATA_FEATURE_KEY } from './constants';

const setUserDataAction = createAction<IUserData>(
  `${USER_DATA_FEATURE_KEY}/setUserDataAction`,
);

const clearUserDataAction = createAction(
  `${USER_DATA_FEATURE_KEY}/clearUserDataAction`,
);

const setUserDataStatusAction = createAction<TUserDataStatus>(
  `${USER_DATA_FEATURE_KEY}/setUserDataStatusAction`,
);

const loadUserDataAction = createAction(
  `${USER_DATA_FEATURE_KEY}/loadUserDataAction`,
);

interface IUploadUserDataAction {
  paymentMethod: 'not now' | 'restore' | 'weekly' | 'yearly';
}

const uploadUserDataAction = createAction<IUploadUserDataAction>(
  `${USER_DATA_FEATURE_KEY}/uploadUserDataAction`,
);

const updateUserDataPaymentMethodAction = createAction<IUploadUserDataAction>(
  `${USER_DATA_FEATURE_KEY}/updateUserDataPaymentMethodAction`,
);

const updateIdAction = createAction<string>(
  `${USER_DATA_FEATURE_KEY}/updateIdAction`,
);

const updateDocIdAction = createAction<string>(
  `${USER_DATA_FEATURE_KEY}/updateDocIdAction`,
);

const updateAllowTrackActivityAction = createAction<boolean>(
  `${USER_DATA_FEATURE_KEY}/updateAllowTrackActivityAction`,
);

const updateAllowSendNotificationAction = createAction<boolean>(
  `${USER_DATA_FEATURE_KEY}/updateAllowSendNotificationAction`,
);

const updateDenominationAction = createAction<IUserData['denomination']>(
  `${USER_DATA_FEATURE_KEY}/updateDenominationAction`,
);

const changeDenominationAndSyncAction = createAction<IUserData['denomination']>(
  `${USER_DATA_FEATURE_KEY}/changeDenominationAndSyncAction`,
);

const updateBibleVersionAction = createAction<IUserData['bibleVersion']>(
  `${USER_DATA_FEATURE_KEY}/updateBibleVersionAction`,
);

const changeBibleVersionAndSyncAction = createAction<IUserData['bibleVersion']>(
  `${USER_DATA_FEATURE_KEY}/changeBibleVersionAndSyncAction`,
);

const updateAgeGroupAction = createAction<IUserData['ageGroup']>(
  `${USER_DATA_FEATURE_KEY}/updateAgeGroupAction`,
);

const updateGenderAction = createAction<IUserData['gender']>(
  `${USER_DATA_FEATURE_KEY}/updateGenderAction`,
);

const updateStruggleAction = createAction<IUserData['struggle']>(
  `${USER_DATA_FEATURE_KEY}/updateStruggleAction`,
);

const updateFacingMessageAction = createAction<IUserData['facingMessage']>(
  `${USER_DATA_FEATURE_KEY}/updateFacingMessageAction`,
);

const updateIsProAction = createAction<boolean>(
  `${USER_DATA_FEATURE_KEY}/updateIsProAction`,
);

const updateLastPaymentDateAction = createAction<Date | null>(
  `${USER_DATA_FEATURE_KEY}/updateLastPaymentDateAction`,
);

const updateSubscriptionStatusAction = createAction<'active' | 'expired' | 'none'>(
  `${USER_DATA_FEATURE_KEY}/updateSubscriptionStatusAction`,
);

const restorePurchaseAction = createAction(
  `${USER_DATA_FEATURE_KEY}/restorePurchaseAction`,
);

const loadDailyVerseAction = createAction(
  `${USER_DATA_FEATURE_KEY}/loadDailyVerseAction`,
);

const setDailyVerseAction = createAction<{ verse: string; acts: string } | null>(
  `${USER_DATA_FEATURE_KEY}/setDailyVerseAction`,
);

export {
  setUserDataAction,
  clearUserDataAction,
  updateAllowTrackActivityAction,
  updateAllowSendNotificationAction,
  updateIdAction,
  updateDocIdAction,
  setUserDataStatusAction,
  updateUserDataPaymentMethodAction,
  uploadUserDataAction,
  loadUserDataAction,
  updateDenominationAction,
  changeDenominationAndSyncAction,
  updateBibleVersionAction,
  changeBibleVersionAndSyncAction,
  updateAgeGroupAction,
  updateGenderAction,
  updateStruggleAction,
  updateFacingMessageAction,
  updateIsProAction,
  updateLastPaymentDateAction,
  updateSubscriptionStatusAction,
  restorePurchaseAction,
  loadDailyVerseAction,
  setDailyVerseAction,
};

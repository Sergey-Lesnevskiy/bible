import { createReducer } from '@reduxjs/toolkit';
import { IUserDataState } from './constants';
import {
  setUserDataAction,
  clearUserDataAction,
  setUserDataStatusAction,
  updateDenominationAction,
  updateBibleVersionAction,
  updateAgeGroupAction,
  updateGenderAction,
  updateStruggleAction,
  updateFacingMessageAction,
  updateIdAction,
  updateDocIdAction,
  updateAllowTrackActivityAction,
  updateAllowSendNotificationAction,
  updateUserDataPaymentMethodAction,
  updateIsProAction,
  updateLastPaymentDateAction,
  updateSubscriptionStatusAction,
  setDailyVerseAction,
} from './actions';

const initialState: IUserDataState = {
  userData: {},
  status: 'idle',
  dailyVerse: null,
  docId: null,
};

const userDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserDataAction, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(clearUserDataAction, (state) => {
      state.userData = {};
    })
    .addCase(setUserDataStatusAction, (state, action) => {
      state.status = action.payload;
    })
    .addCase(updateAllowTrackActivityAction, (state, action) => {
      state.userData.allowTrackActivity = action.payload;
    })
    .addCase(updateAllowSendNotificationAction, (state, action) => {
      state.userData.allowSendNotification = action.payload;
    })
    .addCase(updateIdAction, (state, action) => {
      state.userData.id = action.payload;
    })
    .addCase(updateDocIdAction, (state, action) => {
      state.docId = action.payload;
    })
    .addCase(updateDenominationAction, (state, action) => {
      state.userData.denomination = action.payload;
    })
    .addCase(updateUserDataPaymentMethodAction, (state, action) => {
      state.userData.paymentMethod = action.payload.paymentMethod;
    })
    .addCase(updateBibleVersionAction, (state, action) => {
      state.userData.bibleVersion = action.payload;
    })
    .addCase(updateAgeGroupAction, (state, action) => {
      state.userData.ageGroup = action.payload;
    })
    .addCase(updateGenderAction, (state, action) => {
      state.userData.gender = action.payload;
    })
    .addCase(updateStruggleAction, (state, action) => {
      state.userData.struggle = action.payload;
    })
    .addCase(updateFacingMessageAction, (state, action) => {
      state.userData.facingMessage = action.payload;
    })
    .addCase(updateIsProAction, (state, action) => {
      state.userData.isPro = action.payload;
    })
    .addCase(updateLastPaymentDateAction, (state, action) => {
      state.userData.lastPaymentDate = action.payload;
    })
    .addCase(updateSubscriptionStatusAction, (state, action) => {
      state.userData.subscriptionStatus = action.payload;
    })
    .addCase(setDailyVerseAction, (state, action) => {
      state.dailyVerse = action.payload;
    });
});

export { userDataReducer };

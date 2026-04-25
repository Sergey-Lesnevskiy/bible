import { RootState } from '../../store';

export const selectUserDataSelector = (state: RootState) => state.userData;

export const selectUserDataStatusSelector = (state: RootState) =>
  state.userData.status;

export const selectUserDataEntitySelector = (state: RootState) =>
  state.userData.userData;

export const selectUserDataIdSelector = (state: RootState) =>
  state.userData.userData?.id;

export const selectUserDataAllowTrackActivitySelector = (state: RootState) =>
  state.userData.userData?.allowTrackActivity;

export const selectUserDataAllowSendNotificationSelector = (state: RootState) =>
  state.userData.userData?.allowSendNotification;

export const selectUserDataDenominationSelector = (state: RootState) =>
  state.userData.userData?.denomination;

export const selectUserDataBibleVersionSelector = (state: RootState) =>
  state.userData.userData?.bibleVersion;

export const selectUserDataAgeGroupSelector = (state: RootState) =>
  state.userData.userData?.ageGroup;

export const selectUserDataGenderSelector = (state: RootState) =>
  state.userData.userData?.gender;

export const selectUserDataStruggleSelector = (state: RootState) =>
  state.userData.userData?.struggle;

export const selectUserDataFacingMessageSelector = (state: RootState) =>
  state.userData.userData?.facingMessage;

export const selectDailyVerseSelector = (state: RootState) =>
  state.userData.dailyVerse;

export const selectUserDataDocIdSelector = (state: RootState) =>
  state.userData.docId;

export const selectUserDataIsProSelector = (state: RootState) =>
  state.userData.userData?.isPro || false;

export const POPUP_FEATURE_KEY = 'popup';

export type PopupKey =
  | 'favorites'
  | 'fontSize'
  | 'confirmToast'
  | 'allowTrackActivity'
  | 'allowSendNotifications'
  | 'noInternet'
  | 'somethingWrong'
  | 'leaveReview'
  | 'restoreStreak'
  | 'alertFailed'
  | 'alertError'
  | 'biblePicker'
  | 'bibleActions';

export interface IPopupState {
  activeKey: PopupKey | null;
  payload: unknown | null;
}

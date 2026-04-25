import type { RootState } from '../../store';
import { POPUP_FEATURE_KEY, type IPopupState } from './constants';

const selectPopupState = (state: RootState) =>
  (state as unknown as Record<string, unknown>)[
    POPUP_FEATURE_KEY
  ] as IPopupState;

export const selectActivePopupKey = (state: RootState) =>
  selectPopupState(state).activeKey;

export const selectPopupPayload = (state: RootState) =>
  selectPopupState(state).payload;

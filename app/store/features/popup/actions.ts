import { createAction } from '@reduxjs/toolkit';
import { POPUP_FEATURE_KEY, type PopupKey } from './constants';

const openPopupAction = createAction<{ key: PopupKey; payload?: unknown }>(
  `${POPUP_FEATURE_KEY}/openPopupAction`,
);

const closePopupAction = createAction(`${POPUP_FEATURE_KEY}/closePopupAction`);

export { openPopupAction, closePopupAction };

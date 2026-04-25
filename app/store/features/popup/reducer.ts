import { createReducer } from '@reduxjs/toolkit';

import type { IPopupState } from './constants';
import { closePopupAction, openPopupAction } from './actions';

const initialState: IPopupState = {
  activeKey: null,
  payload: null,
};

const popupReducer = createReducer(initialState, (builder) => {
  builder.addCase(openPopupAction, (state, action) => {
    state.activeKey = action.payload.key;
    state.payload = action.payload.payload ?? null;
  });

  builder.addCase(closePopupAction, (state) => {
    state.activeKey = null;
    state.payload = null;
  });
});

export { popupReducer };

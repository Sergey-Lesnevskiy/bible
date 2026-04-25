import { createReducer } from '@reduxjs/toolkit';

import {
  type IFavouritesVersesState,
  makeFavouriteVerseKey,
} from './constants';
import {
  addFavouriteVerseAction,
  removeFavouriteVerseAction,
  toggleFavouriteVerseAction,
  setFavouritesVersesAction,
} from './actions';

const initialState: IFavouritesVersesState = {
  byKey: {},
};

const favouritesVersesReducer = createReducer(initialState, (builder) => {
  builder.addCase(addFavouriteVerseAction, (state, action) => {
    const key = makeFavouriteVerseKey(action.payload);
    state.byKey[key] = {
      ...action.payload,
      key,
      createdAt: Date.now(),
    };
  });

  builder.addCase(removeFavouriteVerseAction, (state, action) => {
    const key = makeFavouriteVerseKey(action.payload);
    delete state.byKey[key];
  });

  builder.addCase(toggleFavouriteVerseAction, (state, action) => {
    const key = makeFavouriteVerseKey(action.payload);
    if (state.byKey[key]) {
      delete state.byKey[key];
      return;
    }

    state.byKey[key] = {
      ...action.payload,
      key,
      createdAt: Date.now(),
    };
  });

  builder.addCase(setFavouritesVersesAction, (state, action) => {
    state.byKey = action.payload.byKey;
  });
});

export { favouritesVersesReducer };

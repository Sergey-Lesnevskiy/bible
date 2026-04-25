import { createAction } from '@reduxjs/toolkit';

import {
  FAVOURITES_VERSES_FEATURE_KEY,
  type FavouriteVerseRef,
} from './constants';

export type ToggleFavouriteVersePayload = FavouriteVerseRef & {
  text: string;
};

const addFavouriteVerseAction = createAction<ToggleFavouriteVersePayload>(
  `${FAVOURITES_VERSES_FEATURE_KEY}/addFavouriteVerseAction`,
);

const removeFavouriteVerseAction = createAction<FavouriteVerseRef>(
  `${FAVOURITES_VERSES_FEATURE_KEY}/removeFavouriteVerseAction`,
);

const toggleFavouriteVerseAction = createAction<ToggleFavouriteVersePayload>(
  `${FAVOURITES_VERSES_FEATURE_KEY}/toggleFavouriteVerseAction`,
);

const loadFavouritesVersesAction = createAction(
  `${FAVOURITES_VERSES_FEATURE_KEY}/loadFavouritesVersesAction`,
);

const setFavouritesVersesAction = createAction<{
  byKey: Record<string, import('./constants').FavouriteVerse>;
}>(`${FAVOURITES_VERSES_FEATURE_KEY}/setFavouritesVersesAction`);

export {
  addFavouriteVerseAction,
  removeFavouriteVerseAction,
  toggleFavouriteVerseAction,
  loadFavouritesVersesAction,
  setFavouritesVersesAction,
};

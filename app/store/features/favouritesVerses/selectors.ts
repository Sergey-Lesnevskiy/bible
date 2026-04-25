import type { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import {
  FAVOURITES_VERSES_FEATURE_KEY,
  makeFavouriteVerseKey,
  type FavouriteVerse,
  type FavouriteVerseRef,
} from './constants';

const selectFavouritesVersesState = (state: RootState) =>
  (state as unknown as Record<string, unknown>)[
    FAVOURITES_VERSES_FEATURE_KEY
  ] as {
    byKey: Record<string, FavouriteVerse>;
  };

export const selectFavouritesVersesByKey = (state: RootState) =>
  selectFavouritesVersesState(state).byKey;

export const selectFavouritesVersesList = createSelector(
  [selectFavouritesVersesByKey],
  (byKey) =>
    (Object.values(byKey) as FavouriteVerse[]).sort(
      (a, b) => b.createdAt - a.createdAt,
    ),
);

export const selectIsVerseFavourite = (
  state: RootState,
  ref: FavouriteVerseRef,
) => {
  const key = makeFavouriteVerseKey(ref);
  return Boolean(selectFavouritesVersesByKey(state)[key]);
};

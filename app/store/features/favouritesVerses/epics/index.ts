import { combineEpics } from 'redux-observable';
import { loadFavouritesVersesEpic } from './loadFavouritesVersesEpic';
import { saveFavouritesVersesEpic } from './saveFavouritesVersesEpic';

export const favouritesVersesRootEpic = combineEpics(
  loadFavouritesVersesEpic,
  saveFavouritesVersesEpic,
);

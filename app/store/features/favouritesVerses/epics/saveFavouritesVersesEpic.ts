import { debounceTime, switchMap, catchError, of, ignoreElements } from 'rxjs';
import { ofType } from 'redux-observable';

import {
  addFavouriteVerseAction,
  removeFavouriteVerseAction,
  toggleFavouriteVerseAction,
} from '../actions';
import { StorageService } from '../../../../api/storageService';
import { selectFavouritesVersesByKey } from '../selectors';
import { EpicType } from '../../../common/constants';

const FAVOURITES_STORAGE_KEY = 'favouritesVerses';
const storageService = new StorageService();

export const saveFavouritesVersesEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(
      addFavouriteVerseAction.type,
      removeFavouriteVerseAction.type,
      toggleFavouriteVerseAction.type,
    ),
    debounceTime(500),
    switchMap(() => {
      const byKey = selectFavouritesVersesByKey(state$.value);
      return storageService
        .setItem(FAVOURITES_STORAGE_KEY, { byKey })
        .then(() => null)
        .catch(() => null);
    }),
    ignoreElements(),
    catchError(() => of()),
  );

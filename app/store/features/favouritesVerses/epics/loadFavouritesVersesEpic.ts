import { switchMap, catchError, of } from 'rxjs';
import { ofType } from 'redux-observable';

import {
  loadFavouritesVersesAction,
  setFavouritesVersesAction,
} from '../actions';
import { StorageService } from '../../../../api/storageService';
import type { FavouriteVerse } from '../constants';
import { EpicType } from '../../../common/constants';

const FAVOURITES_STORAGE_KEY = 'favouritesVerses';
const storageService = new StorageService();

export const loadFavouritesVersesEpic: EpicType = (action$) =>
  action$.pipe(
    ofType(loadFavouritesVersesAction.type),
    switchMap(() =>
      storageService
        .getItem<{ byKey: Record<string, FavouriteVerse> }>(
          FAVOURITES_STORAGE_KEY,
        )
        .then((data) => {
          if (data?.byKey) {
            return setFavouritesVersesAction({ byKey: data.byKey });
          }
          return setFavouritesVersesAction({ byKey: {} });
        })
        .catch(() => {
          return setFavouritesVersesAction({ byKey: {} });
        }),
    ),
    catchError(() => of(setFavouritesVersesAction({ byKey: {} }))),
  );

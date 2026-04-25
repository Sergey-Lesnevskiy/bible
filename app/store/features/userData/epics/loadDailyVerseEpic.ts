import { EpicType } from '../../../common/constants';
import { ofType } from 'redux-observable';
import { loadDailyVerseAction, setDailyVerseAction } from '../actions';
import {
  catchError,
  switchMap,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { Logger } from '../../../../api/logger';
import { StorageService } from '../../../../api/storageService';
import {
  generateRandomVerse,
  getTodayDateKey,
} from '../../../../utils/dailyVerse';
import { getBibleJsonByVersionLabel } from '../../../../utils/bibleVersions';
import { selectUserDataBibleVersionSelector } from '../selectors';

interface CachedDailyVerse {
  date: string;
  verse: {
    verse: string;
    acts: string;
  };
}

const DAILY_VERSE_STORAGE_KEY = 'dailyVerse';
const storageService = new StorageService();

const loadDailyVerseEpic: EpicType = (action$, state$) =>
  action$.pipe(
    ofType(loadDailyVerseAction.type),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const bibleVersion = selectUserDataBibleVersionSelector(state);
      if (!bibleVersion) {
        return of(setDailyVerseAction(null));
      }

      const bibleVersionJson = getBibleJsonByVersionLabel(bibleVersion);
      if (!bibleVersionJson) {
        return of(setDailyVerseAction(null));
      }

      const todayKey = getTodayDateKey();

      return defer(() =>
        storageService.getItem<CachedDailyVerse>(DAILY_VERSE_STORAGE_KEY),
      ).pipe(
        mergeMap((cached) => {
          if (cached && cached.date === todayKey) {
            return of(setDailyVerseAction(cached.verse));
          }

          const newVerse = generateRandomVerse(bibleVersionJson);
          if (!newVerse) {
            return of(setDailyVerseAction(null));
          }

          const toCache: CachedDailyVerse = {
            date: todayKey,
            verse: newVerse,
          };

          return defer(() =>
            storageService.setItem(DAILY_VERSE_STORAGE_KEY, toCache),
          ).pipe(
            mergeMap(() => of(setDailyVerseAction(newVerse))),
            catchError((error) => {
              Logger.error('Failed to cache daily verse', error, [
                'loadDailyVerseEpic',
              ]);
              return of(setDailyVerseAction(newVerse));
            }),
          );
        }),
        catchError((error) => {
          Logger.error('Failed to load daily verse from storage', error, [
            'loadDailyVerseEpic',
          ]);

          const newVerse = generateRandomVerse(bibleVersionJson);
          return of(setDailyVerseAction(newVerse));
        }),
      );
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['loadDailyVerseEpic']);
      return source$;
    }),
  );

export { loadDailyVerseEpic };

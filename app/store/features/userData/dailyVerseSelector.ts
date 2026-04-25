import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { StorageService } from '../../../api/storageService';
import {
  DailyVerse,
  generateRandomVerse,
  getTodayDateKey,
} from '../../../utils/dailyVerse';
import { getBibleJsonByVersionLabel } from '../../../utils/bibleVersions';
import { selectUserDataBibleVersionSelector } from './selectors';

const DAILY_VERSE_STORAGE_KEY = 'dailyVerse';

interface CachedDailyVerse {
  date: string;
  verse: DailyVerse;
}

const storageService = new StorageService();

const selectBibleVersionJson = createSelector(
  [selectUserDataBibleVersionSelector],
  (bibleVersion) => {
    if (!bibleVersion) return null;
    return getBibleJsonByVersionLabel(bibleVersion);
  },
);

export const getDailyVerseAsync = async (
  state: RootState,
): Promise<DailyVerse | null> => {
  const bibleVersionJson = selectBibleVersionJson(state);
  if (!bibleVersionJson) return null;

  const todayKey = getTodayDateKey();

  try {
    const cached = await storageService.getItem<CachedDailyVerse>(
      DAILY_VERSE_STORAGE_KEY,
    );

    if (cached && cached.date === todayKey) {
      return cached.verse;
    }

    const newVerse = generateRandomVerse(bibleVersionJson);
    if (!newVerse) return null;

    const toCache: CachedDailyVerse = {
      date: todayKey,
      verse: newVerse,
    };

    await storageService.setItem(DAILY_VERSE_STORAGE_KEY, toCache);

    return newVerse;
  } catch (error) {
    return null;
  }
};

export const selectDailyVerseSelector = createSelector(
  [selectBibleVersionJson],
  (bibleVersionJson) => {
    if (!bibleVersionJson) return null;
    return generateRandomVerse(bibleVersionJson);
  },
);

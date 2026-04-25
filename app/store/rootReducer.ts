import { combineReducers } from 'redux';
import { STREAK_FEATURE_KEY } from './features/streak/constants';
import { streakReducer } from './features/streak/reducer';
import { BIBLE_READER_FEATURE_KEY } from './features/bibleReader/constants';
import { bibleReaderReducer } from './features/bibleReader/reducer';
import { FAVOURITES_VERSES_FEATURE_KEY } from './features/favouritesVerses/constants';
import { favouritesVersesReducer } from './features/favouritesVerses/reducer';
import { POPUP_FEATURE_KEY } from './features/popup/constants';
import { popupReducer } from './features/popup/reducer';
import { USER_DATA_FEATURE_KEY } from './features/userData/constants';
import { userDataReducer } from './features/userData/reducer';
import { PAGE_FEATURE_KEY } from './features/page/constants';
import { pageReducer } from './features/page/reducer';
import { HOLIDAYS_FEATURE_KEY } from './features/holidays/constants';
import { holidaysReducer } from './features/holidays/reducer';

const rootReducer = combineReducers({
  [STREAK_FEATURE_KEY]: streakReducer,
  [BIBLE_READER_FEATURE_KEY]: bibleReaderReducer,
  [FAVOURITES_VERSES_FEATURE_KEY]: favouritesVersesReducer,
  [POPUP_FEATURE_KEY]: popupReducer,
  [USER_DATA_FEATURE_KEY]: userDataReducer,
  [PAGE_FEATURE_KEY]: pageReducer,
  [HOLIDAYS_FEATURE_KEY]: holidaysReducer,
});

export { rootReducer };

import { combineEpics } from 'redux-observable';
import { uploadUserDataEpic } from './uploadUserDataEpic';
import { loadUserDataEpic } from './loadUserDataEpic';
import { loadDailyVerseEpic } from './loadDailyVerseEpic';
import { syncUserSettingsEpic } from './syncUserSettingsEpic';
import { restorePurchaseEpic } from './restorePurchaseEpic';

const userDataRootEpic = combineEpics(
  uploadUserDataEpic,
  loadUserDataEpic,
  loadDailyVerseEpic,
  syncUserSettingsEpic,
  restorePurchaseEpic,
);

export { userDataRootEpic };

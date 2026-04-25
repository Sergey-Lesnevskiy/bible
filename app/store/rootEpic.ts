import { combineEpics } from 'redux-observable';
import { userDataRootEpic } from './features/userData/epics';
import { streakRootEpic } from './features/streak/epics';
import { holidaysRootEpic } from './features/holidays/epics';
import { favouritesVersesRootEpic } from './features/favouritesVerses/epics';

const rootEpic = combineEpics(
  userDataRootEpic,
  streakRootEpic,
  holidaysRootEpic,
  favouritesVersesRootEpic,
);

export { rootEpic };

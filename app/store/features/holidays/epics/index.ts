import { combineEpics } from 'redux-observable';
import { loadHolidaysEpic } from './loadHolidaysEpic';

const holidaysRootEpic = combineEpics(loadHolidaysEpic);

export { holidaysRootEpic };

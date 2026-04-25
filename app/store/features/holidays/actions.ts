import { createAction } from '@reduxjs/toolkit';
import { HOLIDAYS_FEATURE_KEY, IHolidaysData, THolidaysStatus } from './constants';

const loadHolidaysAction = createAction(
  `${HOLIDAYS_FEATURE_KEY}/loadHolidaysAction`,
);

const setHolidaysDataAction = createAction<IHolidaysData>(
  `${HOLIDAYS_FEATURE_KEY}/setHolidaysDataAction`,
);

const setHolidaysStatusAction = createAction<THolidaysStatus>(
  `${HOLIDAYS_FEATURE_KEY}/setHolidaysStatusAction`,
);

export {
  loadHolidaysAction,
  setHolidaysDataAction,
  setHolidaysStatusAction,
};

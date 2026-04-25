import { EpicType } from '../../../common/constants';
import { ofType } from 'redux-observable';
import { loadHolidaysAction, setHolidaysDataAction, setHolidaysStatusAction } from '../actions';
import { catchError, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Logger } from '../../../../api/logger';
import holidaysData from '../../../../assets/holidays/holidays.json';

const loadHolidaysEpic: EpicType = (action$) =>
  action$.pipe(
    ofType(loadHolidaysAction.type),
    switchMap(() => {
      try {
        return from([
          setHolidaysStatusAction('loading'),
          setHolidaysDataAction(holidaysData),
          setHolidaysStatusAction('loaded'),
        ]);
      } catch (error) {
        Logger.error('Load holidays data', error, ['loadHolidaysEpic']);
        return of(setHolidaysStatusAction('error'));
      }
    }),
    catchError((error, source$) => {
      Logger.error('Epic outer error', error, ['loadHolidaysEpic']);
      return source$;
    }),
  );

export { loadHolidaysEpic };

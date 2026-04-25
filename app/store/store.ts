import { createEpicMiddleware } from 'redux-observable';
import { configureStore, type Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { rootEpic } from './rootEpic';
import { rootReducer } from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppParamSelector = <TSelected, TParams extends unknown[]>(
  selector: (state: RootState, ...params: TParams) => TSelected,
  ...params: TParams
): TSelected => useSelector((state: RootState) => selector(state, ...params));

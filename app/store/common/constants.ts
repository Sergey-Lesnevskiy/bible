import { Epic } from 'redux-observable';
import type { Action } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type EpicType = Epic<Action, Action, RootState>;

/**
 * Should be removed after release
 * */
export const MOCK_APPLE_ID = 'dev_vh';

import { TNullable } from '../types/Nullable';

export const isNil = (value: TNullable<any>): value is null | undefined =>
  value === null || value === undefined;

export const isNotNil = (value: TNullable<any>) => !isNil(value);

export const isNilValues = (...values: unknown[]): boolean =>
  values.every((value) => value == null);

export const isNotNilValues = (...values: unknown[]): boolean =>
  values.every((value) => value != null);

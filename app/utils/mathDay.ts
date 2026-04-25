import { StreakFromServer } from '../types/calendar';

const daysBetweenInclusive = (start: Date, end: Date) => {
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  const diffDays = Math.floor((endUtc - startUtc) / (24 * 60 * 60 * 1000));
  return Math.max(0, diffDays) + 1;
};
const parseServerDate = (value: string): Date | null => {
  const trimmed = value.trim();

  const iso = new Date(trimmed);
  if (!Number.isNaN(iso.getTime())) return iso;

  const match = /^([0-3]\d)\.([01]\d)\.(\d{4})$/.exec(trimmed);
  if (!match) return null;

  const [, dd, mm, yyyy] = match;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (
    d.getFullYear() !== Number(yyyy) ||
    d.getMonth() !== Number(mm) - 1 ||
    d.getDate() !== Number(dd)
  ) {
    return null;
  }
  return d;
};


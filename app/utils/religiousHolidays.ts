import type { Holiday } from '../types/calendar';

export type { Holiday } from '../types/calendar';

const pad2 = (n: number) => String(n).padStart(2, '0');

const toIsoDate = (d: Date) => {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const sameMonth = (dateIso: string, year: number, monthIndex: number) => {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getFullYear() === year && d.getMonth() === monthIndex;
};

type FixedHoliday = {
  id: string;
  monthIndex: number; // 0..11
  day: number;
  title: string;
  description: string;
};

// Mock Orthodox holidays (fixed dates, new style / Gregorian).
// For exact ecclesiastical correctness (esp. old style / Pascha-dependent feasts), replace with server data.
const ORTHODOX_FIXED_HOLIDAYS: FixedHoliday[] = [
  {
    id: 'nativity-christ',
    monthIndex: 0,
    day: 7,
    title: 'Рождество Христово',
    description:
      'Праздник Рождества Иисуса Христа. Один из главных двунадесятых праздников.',
  },
  {
    id: 'theophany',
    monthIndex: 0,
    day: 19,
    title: 'Богоявление (Крещение Господне)',
    description:
      'Воспоминание Крещения Иисуса Христа в Иордане и явления Святой Троицы.',
  },
  {
    id: 'presentation',
    monthIndex: 1,
    day: 15,
    title: 'Сретение Господне',
    description:
      'Воспоминание принесения Младенца Христа в храм и встречи праведного Симеона с Мессией.',
  },
  {
    id: 'annunciation',
    monthIndex: 3,
    day: 7,
    title: 'Благовещение Пресвятой Богородицы',
    description:
      'День благой вести архангела Гавриила Деве Марии о рождении Спасителя.',
  },
  {
    id: 'transfiguration',
    monthIndex: 7,
    day: 19,
    title: 'Преображение Господне',
    description:
      'Воспоминание Преображения Христа на Фаворе перед учениками и явления Его Божественной славы.',
  },
  {
    id: 'dormition',
    monthIndex: 7,
    day: 28,
    title: 'Успение Пресвятой Богородицы',
    description:
      'Воспоминание кончины Божией Матери и её Успения. Двунадесятый праздник.',
  },
  {
    id: 'nativity-theotokos',
    monthIndex: 8,
    day: 21,
    title: 'Рождество Пресвятой Богородицы',
    description:
      'Праздник Рождества Девы Марии — начало исполнения обетований о спасении.',
  },
  {
    id: 'exaltation-cross',
    monthIndex: 8,
    day: 27,
    title: 'Воздвижение Креста Господня',
    description:
      'Воспоминание обретения и воздвижения Честного и Животворящего Креста Господня.',
  },
  {
    id: 'entry-theotokos',
    monthIndex: 11,
    day: 4,
    title: 'Введение во храм Пресвятой Богородицы',
    description:
      'Воспоминание введения отроковицы Марии в Иерусалимский храм родителями Иоакимом и Анной.',
  },
];

const buildOrthodoxHolidaysForYear = (year: number): Holiday[] => {
  return ORTHODOX_FIXED_HOLIDAYS.map((h) => ({
    id: `${h.id}-${year}`,
    date: toIsoDate(new Date(year, h.monthIndex, h.day)),
    title: h.title,
    description: h.description,
    type: 'religious',
  }));
};

export const getReligiousHolidaysForMonth = (
  year: number,
  monthIndex: number,
): Holiday[] => {
  const holidays = buildOrthodoxHolidaysForYear(year);
  return holidays.filter((h) => sameMonth(h.date, year, monthIndex));
};

export const getReligiousHolidaysForDate = (date: Date): Holiday[] => {
  const iso = toIsoDate(date);
  const holidays = buildOrthodoxHolidaysForYear(date.getFullYear());
  return holidays.filter((h) => h.date === iso);
};

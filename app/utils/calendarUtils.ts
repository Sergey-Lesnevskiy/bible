export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

// Monday-based: 0..6 (Mon..Sun)
const mondayIndex = (jsDay: number) => (jsDay + 6) % 7;

export const buildMonthDays = (monthDate: Date) => {
  const start = startOfMonth(monthDate);

  const firstWeekday = mondayIndex(start.getDay());
  const daysInMonth = new Date(
    start.getFullYear(),
    start.getMonth() + 1,
    0,
  ).getDate();
  const neededCells = firstWeekday + daysInMonth;
  const totalCells = neededCells <= 28 ? 28 : neededCells <= 35 ? 35 : 42;

  const result: Array<{ date: Date; dayNumber: number; isInMonth: boolean }> =
    [];

  for (let i = 0; i < totalCells; i += 1) {
    const dayOffset = i - firstWeekday;
    const date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + dayOffset,
    );
    const isInMonth = date.getMonth() === start.getMonth();

    result.push({
      date,
      dayNumber: date.getDate(),
      isInMonth,
    });
  }

  return result;
};

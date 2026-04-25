export type Holiday = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  description?: string;
  type: 'religious';
};
export type StreakFromServer = {
  startDay: string;
  endDay: string;
};

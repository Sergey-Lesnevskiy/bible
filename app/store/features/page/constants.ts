export const PAGE_FEATURE_KEY = 'page';
export type CalendarMode = 'daily' | 'holy';
export type TPage =
  | 'Loading'
  | 'Onboarding'
  | 'Today'
  | 'Bible'
  | 'Settings'
  | 'Streak'
  | 'Calendar'
  | 'PayWall';  

export interface IPageState {
  page: TPage;
  calendarMode: CalendarMode;
}

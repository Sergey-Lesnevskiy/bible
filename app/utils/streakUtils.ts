
export interface DayContainerItem {
  day: number;
  isDone: boolean;
  nameDay: string;
}

export const getCurrentWeekDays = (currentStreakDates: Date[] | null): DayContainerItem[] => {
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1)); // Начало недели (понедельник)
  
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const result: DayContainerItem[] = [];
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    
    const isDone = currentStreakDates?.some(streakDate => 
      streakDate.toDateString() === currentDate.toDateString()
    ) || false;
    
    result.push({
      day: currentDate.getDate(),
      isDone,
      nameDay: weekDays[i]
    });
  }
  
  return result;
};

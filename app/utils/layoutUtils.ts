import { getAdaptiveSize } from '../constants/typography';

/**
 * Рассчитывает высоту контейнера с кнопками глав
 * @param chaptersCount - количество глав
 * @param availableWidth - доступная ширина контейнера
 * @returns высота контейнера в пикселях
 */
export const calculateChaptersHeight = (chaptersCount: number, availableWidth: number): number => {
  const CHAPTER_WIDTH = getAdaptiveSize(40, false, 10); // ширина одной кнопки главы
  const CHAPTER_MARGIN = getAdaptiveSize(10, false, 5); // отступы между кнопками
  const HORIZONTAL_PADDING = getAdaptiveSize(20, false, 2); // паддинги внутри контейнера
  const effectiveWidth = availableWidth - HORIZONTAL_PADDING * 2;
  
  // Рассчитываем сколько кнопок помещается в строку
  const columns = Math.floor(effectiveWidth / (CHAPTER_WIDTH + CHAPTER_MARGIN));
  
  const ROW_HEIGHT = getAdaptiveSize(45, false, 11); // высота строки (кнопка + отступы)
  const VERTICAL_PADDING = getAdaptiveSize(10, false, 2); // вертикальные паддинги
  const rows = Math.ceil(chaptersCount / columns);
  
  return rows * ROW_HEIGHT + VERTICAL_PADDING * 2 + (chaptersCount < columns ? 0 : 10);
};

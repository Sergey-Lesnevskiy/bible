import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Базовые размеры (iPhone 14 Pro: 393x852)
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

// Масштабирование на основе ширины экрана
export const scaleFont = (size: number): number => {
  const scaleFactor = Math.min(width / guidelineBaseWidth, 1.2); // Не увеличивать больше 1.2x
  return Math.floor(size * scaleFactor);
};

// Масштабирование на основе высоты экрана (лучше для шрифтов)
export const verticalScaleFont = (size: number): number => {
  const scaleFactor = Math.min(height / guidelineBaseHeight, 1.3);
  return Math.floor(size * scaleFactor);
};

// Умеренное масштабирование
export const moderateScaleFont = (size: number, factor = 0.5): number => {
  const scaleFactor = Math.min(width / guidelineBaseWidth, 1.2);
  return Math.floor(size + (size * scaleFactor - size) * factor);
};

// Проверка маленького экрана
export const isSmallScreen = height < 600;
export const isVerySmallScreen = height < 700;

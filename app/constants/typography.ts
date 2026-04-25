import { StyleSheet } from 'react-native';
import {
  verticalScaleFont,
  isSmallScreen,
  isVerySmallScreen,
} from '../utils/responsiveFonts';

const BASE_SIZES = {
  largeTitle: 48,
  title1: 32,
  title2: 20,
  body20: 20,
  body18: 18,
  body17: 17,
  body15: 15,
  body14: 14,
  body13: 13,
  body10: 10,
} as const;

// Функция для получения адаптивного размера
export const getAdaptiveSize = (
  baseSize: number,
  useVerticalScale = true,
  step?: number,
): number => {
  if (isVerySmallScreen) {
    let stepNew = step || 5;
    return baseSize - stepNew;
  }
  if (isSmallScreen) {
    // Для маленьких экранов
    let stepNew = step || 3;
    return baseSize - stepNew;
  }
  // Нормальная адаптация
  return useVerticalScale ? verticalScaleFont(baseSize) : baseSize;
};

export const AdaptiveTypography = StyleSheet.create({
  // ============ SF Pro ============
  // Large Title
  sfLargeTitleBold: {
    fontFamily: 'SF-Pro-Display-Bold',

    fontSize: getAdaptiveSize(BASE_SIZES.largeTitle, false, 8),
    lineHeight: getAdaptiveSize(52, false, 10),
    fontWeight: 600,
  },

  // Title 1
  sfTitle1Semibold: {
    fontFamily: 'SF-Pro-Display-Semibold',

    fontSize: getAdaptiveSize(BASE_SIZES.title1, false, 4),
    lineHeight: getAdaptiveSize(38, false, 10),
    fontWeight: 600,
  },

  // Title 2
  sfTitle2Bold: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: getAdaptiveSize(BASE_SIZES.title2, false, 3),
    lineHeight: getAdaptiveSize(24, false, 4),
    fontWeight: 700,
  },

  // Body (размер 18)
  sfBody18Semibold: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: getAdaptiveSize(BASE_SIZES.body18, false, 2),
    lineHeight: getAdaptiveSize(22, false, 4),
    fontWeight: 700,
  },

  // Body (размер 17)
  sfBody17Semibold: {
    fontFamily: 'SFProText-Semibold',
    fontSize: getAdaptiveSize(BASE_SIZES.body17, false, 2),
    lineHeight: getAdaptiveSize(22, false, 2),
    fontWeight: 600,
  },
  sfBody17Medium: {
    fontFamily: 'SFProText-Medium',
    fontSize: getAdaptiveSize(BASE_SIZES.body17, false, 2),
    lineHeight: getAdaptiveSize(22, false, 2),
  },
  sfBody17Regular: {
    fontFamily: 'SFProText-Regular',
    fontSize: getAdaptiveSize(BASE_SIZES.body17, false, 2),
    lineHeight: getAdaptiveSize(22, false, 2),
    fontWeight: 400,
  },

  // Body (размер 15)
  sfBody15Regular: {
    fontFamily: 'SFProText-Regular',
    fontSize: getAdaptiveSize(BASE_SIZES.body15, false, 2),
    lineHeight: getAdaptiveSize(20, false, 2),
  },
  sfBody15Semibold: {
    fontFamily: 'SFProText-Semibold',
    fontSize: getAdaptiveSize(BASE_SIZES.body15, false, 2),
    lineHeight: getAdaptiveSize(20, false, 2),
    fontWeight: 600,
  },

  // Body (размер 14)
  sfBody14Semibold: {
    fontFamily: 'SFProText-Semibold',
    fontSize: getAdaptiveSize(BASE_SIZES.body14, false, 2),
    lineHeight: getAdaptiveSize(18, false, 2),
    fontWeight: 600,
  },
  sfBody14Medium: {
    fontFamily: 'SFProText-Medium',
    fontSize: getAdaptiveSize(BASE_SIZES.body14, false, 2),
    lineHeight: getAdaptiveSize(18, false, 2),
  },
  sfBody14Regular: {
    fontFamily: 'SFProText-Regular',
    fontSize: getAdaptiveSize(BASE_SIZES.body14, false, 2),
    lineHeight: getAdaptiveSize(18, false, 2),
  },

  // Body (размер 13)
  sfBody13Medium: {
    fontFamily: 'SFProText-Medium',
    fontSize: getAdaptiveSize(BASE_SIZES.body13),
    lineHeight: getAdaptiveSize(16, false, 2),
  },
  sfBody13Regular: {
    fontFamily: 'SFProText-Regular',
    fontSize: getAdaptiveSize(BASE_SIZES.body13, false, 1),
    lineHeight: getAdaptiveSize(16, false, 2),
    fontWeight: 400,
  },
  sfBody10regular: {
    fontFamily: 'SFProText-Regular',
    fontSize: getAdaptiveSize(BASE_SIZES.body10, false, 3),
    lineHeight: getAdaptiveSize(10, false, 2),
  },
  sfBody10medium: {
    fontFamily: 'SFProText-Medium',
    fontSize: getAdaptiveSize(BASE_SIZES.body10, false, 3),
    lineHeight: getAdaptiveSize(10, false, 2),
    fontWeight: 600,
  },

  // ============ AmstelvarAlpha ============
  // Large Title
  amLargeTitleDefault: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(48, false, 8),
    lineHeight: getAdaptiveSize(48, false, 8),
    fontWeight: '400',
  },

  // Title 1
  amTitle1Semibold: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(32, false, 4),
    lineHeight: getAdaptiveSize(36, false, 10),
    fontWeight: '600',
  },

  amTitle1_400Semibold: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(32, false, 3),
    fontWeight: '400',
    lineHeight: getAdaptiveSize(36, false, 10),
  },

  // Title 2
  amTitle2Bold: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(28, false, 2),
    lineHeight: getAdaptiveSize(32, false, 10),
    fontWeight: '700',
  },
  amTitle2_400Semibold: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(28, false, 2),
    lineHeight: getAdaptiveSize(32, false, 10),
    fontWeight: '400',
  },

  amBody20Default: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(20, false, 2),
    lineHeight: getAdaptiveSize(22, false, 2),
    fontWeight: '400',
  },

  // Body (размер 17)
  amBody17Default: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(17, false, 2),
    lineHeight: getAdaptiveSize(22, false, 2),
    fontWeight: '400',
  },
  // Body (размер 17)
  amBody16Default: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(16, false, 1),
    lineHeight: getAdaptiveSize(22, false, 2),
    fontWeight: '400',
  },

  // Body (размер 15)
  amBody15Default: {
    fontFamily: 'AmstelvarAlpha-VF',
    fontSize: getAdaptiveSize(15),
    lineHeight: getAdaptiveSize(22),
    fontWeight: '400',
  },
});

export type AdaptiveTypographyVariant = keyof typeof AdaptiveTypography;

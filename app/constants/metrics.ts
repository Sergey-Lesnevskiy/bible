import { Dimensions, DimensionValue } from 'react-native';
const { width, height } = Dimensions.get('window');

export const PADDING = {
  screenTopBig: 86,
  screenTop: 74,
  screenBottom: 56,
  screenBottomSmall: 30,
  screenHorizontal: 20,
  screenHorizontalPopupTwoContainers: 80,
};
export const BORDER_RADIUS = {
  small: 20,
  modalStreak: 34,
};
export const SCREEN_CONTAINER = {
  middle: 680
};
export const HEIGHT_LINES = {
  default_22: 22,
  default_20: 20,
};
export const COUNT_LINES = {
  default: 12
};
export const NAME_APP = {
  nameApp: 'Holy Bible',
};
export const HEIGHT = {
  overflowHidden: '100%' as DimensionValue,
};
export const VALUE_WIDTH = {
  SIZE_1: width * 0.1,
  SIZE_2: width * 0.2,
  SIZE_3: width * 0.3,
  SIZE_4: width * 0.4,
  SIZE_5: width * 0.5,
  SIZE_6: width * 0.6,
  SIZE_7: width * 0.7,
  SIZE_8: width * 0.8,
  SIZE_9: width * 0.9,
  SIZE_10: width * 1,
};

export const VALUE_HEIGHT = {
  SIZE_1: height * 0.1,
  SIZE_2: height * 0.2,
  SIZE_3: height * 0.3,
  SIZE_3_5: height * 0.35,
  SIZE_4: height * 0.4,
  SIZE_5: height * 0.5,
  SIZE_6: height * 0.6,
  SIZE_7: height * 0.7,
  SIZE_8: height * 0.8,
  SIZE_9: height * 0.9,
  SIZE_10: height * 1,
};
export const VALUE_HEIGHT_ADAPTIVE = (size: number) => {
  return height * (size / 10);
};

export const REMOVE_SIZE = {
  SIZE_10: 10,
  SIZE_20: 20,
  SIZE_30: 30,
  SIZE_40: 40,
};

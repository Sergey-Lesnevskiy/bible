import { StyleSheet } from 'react-native';
import {
  HEIGHT,
  PADDING,
  REMOVE_SIZE,
  VALUE_HEIGHT,
} from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getAdaptiveSize(16, false, 2),
  },

  image: {
    width: getAdaptiveSize(71, false, REMOVE_SIZE.SIZE_10),
    height: getAdaptiveSize(91, false, REMOVE_SIZE.SIZE_10),
    resizeMode: 'contain',
  },

  textContainer: {
    width: '100%',
    alignItems: 'center',
    gap: getAdaptiveSize(REMOVE_SIZE.SIZE_20, false, 2),
  },

  containerButton: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  wrapperDays: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  footer: {
    paddingTop: getAdaptiveSize(
      REMOVE_SIZE.SIZE_40,
      false,
      REMOVE_SIZE.SIZE_10,
    ),

    gap: getAdaptiveSize(40, false, 10),
    width: '100%',
  },
  text: {
    paddingHorizontal: PADDING.screenHorizontal,
  },
});

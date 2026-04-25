import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  containerText: {
    gap: 16,
    paddingHorizontal: PADDING.screenHorizontal,
  },

  containerButton: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  containerImages: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapperImage: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: getAdaptiveSize(300, false, 100),
    height: getAdaptiveSize(238, false, 75),
    objectFit: 'cover',
  },

  wrapperIcon: {
    width: getAdaptiveSize(100, false, 30),
    height: getAdaptiveSize(100, false, 30),
  },
  iconArrow: {
    width: getAdaptiveSize(100, false, 30),
    height: getAdaptiveSize(100, false, 30),
  },
});

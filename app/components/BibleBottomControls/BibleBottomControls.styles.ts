import { StyleSheet } from 'react-native';

import { REMOVE_SIZE } from '../../constants/metrics';
import { getAdaptiveSize } from '../../constants/typography';

export const styles = StyleSheet.create({
  bottomControls: {
    position: 'absolute',
    bottom: getAdaptiveSize(30, false, 22),
    zIndex: 11,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20
  },
  controlButton: {
    width: getAdaptiveSize(52, false, REMOVE_SIZE.SIZE_10),
    height: getAdaptiveSize(52, false, REMOVE_SIZE.SIZE_10),
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlButtonGradient: {
    width: getAdaptiveSize(52, false, REMOVE_SIZE.SIZE_10),
    height: getAdaptiveSize(52, false, REMOVE_SIZE.SIZE_10),
    borderRadius: 22,
    padding: 1,
    overflow: 'hidden',
  },

  controlButtonInner: {
    flex: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  controlButtonContent: {
    zIndex: 1,
  },

  rotate180: {
    transform: [{ rotate: '180deg' }],
  },
  pressed: {
    opacity: 0.75,
  },
});

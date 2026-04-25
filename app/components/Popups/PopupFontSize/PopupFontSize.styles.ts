import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants/theme';
import { getAdaptiveSize } from '../../../constants/typography';
import { SCREEN_CONTAINER } from '../../../constants/metrics';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: SCREEN_CONTAINER.middle,
    alignSelf: 'center',
    minHeight: getAdaptiveSize(206, false, 30),
    borderRadius: getAdaptiveSize(34, false, 6),
    paddingHorizontal: getAdaptiveSize(24, false, 10),
    paddingBottom: getAdaptiveSize(24, false, 10),

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    marginTop: getAdaptiveSize(11, false, 2),
    marginBottom: getAdaptiveSize(14, false, 6),
  },
  panel: {
    borderRadius: getAdaptiveSize(16, false, 4),
    paddingHorizontal: getAdaptiveSize(18, false, 8),
    backgroundColor: COLORS.GRAY_20,
    height: getAdaptiveSize(92, false, 20),
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getAdaptiveSize(14, false, 6),
  },
  aSmall: {
    width: getAdaptiveSize(24, false, 6),
    textAlign: 'center',
  },
  aBig: {
    width: getAdaptiveSize(24, false, 6),
    textAlign: 'center',
  },
  sliderTrackWrap: {
    position: 'relative',
    flex: 1,
    height: getAdaptiveSize(44, false, 12),
    justifyContent: 'center',
  },
  trackBase: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: -getAdaptiveSize(2, false, 1),
    height: getAdaptiveSize(6, false, 1),
    borderRadius: 999,
    backgroundColor: COLORS.GRAY_50,
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -getAdaptiveSize(2, false, 1),
    height: getAdaptiveSize(6, false, 1),
    borderRadius: 999,
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },
  dotsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: [{ translateY: getAdaptiveSize(10, false, 4) }],
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dot: {
    width: getAdaptiveSize(4, false, 1),
    height: getAdaptiveSize(4, false, 1),
    borderRadius: 999,
    backgroundColor: COLORS.GRAY_50,
  },
  thumb: {
    position: 'absolute',
    top: '50%',
    width: getAdaptiveSize(38, false, 10),
    height: getAdaptiveSize(24, false, 4),
    borderRadius: 100,
    backgroundColor: COLORS.COLOR_WHITE,
    marginTop: -getAdaptiveSize(12, false, 5),

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
});

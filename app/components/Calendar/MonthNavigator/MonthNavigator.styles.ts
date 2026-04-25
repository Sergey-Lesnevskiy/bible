import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: getAdaptiveSize(24, false, 4),
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getAdaptiveSize(6, false, 2),
  },
  actions: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: getAdaptiveSize(6, false, 2),
  },
  actionButton: {
    width: getAdaptiveSize(28, false, 4),
    height: getAdaptiveSize(28, false, 4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotate180: {
    transform: [{ rotate: '180deg' }],
  },
  pressed: {
    opacity: 0.75,
  },
});

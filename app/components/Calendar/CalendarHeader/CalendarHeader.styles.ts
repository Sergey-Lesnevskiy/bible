import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getAdaptiveSize(40, false, 3),
    width: getAdaptiveSize(40, false, 3),
    borderRadius: 999,
    transform: [{ rotate: '180deg' }],
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    flex: 1,
  },
  rightPlaceholder: {
    width: getAdaptiveSize(34, false, 6),
    height: getAdaptiveSize(34, false, 6),
  },
});

import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';
import { REMOVE_SIZE } from '../../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  imageContainer: {
    width: getAdaptiveSize(120, false, REMOVE_SIZE.SIZE_20),
    height: getAdaptiveSize(120, false, REMOVE_SIZE.SIZE_20),
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

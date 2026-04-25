import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: getAdaptiveSize(24, false, 2),
    overflow: 'hidden',
    paddingVertical: 4,
  },
});

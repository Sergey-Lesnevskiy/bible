import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({

  notification: {
    padding: getAdaptiveSize(20, false, 3),
    gap: getAdaptiveSize(12, false, 3),
    borderRadius: getAdaptiveSize(20, false, 3),

  },
});

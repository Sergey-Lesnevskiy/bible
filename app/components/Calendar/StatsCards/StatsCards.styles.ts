import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: getAdaptiveSize(10, false, 3),
  },
  card: {
    flex: 1,
    borderRadius: getAdaptiveSize(14, false, 3),
    padding: getAdaptiveSize(20, false, 5),
    gap: getAdaptiveSize(12, false, 5),
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getAdaptiveSize(8, false, 2),
  },
  iconBubble: {
    width: getAdaptiveSize(22, false, 4),
    height: getAdaptiveSize(22, false, 4),
    borderRadius: getAdaptiveSize(11, false, 2),
    backgroundColor: COLORS.COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFireActive: {
    width: 16,
    height: 21,
    resizeMode: 'contain',
  },
});

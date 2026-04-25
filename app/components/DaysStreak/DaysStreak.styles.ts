import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING, REMOVE_SIZE } from '../../constants/metrics';
import { getAdaptiveSize } from '../../constants/typography';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: getAdaptiveSize(20, false, 5),
    paddingVertical: getAdaptiveSize(20, false, 5),
    borderRadius: BORDER_RADIUS.small,
    gap: getAdaptiveSize(12, false, 2),
  },
  list: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    gap: 6,
  },
  circle: {
    width: getAdaptiveSize(38, false, 5),
    height: getAdaptiveSize(38, false, 5),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    borderColor: COLORS.PRIMARY_ACTIVE_BUTTON,
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },
  nameDay: {
    maxWidth: getAdaptiveSize(52, false, REMOVE_SIZE.SIZE_10),
  },
});

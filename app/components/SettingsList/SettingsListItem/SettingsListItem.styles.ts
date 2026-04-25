import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getAdaptiveSize(12, false, 3),
    paddingHorizontal: getAdaptiveSize(16, false, 3),
    gap: getAdaptiveSize(12, false, 2),
  },
  pressed: {
    opacity: 0.85,
  },
  iconBox: {
    width: getAdaptiveSize(30, false, 4),
    height: getAdaptiveSize(30, false, 4),
    borderRadius: getAdaptiveSize(9, false, 0),
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: getAdaptiveSize(16, false, 3),
  },
});

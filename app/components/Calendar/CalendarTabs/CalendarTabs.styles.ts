import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';
import { COLORS } from '../../../constants/theme';
import { REMOVE_SIZE } from '../../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    borderRadius: getAdaptiveSize(16, false, 3),
    padding: getAdaptiveSize(4, false, 2),
  },
  tabsWrapper: {
    flexDirection: 'row',
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '50%',
    borderRadius: getAdaptiveSize(12, false, 1),
    marginRight: getAdaptiveSize(6, false, 2),
  },
  tab: {
    flex: 1,
    borderRadius: getAdaptiveSize(12, false, 1),
    alignItems: 'center',
    justifyContent: 'center',
    height: getAdaptiveSize(44, false, REMOVE_SIZE.SIZE_10),
    zIndex: 1,
  },
  tabActive: {
    backgroundColor: COLORS.COLOR_WHITE,
  },
  pressed: {
    opacity: 0.85,
  },
});

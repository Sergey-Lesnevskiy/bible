import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../constants/typography';
import { REMOVE_SIZE } from '../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleButton: {
    alignSelf: 'flex-start',
  },
  leftHidden: {
    flex: 0,
    width: 0,
    overflow: 'hidden',
    height: getAdaptiveSize(44, false, 5),
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getAdaptiveSize(20, false, 5),
    paddingVertical: getAdaptiveSize(13, false, 2),
    borderRadius: 999,
  },
  pillDivider: {
    width: 1,
    height: getAdaptiveSize(17, false, 3),
    marginHorizontal: getAdaptiveSize(12, false, 3),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  rightSearch: {
    flex: 1,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: getAdaptiveSize(44, false, 5),
    borderRadius: 999,
    paddingHorizontal: getAdaptiveSize(14, false, 3),
    gap: getAdaptiveSize(10, false, 2),
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    margin: 0,
    height: getAdaptiveSize(44, false, 5),
  },
  iconButton: {
    width: getAdaptiveSize(44, false, 5),
    height: getAdaptiveSize(44, false, 5),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

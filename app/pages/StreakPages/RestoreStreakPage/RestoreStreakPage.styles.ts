import { StyleSheet } from 'react-native';
import { PADDING, REMOVE_SIZE } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    paddingTop: getAdaptiveSize(54, false, 10),
    paddingBottom:
      getAdaptiveSize(30, false, 10) +
      getAdaptiveSize(54, false, 10) +
      getAdaptiveSize(PADDING.screenBottomSmall, false, REMOVE_SIZE.SIZE_10),
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerActions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: getAdaptiveSize(20, false, 5),
    paddingVertical: getAdaptiveSize(10, false, 1),
    borderRadius: getAdaptiveSize(29, false, 9),
  },
  dayBadge: {
    flexDirection: 'row',
    gap: 4,
  },
  iconButton: {
    width: 'auto',
  },

  headerActionsDivider: {
    width: 1,
    alignSelf: 'center',
    height: 17,
    marginHorizontal: getAdaptiveSize(10, false, 1),
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: getAdaptiveSize(16, false, 2),
  },

  headerTop: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    alignItems: 'center',
    gap: getAdaptiveSize(REMOVE_SIZE.SIZE_20, false, 2),
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
    gap: getAdaptiveSize(20, false, 5),
  },

  daysSection: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },

  footerContainer: {
    gap: getAdaptiveSize(40, false, 10),
  },

  iconMenuContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingTop: getAdaptiveSize(10, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: getAdaptiveSize(
      PADDING.screenBottomSmall,
      false,
      REMOVE_SIZE.SIZE_10,
    ),
    zIndex: 30,
  },

  footerText: {
    paddingHorizontal: PADDING.screenHorizontal,
  },
  imageFireActive: {
    width: 16,
    height: 21,
    resizeMode: 'contain',
  },
});

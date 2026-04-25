import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { PADDING, REMOVE_SIZE } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  wrapperContainerScroll: {
    flex: 1,
  },
  scrollArea: {
    position: 'relative',
    flex: 1,
    width: '100%',
    // overflow: 'hidden',
  },
  topGradient: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 0,
    paddingTop: PADDING.screenTop,
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeader: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'flex-start',
    gap: 24,
    paddingBottom: getAdaptiveSize(28, false, 8),
  },
  containerText: {
    gap: 16,
  },
  containerButton: {
    width: '100%',
    marginTop: 0,
    paddingHorizontal: PADDING.screenHorizontal,
  },
  containerStatistic: {
    flexDirection: 'row',
    width: '100%',
    height: getAdaptiveSize(52, false, REMOVE_SIZE.SIZE_10),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
  },
  static: {
    width: '50%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  firstsStatic: {
    borderRightWidth: 1,
    borderRightColor: COLORS.GRAY_50,
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStep: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
});

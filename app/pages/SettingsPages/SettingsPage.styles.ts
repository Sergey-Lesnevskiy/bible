import { StyleSheet } from 'react-native';
import { PADDING, REMOVE_SIZE } from '../../constants/metrics';
import { getAdaptiveSize } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    paddingTop: getAdaptiveSize(54, false, 10),
    paddingBottom:
      getAdaptiveSize(30, false, 10) +
      getAdaptiveSize(54, false, 10) +
      getAdaptiveSize(PADDING.screenBottomSmall, false, REMOVE_SIZE.SIZE_10),

    gap: getAdaptiveSize(26, false, 6),
  },

  headerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    gap: getAdaptiveSize(16, false, 2),
  },

  headerTitle: {
    alignItems: 'center',
    gap: getAdaptiveSize(REMOVE_SIZE.SIZE_20, false, 2),
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
    gap: getAdaptiveSize(20, false, 5),
  },

  proBanner: {
    width: '100%',
    borderRadius: getAdaptiveSize(24, false, 4),
    overflow: 'hidden',
  },
  proBannerImage: {
    width: '100%',
    height: getAdaptiveSize(148, false, 20),
  },
  proBannerContent: {
    position: 'absolute',
    left: getAdaptiveSize(18, false, 4),
    top: getAdaptiveSize(18, false, 4),
    right: getAdaptiveSize(18, false, 4),
    bottom: getAdaptiveSize(18, false, 4),
    justifyContent: 'space-between',
  },
  proBannerTitle: {
    color: '#FFFFFF',
  },
  proBannerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: getAdaptiveSize(4, false, 1),
  },
  proBannerButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: getAdaptiveSize(22, false, 4),
    paddingVertical: getAdaptiveSize(12, false, 2),
  },
  proBannerButtonPressed: {
    opacity: 0.9,
  },
  proBannerButtonText: {
    color: '#0F172A',
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
});

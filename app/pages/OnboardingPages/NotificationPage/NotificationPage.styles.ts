import { StyleSheet } from 'react-native';
import { PADDING, REMOVE_SIZE, VALUE_HEIGHT } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,

    paddingBottom: getAdaptiveSize(
      VALUE_HEIGHT.SIZE_3_5 / 2,
      false,
      REMOVE_SIZE.SIZE_10,
    ),
  },
  bottomSpacer: {
    height: 40,
  },
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 0,
    paddingTop: getAdaptiveSize(66, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: getAdaptiveSize(
      PADDING.screenBottom,
      false,
      REMOVE_SIZE.SIZE_10,
    ),
    justifyContent: 'space-between',
  },
  containerHeader: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 16,
  },

  overFlow: {
    position: 'absolute',
    height: VALUE_HEIGHT.SIZE_3_5,
    bottom: 0,
    paddingHorizontal: PADDING.screenHorizontal,
    paddingBottom: getAdaptiveSize(PADDING.screenBottom, false, 10),
    width: '100%',
    justifyContent: 'flex-end',
  },

  overFlowContent: {
    width: '100%',
    justifyContent: 'flex-end',
    gap: getAdaptiveSize(40, false, 10),
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: getAdaptiveSize(330, false, REMOVE_SIZE.SIZE_40),
  },
  containerButton: {
    width: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: VALUE_HEIGHT.SIZE_2,
    zIndex: 10,
  },
});

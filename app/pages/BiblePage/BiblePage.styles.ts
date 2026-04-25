import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../constants/typography';
import { PADDING, REMOVE_SIZE } from '../../constants/metrics';

export const styles = StyleSheet.create({
  wrapperContent: {
    paddingTop: getAdaptiveSize(54, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: 0,
    gap: getAdaptiveSize(0, false, 0),
    justifyContent: 'flex-start',
  },
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
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
  title: {
    marginBottom: 12,
  },
  scrollArea: {
    position: 'relative',
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  topGradient: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
  },
  header: {
    width: '100%',
    gap: 12,
    paddingHorizontal: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  content: {
    paddingTop: getAdaptiveSize(30, false, 5),
    width: '100%',
    flex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: getAdaptiveSize(180, false, 50),
    zIndex: 10,
  },
});

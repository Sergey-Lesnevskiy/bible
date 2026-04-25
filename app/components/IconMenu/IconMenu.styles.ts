import { StyleSheet } from 'react-native';
import { REMOVE_SIZE, SCREEN_CONTAINER, VALUE_WIDTH } from '../../constants/metrics';
import { getAdaptiveSize } from '../../constants/typography';

export const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    maxWidth: SCREEN_CONTAINER.middle,
  },
  outerContainerGradient: {
    width: '100%',
    borderRadius: 30,
    minHeight: getAdaptiveSize(54, false, REMOVE_SIZE.SIZE_10),
    padding: 1,
    overflow: 'hidden',
  },
  outerContainerInner: {
    flex: 1,
    borderRadius: 29,
    overflow: 'hidden',
  },
  container: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    overflow: 'visible',
  },
  button: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getAdaptiveSize(8, false, 2),
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  active: {
    borderRadius: 999,
    marginHorizontal: 0,
    zIndex: 20,
    elevation: 10,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  label: {
    textTransform: 'capitalize',
  },
  activeIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 999,
    zIndex: 1,
  },
});

import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../constants/typography';
import { PADDING, REMOVE_SIZE, SCREEN_CONTAINER } from '../../constants/metrics';
export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: SCREEN_CONTAINER.middle,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 0,
    paddingTop: getAdaptiveSize(PADDING.screenTop, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: getAdaptiveSize(
      PADDING.screenBottom,
      false,
      REMOVE_SIZE.SIZE_10,
    ),
    justifyContent: 'space-between',
  },
});

import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';
import {
  PADDING,
  REMOVE_SIZE,
  SCREEN_CONTAINER,
  VALUE_WIDTH,
} from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },
  containerWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: getAdaptiveSize(28),
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingTop: getAdaptiveSize(PADDING.screenTop, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: getAdaptiveSize(
      PADDING.screenBottom,
      false,
      REMOVE_SIZE.SIZE_10,
    ),
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
    maxWidth: SCREEN_CONTAINER.middle,
    width: '100%',
    alignSelf: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  containerHeader: {
    paddingHorizontal: PADDING.screenHorizontal,
    alignItems: 'flex-start',
    gap: getAdaptiveSize(24),
    width:'100%'
  },
  containerText: {
    gap: getAdaptiveSize(16),
  },
  imageContainer: {
    width: '100%',
    maxWidth: VALUE_WIDTH.SIZE_10,
  },

  image: {
    height: getAdaptiveSize(393, false, 100),
    width: '100%',
    objectFit: 'contain',
  },

  containerButton: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
});

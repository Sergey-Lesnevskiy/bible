import { StyleSheet } from 'react-native';
import {
  BORDER_RADIUS,
  PADDING,
  REMOVE_SIZE,
  SCREEN_CONTAINER,
  VALUE_HEIGHT,
} from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  content: {
    // alignSelf: 'flex-end',
    width: '100%',
    maxWidth: SCREEN_CONTAINER.middle,
    alignSelf: 'center',
    alignItems: 'center',
    height: VALUE_HEIGHT.SIZE_6,
    borderRadius: getAdaptiveSize(BORDER_RADIUS.modalStreak, false, 10),
  },
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: getAdaptiveSize(44, false, REMOVE_SIZE.SIZE_20),
  },
  image: {
    width: getAdaptiveSize(71, false, REMOVE_SIZE.SIZE_10),
    height: getAdaptiveSize(91, false, REMOVE_SIZE.SIZE_10),
    resizeMode: 'contain',
  },

  textContainer: {
    width: '100%',
    alignItems: 'center',
    gap: getAdaptiveSize(16, false, 2),
  },

  containerButtons: {
    width: '100%',
    gap: 10,
    paddingHorizontal: PADDING.screenHorizontal,
    marginTop: getAdaptiveSize(40, false, REMOVE_SIZE.SIZE_10),
    marginBottom: getAdaptiveSize(22, false, REMOVE_SIZE.SIZE_10),
  },

  text: {
    paddingHorizontal: PADDING.screenHorizontal,
  },
});

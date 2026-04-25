import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';
import { COLORS } from '../../../constants/theme';

const CIRCLE_SIZE = getAdaptiveSize(39, false, 6);
const CIRCLE_RADIUS = getAdaptiveSize(17, false, 3);

export const styles = StyleSheet.create({
  container: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getAdaptiveSize(6, false, 2),
  },
  pressed: {
    opacity: 0.75,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },
  todayCircle: {
    backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },

  workBar: {
    position: 'absolute',
    height: CIRCLE_SIZE,
    width: '100%',
    backgroundColor: COLORS.GRAY_200,
    top: '50%',
    marginTop: -CIRCLE_SIZE / 2,
    zIndex: -1,
  },
  workBarSingle: {
    marginHorizontal: '20%',
    borderRadius: getAdaptiveSize(6, false, 2),
  },
  workBarStart: {
    borderTopLeftRadius: getAdaptiveSize(27, false, 2),
    borderBottomLeftRadius: getAdaptiveSize(27, false, 2),
  },
  workBarMiddle: {
    marginHorizontal: 0,
  },
  workBarEndToday: {
    marginRight: '50%',
    width: '50%',
    marginLeft: 0,
    borderTopRightRadius:0,
    borderBottomRightRadius: 0,
  },
  workBarEnd: {
    borderTopRightRadius: getAdaptiveSize(27, false, 2),
    borderBottomRightRadius: getAdaptiveSize(27, false, 2),
  },
});

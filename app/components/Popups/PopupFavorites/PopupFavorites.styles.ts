import { StyleSheet } from 'react-native';

import { PADDING, SCREEN_CONTAINER, VALUE_HEIGHT } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    height: VALUE_HEIGHT.SIZE_9,
    width: '100%',
    maxWidth: SCREEN_CONTAINER.middle,
    alignSelf: 'center',
    borderTopLeftRadius: getAdaptiveSize(38, false, 8),
    borderTopRightRadius: getAdaptiveSize(38, false, 8),
  },

  header: {
    paddingTop: getAdaptiveSize(10, false, 2),
    paddingBottom: getAdaptiveSize(10, false, 2),
    paddingHorizontal: PADDING.screenHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: getAdaptiveSize(44, false, 10),
    height: getAdaptiveSize(44, false, 10),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSpacer: {
    width: getAdaptiveSize(44, false, 10),
    height: getAdaptiveSize(44, false, 10),
  },
  listContent: {
    paddingHorizontal: PADDING.screenHorizontal,
    paddingBottom: getAdaptiveSize(24, false, 10),
    gap: getAdaptiveSize(16, false, 6),
  },
  wrapperNotification: {
    flexDirection: 'row',
    // gap: getAdaptiveSize(20, false, 5),
    alignItems: 'center',
  },
  rightIconBox: {
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    backgroundColor: '#FF555A',
    borderRadius: 999,
  },
  activeTrashStyle: {
    width: 50,
    height: 50,
  },
});

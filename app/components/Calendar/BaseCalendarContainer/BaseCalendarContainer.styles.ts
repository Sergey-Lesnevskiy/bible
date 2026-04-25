import { StyleSheet } from 'react-native';

import { REMOVE_SIZE } from '../../../constants/metrics';
import { COLORS } from '../../../constants/theme';
import { getAdaptiveSize } from '../../../constants/typography';

import { type BaseCalendarPageStyles } from './BaseCalendarContainer';

export const defaultStyles = StyleSheet.create<BaseCalendarPageStyles>({
  container: {},
  card: {
    borderRadius: getAdaptiveSize(16, false, 3),
    paddingTop: getAdaptiveSize(16, false, 3),
    paddingBottom: getAdaptiveSize(12, false, 3),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginTop: 10,
    width: '100%',
  },
  footerCards: {
    marginTop: getAdaptiveSize(32, false, REMOVE_SIZE.SIZE_10),
  },
});

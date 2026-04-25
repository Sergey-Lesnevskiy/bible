import { getAdaptiveSize } from '../../constants/typography';
import { COLORS } from '../../constants/theme';
import { REMOVE_SIZE } from '../../constants/metrics';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapperContent: {
    paddingTop: getAdaptiveSize(54, false, REMOVE_SIZE.SIZE_10),
    paddingBottom: getAdaptiveSize(30, false, REMOVE_SIZE.SIZE_10),
    paddingHorizontal: 20,
  },
});

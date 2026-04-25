import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants/theme';
import { VALUE_HEIGHT } from '../../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    marginTop: VALUE_HEIGHT.SIZE_1,
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY_225,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignSelf: 'center',
  },
});

import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: getAdaptiveSize(29, false, 5),
    marginBottom: getAdaptiveSize(4, false, 2),
  },
  cell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getAdaptiveSize(6, false, 2),
  },
});

import { StyleSheet } from 'react-native';
import { BORDER_RADIUS } from '../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: BORDER_RADIUS.small,
  },
  containerWithRightIcon: {
    paddingRight: 12,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  main: {
    flex: 1,
    minWidth: 0,
    gap: 10,
  },
  containerName: {
    gap: 6,
  },
  text: {
    textAlignVertical: 'center',
  },
});

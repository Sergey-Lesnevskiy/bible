import { StyleSheet } from 'react-native';
import { BORDER_RADIUS, PADDING } from '../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
  },
  header: {
    height: 'auto',
    justifyContent: 'center',
  },
  headerFirstStep: {
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    zIndex: 1,
  },
  line: {
    position: 'absolute',
    width: 4,
    height: '100%',
    left: 22,
    backgroundColor: 'red',
  },
  contentText: {
    gap: 8,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    padding: PADDING.screenHorizontal,
    borderRadius: BORDER_RADIUS.small,
    marginVertical: 10,
  },
});

import { StyleSheet } from 'react-native';
import { PADDING } from '../../../../constants/metrics';

export const styles = StyleSheet.create({
  scrollArea: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 10,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 140,
    zIndex: 10,
  },
  containerText: {
    gap: 16,
  },

  containerButton: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  header: {
    gap: 28,
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  listQuestions: {
    gap: 12,
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  scrollContainer: {
    width: '100%',
  },
  mainContainer: {
    width: '100%',
    flex: 1,
  },
});

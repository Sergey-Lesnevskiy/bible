import { StyleSheet } from 'react-native';
import { getAdaptiveSize } from '../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: getAdaptiveSize(13, false, 2),
    paddingVertical: getAdaptiveSize(8, false, 1),
  },
  containerSelected: {
    backgroundColor: 'rgba(255, 214, 0, 0.14)',
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  verseText: {
    flex: 1,
  },
  verseTextSelected: {
    textDecorationLine: 'underline',
  },
  highlight: {
    backgroundColor: 'rgba(255, 214, 0, 0.35)',
    borderRadius: 3,
  },
});

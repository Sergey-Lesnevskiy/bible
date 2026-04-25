import { StyleSheet } from 'react-native';
import { PADDING } from '../../constants/metrics';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    minHeight: 220,
    backgroundColor: '#000',
    borderRadius: 24,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  content: {
    paddingVertical: 32,
    paddingHorizontal: PADDING.screenHorizontal,
    gap: 16,
  },
  greetingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  actsContainer: {
    width: '100%',
  },
});

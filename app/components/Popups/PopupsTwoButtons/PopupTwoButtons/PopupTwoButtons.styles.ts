import { StyleSheet } from 'react-native';
import { SCREEN_CONTAINER } from '../../../../constants/metrics';

export const styles = StyleSheet.create({
  gradientWrapper: {
    alignSelf: 'center',
    width: '100%',
    padding: 1,
    overflow: 'hidden',
  },
  container: {
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
    width: '100%',
    maxWidth: SCREEN_CONTAINER.middle
  },
  textContainerGradient: {
    width: '100%',
    borderRadius: 16,
    padding: 1,
    overflow: 'hidden',
  },
  textContainerInner: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    marginBottom: 0,
    gap: 10,
  },
  textContainerOnboarding: {
    marginBottom: 4,
    gap: 10,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

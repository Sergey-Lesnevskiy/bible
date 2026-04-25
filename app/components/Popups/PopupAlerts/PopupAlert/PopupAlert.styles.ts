import { StyleSheet } from 'react-native';
import { VALUE_WIDTH } from '../../../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    gap: 10,
    width: VALUE_WIDTH.SIZE_8,
  },
  textContainerGradient: {
    width: '100%',
    borderRadius: 33,
    padding: 1,
    overflow: 'hidden',
  },
  textContainerInner: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: 20,
    gap: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
  },
});

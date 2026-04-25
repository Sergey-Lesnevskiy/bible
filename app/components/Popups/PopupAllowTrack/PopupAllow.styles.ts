import { StyleSheet } from 'react-native';

import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 29,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    gap: 10,
    width: '100%',
  },
  textContainerGradient: {
    alignSelf: 'center',
    width: 312,
    borderRadius: 30,
    padding: 1,
    overflow: 'hidden',
    marginBottom: 0,
  },
  textContainerInner: {
    borderRadius: 0,
    overflow: 'visible',
  },
  textContainer: {
    paddingHorizontal: getAdaptiveSize(8, false, 1),
    paddingTop: getAdaptiveSize(8, false, 1),
    gap: 10,
    paddingBottom: getAdaptiveSize(24, false, 10),
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
  },
});

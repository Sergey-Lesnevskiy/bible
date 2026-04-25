import { StyleSheet } from 'react-native';

import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  menuGradient: {
    width: '100%',
    minHeight: getAdaptiveSize(100, false, 20),
    borderRadius: getAdaptiveSize(34, false, 4),
    padding: 1,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 10,
  },
  menuInner: {
    flex: 1,
    borderRadius: getAdaptiveSize(33, false, 4),
    paddingVertical: 8,
    paddingHorizontal: getAdaptiveSize(24, false, 10),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  itemPressed: {
    opacity: 0.7,
  },
  iconBox: {
    width: 30,
    alignItems: 'center',
  },
});

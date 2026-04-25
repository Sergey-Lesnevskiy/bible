import { StyleSheet } from 'react-native';

import { getAdaptiveSize } from '../../../constants/typography';
import { SCREEN_CONTAINER, VALUE_HEIGHT } from '../../../constants/metrics';

export const styles = StyleSheet.create({
  container: {
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    height: VALUE_HEIGHT.SIZE_2,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    maxWidth: SCREEN_CONTAINER.middle,
  },
  actionsRow: {
    width: '100%',
    paddingTop: getAdaptiveSize(36, false, 10),
    paddingBottom: getAdaptiveSize(56, false, 20),
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getAdaptiveSize(12, false, 2),
    borderRadius: 20,
    width: getAdaptiveSize(112, false, 10),
    height: getAdaptiveSize(74, false, 10),
    gap: 8,
  },
  actionPressed: {
    opacity: 0.7,
  },
});

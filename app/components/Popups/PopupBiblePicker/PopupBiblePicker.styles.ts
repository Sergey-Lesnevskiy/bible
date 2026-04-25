import { StyleSheet } from 'react-native';

import { PADDING, SCREEN_CONTAINER, VALUE_HEIGHT } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    height: VALUE_HEIGHT.SIZE_9,
    width: '100%',
    maxWidth: SCREEN_CONTAINER.middle,
    alignSelf: 'center',
    borderTopLeftRadius: getAdaptiveSize(38, false, 8),
    borderTopRightRadius: getAdaptiveSize(38, false, 8),
    overflow: 'hidden',
  },
  header: {
    paddingTop: getAdaptiveSize(10, false, 2),
    paddingBottom: getAdaptiveSize(10, false, 2),
    paddingHorizontal: PADDING.screenHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: getAdaptiveSize(44, false, 10),
    height: getAdaptiveSize(44, false, 10),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSpacer: {
    width: getAdaptiveSize(44, false, 10),
    height: getAdaptiveSize(44, false, 10),
  },
  content: {
    flex: 1,
    paddingHorizontal: PADDING.screenHorizontal,
    paddingBottom: getAdaptiveSize(24, false, 10),
  },
  tabsWrap: {
    // marginTop: getAdaptiveSize(10, false, 2),
    marginBottom: getAdaptiveSize(16, false, 2),
  },
  segmented: {
    flexDirection: 'row',
    borderRadius: getAdaptiveSize(16, false, 3),
    padding: getAdaptiveSize(4, false, 2),
    gap: getAdaptiveSize(6, false, 2),
  },
  segmentedTab: {
    flex: 1,
    borderRadius: getAdaptiveSize(12, false, 1),
    alignItems: 'center',
    justifyContent: 'center',
    height: getAdaptiveSize(44, false, 10),
  },
  segmentedPressed: {
    opacity: 0.85,
  },
  bookItem: {
    borderRadius: getAdaptiveSize(16, false, 3),
    paddingVertical: getAdaptiveSize(20, false, 4),
    paddingHorizontal: getAdaptiveSize(20, false, 4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: getAdaptiveSize(64, false, 10),
  },
  bookItemOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bookTitle: {
    flex: 1,
  },
  chevron: {
    marginLeft: getAdaptiveSize(10, false, 2),
  },
  chevronIcon: {
    marginLeft: getAdaptiveSize(10, false, 2),
  },
  chaptersWrap: {
    marginTop: getAdaptiveSize(10, false, 2),
    paddingHorizontal: getAdaptiveSize(20, false, 2),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: getAdaptiveSize(10, false, 2),
  },
  chaptersWrapOpen: {
    marginTop: 0,
    borderBottomLeftRadius: getAdaptiveSize(16, false, 3),
    borderBottomRightRadius: getAdaptiveSize(16, false, 3),
    paddingTop: 0,
    paddingBottom: getAdaptiveSize(20, false, 4),
    paddingHorizontal: getAdaptiveSize(20, false, 4),
  },
  chapterPill: {
    width: getAdaptiveSize(39, false, 9),
    height: getAdaptiveSize(39, false, 9),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterPillPlaceholder: {
    opacity: 0,
  },
  versionCard: {
    borderRadius: getAdaptiveSize(16, false, 3),
    paddingVertical: getAdaptiveSize(18, false, 4),
    paddingHorizontal: getAdaptiveSize(18, false, 4),
    gap: getAdaptiveSize(12, false, 2),
  },
});

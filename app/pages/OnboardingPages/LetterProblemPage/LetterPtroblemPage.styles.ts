import { StyleSheet } from 'react-native';
import { PADDING } from '../../../constants/metrics';
import { getAdaptiveSize } from '../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 0,
    paddingTop: PADDING.screenTop,
    paddingBottom: PADDING.screenBottom,
    justifyContent: 'space-between',
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
  containerInputText: {
    width: '100%',
    paddingHorizontal: PADDING.screenHorizontal,
  },
  inputArea: {
    paddingTop: getAdaptiveSize(20, false, 10),
    width: '100%',
    marginBottom: getAdaptiveSize(20, false, 10),
  },
  
  footer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    gap: 40,
    width: '100%',
    alignItems: 'center',
  },
  inputAreaFocusedFooter:{
    justifyContent: 'flex-start',
  },
  containerLock: {
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },
});

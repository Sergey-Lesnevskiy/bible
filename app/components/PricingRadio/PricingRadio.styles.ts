import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
  },
  optionContainer: {
    borderRadius: 18,
    borderWidth: 2,
    paddingHorizontal: 14,
    justifyContent: 'center',
    paddingVertical: 11,
    height: 66,
  },

  selectedOption: {
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#3B82F6',
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  textContainer: {
    flex: 1,
  },

  bestValueIndicator: {
    position: 'absolute',
    top: -5,
    right: 16,
  },
});

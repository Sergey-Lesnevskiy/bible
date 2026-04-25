import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonTransparent: {
    width: undefined,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  leftIcon: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  customContentTransparent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  selected: {
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_ACTIVE_BUTTON,
  },
});

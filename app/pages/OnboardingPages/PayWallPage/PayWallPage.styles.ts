import { Dimensions, StyleSheet } from 'react-native';
const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 20,
    paddingVertical: 48,
  },

  containerButtons: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 3,
  },
  button: {
    width: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  overlay: {
    flex: 1,

    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '170%',
    minHeight: height,
  },
  containerText: {
    width: '100%',
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  containerButton: {
    marginTop: 40,
  },
});

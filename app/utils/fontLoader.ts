import * as Font from 'expo-font';
import { Logger } from '../api/logger';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      'SF-Pro-Display-Semibold': require('../assets/fonts/SF-Pro-Display-Semibold.otf'),

      'SFProText-Semibold': require('../assets/fonts/SFProText-Semibold.ttf'),
      'SFProText-Medium': require('../assets/fonts/SFProText-Medium.ttf'),
      'SFProText-Regular': require('../assets/fonts/SFProText-Regular.ttf'),

      'AmstelvarAlpha-VF': require('../assets/fonts/AmstelvarAlpha-VF.ttf'),

      // 'AmstelvarAlpha-Default': require('../assets/fonts/AmstelvarAlpha-VF.ttf'),
      // 'AmstelvarAlpha-Semibold': require('../assets/fonts/AmstelvarAlpha-VF.ttf'),
      // 'AmstelvarAlpha-Bold': require('../assets/fonts/AmstelvarAlpha-VF.ttf'),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    Logger.error('Font loading error', errorMessage, ['loadFonts']);
  }
};

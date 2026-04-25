import { Platform } from 'react-native';
import { MOCK_APPLE_ID } from '../store/common/constants';

let AppleAuthentication: any;

if (Platform.OS === 'ios') {
  try {
    AppleAuthentication = require('expo-apple-authentication');
  } catch (e) {
    console.warn('Apple Authentication not available');
  }
}

/**
 * Get Apple ID from user or return mock ID for non-Apple platforms
 */
export const getAppleUserId = async (): Promise<string> => {
  // For non-iOS platforms, return mock ID
  if (Platform.OS !== 'ios') {
    return MOCK_APPLE_ID;
  }

  // Check if Apple Authentication is available
  if (!AppleAuthentication) {
    console.warn('Apple Authentication module not available, using mock ID');
    return MOCK_APPLE_ID;
  }

  try {
    // Check if Apple Sign In is available on this device
    const isAvailable = await AppleAuthentication.isAvailableAsync();
    
    if (!isAvailable) {
      console.warn('Apple Sign In not available on this device, using mock ID');
      return MOCK_APPLE_ID;
    }

    // Try to get credential
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    // Return the user identifier from Apple
    return credential.user || MOCK_APPLE_ID;
  } catch (error: any) {
    // User cancelled or error occurred
    if (error.code === 'ERR_CANCELED') {
      console.log('User cancelled Apple Sign In');
    } else {
      console.error('Apple Sign In error:', error);
    }
    
    // Fallback to mock ID
    return MOCK_APPLE_ID;
  }
};

/**
 * Get Apple ID silently (without showing sign-in UI)
 * Returns mock ID if not authenticated or not on iOS
 */
export const getAppleUserIdSilent = (): string => {
  // For non-iOS platforms, return mock ID
  if (Platform.OS !== 'ios') {
    return MOCK_APPLE_ID;
  }

  // For iOS, we'll use the developer Apple ID provided
  // In production, this should check for existing credentials
  return '6757949857';
};

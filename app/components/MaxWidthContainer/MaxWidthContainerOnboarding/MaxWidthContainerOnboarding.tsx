import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SCREEN_CONTAINER } from '../../../constants/metrics';
interface MaxWidthContainerOnboardingProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const MaxWidthContainerOnboarding: React.FC<MaxWidthContainerOnboardingProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    maxWidth: SCREEN_CONTAINER.middle,
    alignSelf: 'center',
    height: '100%',
  },
});
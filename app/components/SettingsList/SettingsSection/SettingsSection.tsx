import React from 'react';

import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ThemedView } from '../../General/ThemedView/ThemedView';
import { getAdaptiveSize } from '../../../constants/typography';

export type SettingsSectionProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const SettingsSection = ({ children, style }: SettingsSectionProps) => {
  return (
    <ThemedView type="notification" style={[styles.container, style]}>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: getAdaptiveSize(18, false, 4),
    overflow: 'hidden',
  },
});

export default SettingsSection;

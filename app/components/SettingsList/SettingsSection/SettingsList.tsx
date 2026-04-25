import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import { ThemedView } from '../../General/ThemedView/ThemedView';
import { styles } from './SettingsList.styles';

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

export default SettingsSection;

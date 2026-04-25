import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../General/ThemedText/ThemedText';
import SvgCheckLight from '../../assets/icons/onboarding/check-mark-light.svg';
import SvgCheckDark from '../../assets/icons/onboarding/check-mark-dark.svg';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './ChecklistItem.styles';
interface ChecklistItemProps {
  text: string;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ text }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.iconContainer}>
          {theme === 'light' ? <SvgCheckDark /> : <SvgCheckLight />}
        </View>
      </View>
      <ThemedText variant="sfBody17Regular" align="left">
        {text}
      </ThemedText>
    </View>
  );
};

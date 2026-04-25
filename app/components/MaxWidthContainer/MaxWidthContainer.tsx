import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './MaxWidthContainer.styles';
interface MaxWidthContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const MaxWidthContainer: React.FC<MaxWidthContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      {children}
    </View>
  );
};

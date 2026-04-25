import React from 'react';
import { styles } from './WrapperContent.styles';
import { ThemedView, ThemedViewProps } from '../General/ThemedView/ThemedView';
import { ViewStyle } from 'react-native';
import { MaxWidthContainer } from '../MaxWidthContainer/MaxWidthContainer';

interface WrapperContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
  type?: ThemedViewProps['type'];
}

const WrapperContent: React.FC<WrapperContentProps> = ({
  style,
  children,
  type = 'background',
}) => {
  return (
    <ThemedView type={type} style={[styles.container, ]}>
      <MaxWidthContainer style={style}>{children}</MaxWidthContainer>
    </ThemedView>
  );
};

export default WrapperContent;

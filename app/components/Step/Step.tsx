import React from 'react';
import { styles } from './Step.styles';
import { ThemedView } from '../General/ThemedView/ThemedView';
import { View } from 'react-native';
import { ThemedText } from '../General/ThemedText/ThemedText';
import { SvgProps } from 'react-native-svg';
import { COLORS } from '../../constants/theme';

interface WrapperContentProps {
  day: string;
  title: string;
  description?: string;
  Icon?: React.FC<SvgProps>;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

const Step: React.FC<WrapperContentProps> = ({
  day,
  title,
  description,
  Icon,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <View style={[styles.container]}>
      <View style={[isFirstStep ? styles.headerFirstStep : styles.header]}>
        {Icon && (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON },
            ]}
          >
            <Icon />
          </View>
        )}
        <View
          style={[
            styles.line,
            { backgroundColor: COLORS.PRIMARY_ACTIVE_BUTTON },
          ]}
        ></View>
      </View>
      <ThemedView
        style={[
          styles.contentText,
          isFirstStep && { marginTop: 0 },
          isLastStep && { marginBottom: 0 },
        ]}
        type="notification"
      >
        <ThemedText variant="sfBody15Regular" align="left">
          {day}
        </ThemedText>
        <ThemedText variant="amBody20Default" align="left">
          {title}
        </ThemedText>
        <ThemedText variant="sfBody17Regular" notifiCationText align="left">
          {description}
        </ThemedText>
      </ThemedView>
    </View>
  );
};

export default Step;

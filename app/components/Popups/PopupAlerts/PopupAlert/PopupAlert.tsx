import React from 'react';
import { type StyleProp, type ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '../../../General/ThemedText/ThemedText';
import {
  ThemedButton,
  type ButtonVariant,
} from '../../../General/ThemeButton/ThemedButton';
import { ThemedView } from '../../../General/ThemedView/ThemedView';

import { useTheme } from '../../../../context/ThemeContext';
import { COLORS } from '../../../../constants/theme';

import { styles } from './PopupAlert.styles';
import { PopupModal } from '../../PopupModal';

export type PopupAlertAction = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  onlyWhiteText?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type PopupAlertProps = {
  visible?: boolean;
  onClose?: () => void;
  title: string;
  description: string;
  isTextCenter?: boolean;
  action: PopupAlertAction;
};

const PopupAlert = ({
  visible,
  onClose,
  title,
  description,
  action,
  isTextCenter,
}: PopupAlertProps) => {
  const { theme } = useTheme();

  const borderColors: readonly [string, string, ...string[]] =
    theme === 'dark'
      ? [
          'rgba(255,255,255,0.55)',
          'rgba(255,255,255,0.08)',
          'rgba(255,255,255,0.55)',
        ]
      : [
          'rgba(255,255,255,0.95)',
          'rgba(255,255,255,0.55)',
          'rgba(255,255,255,0.95)',
        ];

  return (
    <PopupModal
      visible={visible}
      onClose={onClose ?? action.onPress}
      animationType="fade"
    >
      <LinearGradient
        colors={borderColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.textContainerGradient}
      >
        <ThemedView
          style={[
            styles.container,
            {
              backgroundColor:
                theme === 'light' ? COLORS.GRAY_230 : COLORS.GRAY_750,
            },
          ]}
        >
          <View style={styles.textContainerInner}>
            <View style={styles.textContainer}>
              <ThemedText
                variant="sfBody17Semibold"
                align={isTextCenter ? 'center' : 'left'}
              >
                {title}
              </ThemedText>
              <ThemedText
                variant="sfBody17Regular"
                align={isTextCenter ? 'center' : 'left'}
              >
                {description}
              </ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <ThemedButton
              title={action.title}
              variant={action.variant || 'primary'}
              onlyWhiteText={action.onlyWhiteText}
              onPress={action.onPress}
              style={[{ width: '100%' }, action.style]}
            />
          </View>
        </ThemedView>
      </LinearGradient>
    </PopupModal>
  );
};

export default PopupAlert;

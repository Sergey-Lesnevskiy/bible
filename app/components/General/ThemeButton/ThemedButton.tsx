import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, ActivityIndicator } from 'react-native';
import { COLORS, COLORS_THEME } from '../../../constants/theme';
import { ThemedText } from '../ThemedText/ThemedText';
import { useTheme } from '../../../context/ThemeContext';
import { styles } from './ThemedButton.styles';
import {
  getAdaptiveSize,
  AdaptiveTypographyVariant,
} from '../../../constants/typography';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'popup_button_not_track'
  | 'popup_button_allow'
  | 'question'
  | 'disabled'
  | 'small'
  | 'transparent';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string | React.ReactNode;
  isSelected?: boolean;
  variant?: ButtonVariant;
  reverseColor?: boolean;
  onlyWhiteText?: boolean;
  textColor?: string;
  variantText?: AdaptiveTypographyVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export function ThemedButton({
  title,
  variant = 'primary',
  disabled = false,
  onPress,
  style,
  isSelected,
  reverseColor,
  variantText,
  onlyWhiteText,
  textColor,
  leftIcon,
  rightIcon,
  loading = false,
  ...props
}: CustomButtonProps) {
  const isDisabled = disabled;
  const { theme } = useTheme();

  const getButtonColors = () => {
    const themeColors = COLORS_THEME[theme];
    switch (variant) {
      case 'primary':
        return {
          background: COLORS.PRIMARY_ACTIVE_BUTTON,
          height: getAdaptiveSize(60, false, 10),
        };
      case 'secondary':
        return {
          background: themeColors.button_secondary,
          height: getAdaptiveSize(60, false, 10),
        };
      case 'popup_button_not_track':
        return {
          background: themeColors.button_popup_not_track,
          borderRadius: 100,
          height: getAdaptiveSize(48, false, 15),
        };
      case 'popup_button_allow':
        return {
          background: themeColors.button_popup_allow,
          borderRadius: 100,
          height: getAdaptiveSize(48, false, 15),
        };
      case 'question':
        return {
          background: themeColors.notification,
          minHeight: getAdaptiveSize(70, false, 20),
          paddingVertical: 24,
        };
      case 'small':
        return {
          background: themeColors.button_small,
          height: getAdaptiveSize(32, false, 5),
        };
      case 'disabled':
        return {
          background: themeColors.button_disabled,
          height: getAdaptiveSize(70, false, 20),
        };
      case 'transparent':
        return {
          background: 'transparent',
          height: getAdaptiveSize(30, false, 0),
        };
      default:
        return {
          background: COLORS.PRIMARY_ACTIVE_BUTTON,
        };
    }
  };
  const colors = getButtonColors();
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: colors.borderRadius || 18,
          opacity: isDisabled ? 0.5 : 1,
          minHeight: colors.minHeight || 'auto',
          height: colors.height || 'auto',
          paddingVertical: colors.paddingVertical || 0,
        },
        styles.button,
        variant === 'transparent' && styles.buttonTransparent,
        style,
        isSelected && styles.selected,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
      onPress={onPress}
    >
      {!loading && leftIcon != null && <View style={styles.leftIcon}>{leftIcon}</View>}

      {loading ? (
        <ActivityIndicator size="small" color={COLORS.GRAY_400} />
      ) : typeof title === 'string' ? (
        <ThemedText
          reverseColor={reverseColor}
          onlyWhiteText={onlyWhiteText}
          variant={variantText || 'sfBody17Semibold'}
          align="center"
          color={textColor}
        >
          {title}
        </ThemedText>
      ) : (
        <View
          style={[
            styles.customContent,
            variant === 'transparent' && styles.customContentTransparent,
          ]}
        >
          {title}
        </View>
      )}

      {!loading && rightIcon != null && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
}

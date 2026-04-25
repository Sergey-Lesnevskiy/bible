import { TextInput, TextInputProps } from 'react-native';
import { COLORS, COLORS_THEME } from '../../../constants/theme';
import {
  AdaptiveTypography,
  AdaptiveTypographyVariant,
} from '../../../constants/typography';
import { useTheme } from '../../../context/ThemeContext';
import { styles } from './ThemedInputstyles';

export type ThemedTextInputProps = TextInputProps & {
  variant?: AdaptiveTypographyVariant;
  type?: inputVariant;
  color?: string;
  value?: string;
};
export type inputVariant = 'primary';

export function ThemedInput({
  style,
  variant = 'sfBody17Regular',
  type,
  value,
  color,
  ...rest
}: ThemedTextInputProps) {
  const { theme } = useTheme();

  const getButtonColors = () => {
    const themeColors = COLORS_THEME[theme];
    switch (type) {
      case 'primary':
        return {
          background: themeColors.notification,
          color: themeColors.text,
          padding: 16,
        };
      default:
        return {
          background: COLORS.PRIMARY_ACTIVE_BUTTON,
          color: COLORS.PRIMARY_TEXT_THEME_DARK,
        };
    }
  };
  const colors = getButtonColors();

  return (
    <TextInput
      style={[
        AdaptiveTypography[variant],
        {
          backgroundColor: colors.background,
          padding: colors.padding || 0,
          color: color ?? colors.color,
        },
        styles.base,
        style,
      ]}
      underlineColorAndroid="transparent"
      selectionColor={theme === 'dark' ? COLORS.GRAY_425 : COLORS.GRAY_350}
      cursorColor={theme === 'dark' ? COLORS.GRAY_425 : COLORS.GRAY_350}
      multiline={true}
      textAlignVertical="top"
      numberOfLines={4}
      placeholderTextColor={COLORS.GRAY_350}
      value={value}
      {...rest}
    />
  );
}

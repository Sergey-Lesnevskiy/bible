import { Text, type TextProps } from 'react-native';
import { COLORS_THEME } from '../../../constants/theme';
import {
  AdaptiveTypography,
  AdaptiveTypographyVariant,
} from '../../../constants/typography';
import { useTheme } from '../../../context/ThemeContext';

export type ThemedTextProps = TextProps & {
  variant?: AdaptiveTypographyVariant;
  align?: 'left' | 'center' | 'right' | 'justify' | 'auto';
  color?: string | undefined;
  reverseColor?: boolean;
  onlyWhiteText?: boolean;
  notifiCationText?: boolean;
};

export function ThemedText({
  style,
  variant = 'sfBody17Regular',
  align = 'left',
  color,
  notifiCationText,
  onlyWhiteText,
  reverseColor,
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme();

  let textColor = color || COLORS_THEME[theme].text;
  if (reverseColor)
    textColor =
      theme === 'light' ? COLORS_THEME.dark.text : COLORS_THEME.light.text;

  if (notifiCationText) textColor = COLORS_THEME[theme].notification_text;

  if (onlyWhiteText) textColor = COLORS_THEME.dark.text;

  return (
    <Text
      style={[
        AdaptiveTypography[variant],
        { color: textColor, textAlign: align },
        style,
      ]}
      {...rest}
    />
  );
}

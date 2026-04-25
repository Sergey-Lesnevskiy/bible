import { View, type ViewProps } from 'react-native';

import { COLORS_THEME, COLORS } from '../../../constants/theme';
import { useTheme } from '../../../context/ThemeContext';

export type ThemedViewProps = ViewProps & {
  type?:
    | 'background'
    | 'area'
    | 'fill'
    | 'card'
    | 'surface'
    | 'transparent'
    | 'popup_gray'
    | 'notification'
    | 'launcher';
};

export function ThemedView({ style, type, ...rest }: ThemedViewProps) {
  const { theme } = useTheme();

  let backgroundColor = 'transparent';

  switch (type) {
    case 'background':
      backgroundColor =
        theme === 'light'
          ? COLORS_THEME.light.background
          : COLORS_THEME.dark.background;
      break;

    case 'area':
      backgroundColor =
        theme === 'light'
          ? COLORS_THEME.light.area_icon
          : COLORS_THEME.dark.area_icon;
      break;
    case 'notification':
      backgroundColor =
        theme === 'light'
          ? COLORS_THEME.light.notification
          : COLORS_THEME.dark.notification;
      break;

    case 'popup_gray':
      backgroundColor = theme === 'light' ? COLORS.GRAY_250 : COLORS.GRAY_800;
      break;

    case 'card':
      backgroundColor =
        theme === 'light'
          ? COLORS.COLOR_WHITE
          : COLORS.AREA_FILL_ICON_THEME_DARK;
      break;

    case 'surface':
      backgroundColor =
        theme === 'light'
          ? COLORS.COLOR_WHITE
          : COLORS.PRIMARY_BACKGROUND_THEME_DARK;
      break;
    case 'launcher':
      backgroundColor = COLORS_THEME[theme].launcher;
      break;

    case 'transparent':
      backgroundColor = 'transparent';
      break;
    default:
      break;
  }

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}

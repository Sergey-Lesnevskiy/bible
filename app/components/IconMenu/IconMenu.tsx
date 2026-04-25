import React from 'react';
import { TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './IconMenu.styles';
import { getAdaptiveSize } from '../../constants/typography';
import { COLORS, COLORS_THEME } from '../../constants/theme';
import { ThemedText } from '../General/ThemedText/ThemedText';

import BibleActiveLight from '../../assets/icons/streak/bible-active-light.svg';
import BiblePassiveLight from '../../assets/icons/streak/bible-passive-light.svg';
import BibleActiveDark from '../../assets/icons/streak/bible-active-dark.svg';
import BiblePassiveDark from '../../assets/icons/streak/bible-dark copy.svg';

import houseActiveLight from '../../assets/icons/streak/house-active-light.svg';
import housePassiveLight from '../../assets/icons/streak/house-passive-light.svg';
import houseActiveDark from '../../assets/icons/streak/house-active-dark.svg';
import housePassiveDark from '../../assets/icons/streak/house-passive-dark.svg';

import SettingsActiveLight from '../../assets/icons/streak/settings-active-light.svg';
import SettingsPassiveLight from '../../assets/icons/streak/settings-passive-light.svg';
import SettingsActiveDark from '../../assets/icons/streak/settings-active-dark.svg';
import SettingsPassiveDark from '../../assets/icons/streak/settings-passive-dark.svg';
import { ThemedView } from '../General/ThemedView/ThemedView';
import { useAppDispatch } from '../../store/store';
import { selectPageAction } from '../../store/features/page/actions';

type SvgComponent = React.FC<SvgProps>;

export type IconMenuKey = 'home' | 'bible' | 'settings';

export type IconMenuProps = {
  activeKey?: IconMenuKey;
  style?: StyleProp<ViewStyle>;
  iconBaseSize?: number;
};

const IconMenu = ({
  activeKey = 'settings',
  style,

  iconBaseSize = 28,
}: IconMenuProps) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const handleSelectPage = (key: IconMenuKey) => () => {
    switch (key) {
      case 'home': {
        dispatch(selectPageAction({ page: 'Today' }));
        break;
      }
      case 'settings': {
        dispatch(selectPageAction({ page: 'Settings' }));
        break;
      }
      case 'bible': {
        dispatch(selectPageAction({ page: 'Bible' }));
        break;
      }
      default:
        break;
    }
  };

  const iconSize = getAdaptiveSize(iconBaseSize, false, 2);

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

  const getIcon = (key: IconMenuKey): SvgComponent => {
    const isActive = key === activeKey;

    if (theme === 'light') {
      switch (key) {
        case 'home':
          return isActive ? houseActiveDark : housePassiveDark;
        case 'bible':
          return isActive ? BibleActiveDark : BiblePassiveDark;
        case 'settings':
          return isActive ? SettingsActiveDark : SettingsPassiveDark;
      }
    }

    switch (key) {
      case 'home':
        return isActive ? houseActiveLight : housePassiveLight;
      case 'bible':
        return isActive ? BibleActiveLight : BiblePassiveLight;
      case 'settings':
        return isActive ? SettingsActiveLight : SettingsPassiveLight;
    }
  };

  const getLabelColor = (key: IconMenuKey) => {
    const isActive = key === activeKey;
    if (isActive)
      return theme === 'light'
        ? COLORS_THEME[theme].text
        : COLORS.PRIMARY_TEXT_THEME_DARK;
    return theme === 'light'
      ? COLORS.GRAY_226
      : COLORS_THEME.dark.notification_text;
  };

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={borderColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.outerContainerGradient, style]}
      >
        <View style={styles.outerContainerInner}>
          <ThemedView
            style={[
              styles.container,
              {
                backgroundColor:
                  theme === 'light' ? COLORS.GRAY_20 : COLORS.BLACK_06,
              },
            ]}
          >
            <View style={styles.innerContainer}>
              {(['home', 'bible', 'settings'] as const).map((key) => {
                const isActive = key === activeKey;
                const Icon = getIcon(key);
                const labelColor = getLabelColor(key);
                const labelSize = getAdaptiveSize(10, false, 2);
                const activeBackgroundColor =
                  theme === 'light'
                    ? COLORS.BUTTON_COLOR_ACTIVE_LIGHT
                    : COLORS.BLACK_20;

                return (
                  <TouchableOpacity
                    key={key}
                    onPress={handleSelectPage(key)}
                    disabled={isActive}
                    style={[
                      styles.button,
                      isActive && [
                        styles.active,
                        { backgroundColor: activeBackgroundColor },
                      ],
                    ]}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={key}
                  >
                    <View style={styles.buttonContent}>
                      <Icon width={iconSize} height={iconSize} />
                      <ThemedText
                        variant={isActive ? 'sfBody10regular' : 'sfBody10medium'}
                        style={[
                          styles.label,
                          { color: labelColor, fontSize: labelSize },
                        ]}
                        align="center"
                      >
                        {key}
                      </ThemedText>
                    </View>

                  </TouchableOpacity>
                );
              })}
            </View>
          </ThemedView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default IconMenu;

import { type StyleProp, type ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '../../../General/ThemedText/ThemedText';
import {
  ThemedButton,
  type ButtonVariant,
} from '../../../General/ThemeButton/ThemedButton';
import { ThemedView } from '../../../General/ThemedView/ThemedView';

import { styles } from './PopupTwoButtons.styles';
import { useTheme } from '../../../../context/ThemeContext';
import { COLORS } from '../../../../constants/theme';
import { PopupModal } from '../../PopupModal';
import { useSwipeablePopup } from '../../../../hooks/useSwipeablePopup';

export type PopupTwoButtonsPreset = 'default' | 'warning' | 'agreeNotification';

export type PopupTwoButtonsAction = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  onlyWhiteText?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type PopupTwoButtonsProps = {
  visible: boolean;
  onClose: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  isTextCenter?: boolean;
  isOnboarding?: boolean;
  preset?: PopupTwoButtonsPreset;
  withGradient?: boolean;
  leftAction: PopupTwoButtonsAction;
  rightAction: PopupTwoButtonsAction;
};

const PopupTwoButtons = ({
  visible,
  onClose,
  contentStyle,
  containerStyle,
  title,
  description,
  leftAction,
  rightAction,
  isOnboarding,
  isTextCenter,
  preset = 'default',
  withGradient = false,
}: PopupTwoButtonsProps) => {
  const { theme } = useTheme();
  const { modalVisible,  closeWithAnimationComplete } = useSwipeablePopup({
    visible,
    onClose
  });
  const outerRadius = preset === 'agreeNotification' ? 30 : 20;
  const fontSizeDescription =
    preset === 'agreeNotification' ? 'sfBody17Regular' : 'sfBody15Regular';
  const innerRadius = outerRadius - 1;

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
  const presetStyles: Record<
    PopupTwoButtonsPreset,
    { container?: StyleProp<ViewStyle>; button?: StyleProp<ViewStyle> }
  > = {
    default: {},
    warning: {
      button: { height: 52, borderRadius: 16 },
      container: {
        width: '100%',
        backgroundColor:
          theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_900,
      },
    },
    agreeNotification: {
      container: {
        backgroundColor: theme === 'light' ? '#B5B5B5' : COLORS.GRAY_900,
        padding: 14,
        borderRadius: 30,
      },
    },
  };

  const content = (
    <ThemedView
      style={[
        styles.container,
        { borderRadius: innerRadius, overflow: 'hidden' },
        presetStyles[preset].container,
        containerStyle,
      ]}
      type="popup_gray"
    >
      <View
        style={[
          styles.textContainer,
          isOnboarding && styles.textContainerOnboarding,
        ]}
      >
        <ThemedText
          variant="sfBody17Semibold"
          align={isTextCenter ? 'center' : 'left'}
          color={theme === 'dark' ? '#fff' : '#000'}
        >
          {title}
        </ThemedText>
        <ThemedText
          variant={fontSizeDescription}
          align={isTextCenter ? 'center' : 'left'}
          color={theme === 'dark' ? '#fff' : '#000'}
        >
          {description}
        </ThemedText>
      </View>

      <View style={styles.buttonsContainer}>
        <ThemedButton
          title={leftAction.title}
          variant={leftAction.variant || 'popup_button_not_track'}
          onlyWhiteText={leftAction.onlyWhiteText}
          onPress={leftAction.onPress}
          style={[
            { maxWidth: '47%' },
            presetStyles[preset].button,
            leftAction.style,
          ]}
        />
        <ThemedButton
          title={rightAction.title}
          variant={rightAction.variant || 'popup_button_allow'}
          onlyWhiteText={rightAction.onlyWhiteText}
          onPress={rightAction.onPress}
          style={[
            { maxWidth: '47%' },
            presetStyles[preset].button,
            rightAction.style,
          ]}
        />
      </View>
    </ThemedView>
  );

  return (
    <PopupModal
      visible={modalVisible}
      onClose={closeWithAnimationComplete}
      animationType="fade"
      contentStyle={[
        preset === 'warning' ? { width: '100%', paddingHorizontal: 20 } : null,
        contentStyle,
      ]}
    >
      {withGradient ? (
        <LinearGradient
          colors={borderColors}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientWrapper, { borderRadius: outerRadius }]}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </PopupModal>
  );
};

export default PopupTwoButtons;

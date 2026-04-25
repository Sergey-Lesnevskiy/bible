import { Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { ThemedButton } from '../../General/ThemeButton/ThemedButton';
import { styles } from './PopupAllow.styles';
import { ThemedView } from '../../General/ThemedView/ThemedView';

import { useTheme } from '../../../context/ThemeContext';
import { PopupModal } from '../PopupModal';
import { useAppDispatch } from '../../../store/store';
import { updateAllowTrackActivityAction } from '../../../store/features/userData/actions';
import { closePopupAction } from '../../../store/features/popup/actions';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';

export type PopupAllowProps = {
  visible: boolean;
  onClose: () => void;
};

const PopupAllow = ({ visible, onClose }: PopupAllowProps) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { modalVisible, opacity, closeWithAnimation } = useSwipeablePopup({
    visible,
    onClose,
    
  });
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

  const handleNotTrack = () => {
    dispatch(updateAllowTrackActivityAction(false));
    dispatch(closePopupAction());
  };

  const handleAllowTrack = () => {
    dispatch(updateAllowTrackActivityAction(true));
    dispatch(closePopupAction());
  };

  return (
    <PopupModal visible={modalVisible} onClose={closeWithAnimation} animationType="fade">
      <Animated.View style={{ opacity }}>
      <LinearGradient
        colors={borderColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.textContainerGradient}
      >
        <ThemedView style={styles.container} type="popup_gray">
          <View style={styles.textContainerInner}>
            <View style={styles.textContainer}>
              <ThemedText
                variant="sfBody17Semibold"
                color={theme === 'dark' ? '#fff' : '#000'}
              >
                Allow "App" to track your activity across other companies' apps
                and websites?
              </ThemedText>
              <ThemedText
                variant="sfBody17Regular"
                color={theme === 'dark' ? '#fff' : '#000'}
              >
                This data will be used to customize your browsing experience.
              </ThemedText>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <ThemedButton
              variantText="sfBody17Regular"
              title="Ask App Not to Track"
              variant="popup_button_not_track"
              onPress={handleNotTrack}
              textColor={theme === 'dark' ? '#fff' : '#000'}
            />
            <ThemedButton
              title="Allow"
              variantText="sfBody17Regular"
              variant="popup_button_allow"
              onPress={handleAllowTrack}
              textColor={theme === 'dark' ? '#fff' : '#000'}
            />
          </View>
        </ThemedView>
      </LinearGradient>
      </Animated.View>
    </PopupModal>
  );
};

export default PopupAllow;

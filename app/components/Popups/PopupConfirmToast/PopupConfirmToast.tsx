import React, { useEffect } from 'react';
import { Animated } from 'react-native';

import { ThemedText } from '../../General/ThemedText/ThemedText';
import { styles } from './PopupConfirmToast.styles';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';
import { PopupModal } from '../PopupModal';

export type PopupConfirmToastProps = {
  text: string;
  visible: boolean;
  onPress: () => void;
};

const PopupConfirmToast = ({ text, visible, onPress }: PopupConfirmToastProps) => {

    const { modalVisible, opacity, closeWithAnimation } = useSwipeablePopup({
    visible,
    onClose: onPress,
    direction: 'top',
  });

  useEffect(() => {
    if (visible) {
      // Автозакрытие через 3 секунды с анимацией
      const timer = setTimeout(() => {
        closeWithAnimation();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, closeWithAnimation]);

  return (
      <PopupModal
      visible={modalVisible}
      onClose={closeWithAnimation}
      animationType="none"
      backdropOpacity={0}
      rootStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
      contentStyle={{ width: '100%', paddingHorizontal: 16 }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity,
          },
        ]}
      >
        <ThemedText onlyWhiteText variant="sfBody15Regular">
          {text}
        </ThemedText>

      </Animated.View>
    </PopupModal>
  );
};

export default PopupConfirmToast;

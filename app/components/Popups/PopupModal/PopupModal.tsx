import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { styles } from './PopupModal.styles';

export type PopupModalProps = {
  visible?: boolean;
  onClose?: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  children: React.ReactNode;
  rootStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
};

const PopupModal: React.FC<PopupModalProps> = ({
  visible,
  onClose,
  animationType = 'fade',
  children,
  rootStyle,
  contentStyle,
  backdropStyle,
  backdropOpacity,
}) => {
  
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(visible);
  const animationId = useRef(0);

useEffect(() => {
  const id = ++animationId.current;

  if (visible) {
    setIsVisible(true);
    backdropOpacityAnim.stopAnimation(() => {
      backdropOpacityAnim.setValue(0);
      Animated.timing(backdropOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  } else {
    backdropOpacityAnim.stopAnimation(() => {
      Animated.timing(backdropOpacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Проверяем что это все еще актуальная анимация
        if (id === animationId.current) {
          setIsVisible(false);
        }
      });
    });
  }
}, [visible]);

const computedBackdropStyle: StyleProp<ViewStyle> = [
  styles.backdrop,
  typeof backdropOpacity === 'number'
      ? { backgroundColor: `rgba(0,0,0,${backdropOpacity})` }
      : null,
    backdropStyle,
  ];

  if (!isVisible) return null;
  return (
    <Modal
      transparent
      animationType={animationType}
      visible={isVisible}
      presentationStyle={Platform.OS === 'ios' ? 'overFullScreen' : undefined}
      statusBarTranslucent
      onRequestClose={() => onClose?.()}
    >
      <View style={styles.modalRoot}>
        <Animated.View 
          style={[
            computedBackdropStyle,
            {
              opacity: backdropOpacityAnim,
            },
          ]}
        >
        <Pressable style={{...StyleSheet.absoluteFillObject}} onPress={() => onClose?.()} />
        </Animated.View>
        <View pointerEvents="box-none" style={[styles.contentWrap, rootStyle]}>
          <View style={contentStyle}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

import { useState, useRef, useEffect } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface UseSwipeablePopupProps {
  visible: boolean;
  onClose: () => void;
  dragThreshold?: number;
  velocityThreshold?: number;
  animationDuration?: number;
  direction?: 'bottom' | 'top'; // Добавляем направление
}

export const useSwipeablePopup = ({
  visible,
  onClose,
  dragThreshold = 100,
  velocityThreshold = 0.8,
  animationDuration = 300,
  direction = 'bottom',
}: UseSwipeablePopupProps) => {
  const [modalVisible, setModalVisible] = useState(visible);
  
  // Определяем начальную позицию в зависимости от направления
  const initialPosition = direction === 'top' ? -SCREEN_HEIGHT : SCREEN_HEIGHT;
  const translateY = useRef(new Animated.Value(initialPosition)).current;
  const opacity = useRef(new Animated.Value(0)).current; // Добавляем opacity

  // Анимация открытия/закрытия
  useEffect(() => {
    setModalVisible(visible);
    if (visible) {
      translateY.setValue(initialPosition);
      opacity.setValue(0);
      
      // Параллельная анимация позиции и opacity
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 12,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateY.setValue(0);
      opacity.setValue(1);
      
      // Параллельная анимация позиции и opacity
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: initialPosition,
          useNativeDriver: true,
          tension: 50,
          friction: 12,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, initialPosition]);
const closeWithAnimation = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: initialPosition,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      onClose();
    });
  };
const closeWithAnimationComplete = (onFinished?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: initialPosition,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      onClose();
      onFinished?.();  
    });
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gesture) => {
        const isVerticalMove = Math.abs(gesture.dy) > Math.abs(gesture.dx);
        const isDownwardMove = gesture.dy > 0;
        const isSignificantMove = Math.abs(gesture.dy) > 5;
        
        return isVerticalMove && isDownwardMove && isSignificantMove;
      },
      
      onPanResponderGrant: (evt) => {
        // Можно добавить визуальную обратную связь
      },
      
      onPanResponderMove: (evt, gesture) => {
        const newPosition = gesture.dy;
        translateY.setValue(Math.max(0, newPosition));
      },
      
      onPanResponderRelease: (evt, gesture) => {
        const dragDistance = gesture.dy;
        const velocityY = gesture.vy;

        if (dragDistance > dragThreshold || velocityY > velocityThreshold) {
          // Закрываем попап
          setModalVisible(false);
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: animationDuration,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
          // Возвращаем на исходную позицию
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 12,
          }).start();
        }
      },
    })
  ).current;

  return {
    modalVisible,
    translateY,
    opacity,
    panResponder,
    closeWithAnimation,
    closeWithAnimationComplete,
  };
};

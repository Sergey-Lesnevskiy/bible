import React from 'react';

import { Animated, Image, View } from 'react-native';
import { ThemedButton } from '../../General/ThemeButton/ThemedButton';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { styles } from './PopupDontLose.styles';
import { ThemedView } from '../../General/ThemedView/ThemedView';
import GrabberHandle from '../../GrabberHandle/GrabberHandle';
import { useTheme } from '../../../context/ThemeContext';
import { PopupModal } from '../PopupModal';
import { useAppDispatch } from '../../../store/store';
import {
  restoreStreakAction,
  startNewStreakAction,
} from '../../../store/features/streak/actions';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';

let recoveries = 3;

const PopupDontLose = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const { modalVisible, translateY, opacity, panResponder, closeWithAnimation } = useSwipeablePopup({
    visible,
    onClose,
    direction: 'bottom',
  });
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const handleRestore = () => {
    closeWithAnimation();
    dispatch(restoreStreakAction());
  };
  const handleStart = () => {
    closeWithAnimation();
    dispatch(startNewStreakAction());
  };
  return (
    <PopupModal
      visible={modalVisible}
      onClose={closeWithAnimation}
      animationType="none"
      rootStyle={{ justifyContent: 'flex-end', alignItems: 'stretch' }}
      contentStyle={{ width: '100%' }}
    >
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY }],
            opacity,
          },
          theme === 'light' ? { backgroundColor: '#FFF' } : null,
        ]}
        {...panResponder.panHandlers}
      >
        <GrabberHandle />
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/streak/Fire.png')}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <ThemedText variant="amTitle2_400Semibold" align="center">
              Don't Lose Your Streak
            </ThemedText>
            <ThemedText
              variant="sfBody17Regular"
              align="center"
            >{`You have ${recoveries} recovery period \nfor this month`}</ThemedText>
            <ThemedText
              variant="sfBody13Regular"
              style={styles.text}
              align="center"
            >
              {`Your streak ends if you skip tomorrow. You can\n restore only one missed day. Stay faithful\n and connected every day`}
            </ThemedText>
          </View>
        </View>
        <View style={styles.containerButtons}>
          <ThemedButton
            title="Restore My Streak"
            variant={'primary'}
            variantText={'sfBody17Regular'}
            onlyWhiteText
            onPress={handleRestore}
          />
          <ThemedButton
            title="Start Fresh"
            variant={'transparent'}
            variantText={'sfBody17Regular'}
            onPress={handleStart}
            style={{ justifyContent: 'center', width: '100%' }}
          />
        </View>
      </Animated.View>
    </PopupModal>
  );
};

export default PopupDontLose;

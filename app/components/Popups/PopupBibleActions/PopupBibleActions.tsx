import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { COLORS } from '../../../constants/theme';
import { getAdaptiveSize } from '../../../constants/typography';

import { ThemedText } from '../../General/ThemedText/ThemedText';

import SaveDark from '../../../assets/icons/bible/save-dark.svg';
import SaveLight from '../../../assets/icons/bible/save-light.svg';
import CopyDark from '../../../assets/icons/bible/copy-dark.svg';
import CopyLight from '../../../assets/icons/bible/copy-light.svg';
import ShareDark from '../../../assets/icons/settings/share-dark.svg';
import ShareLight from '../../../assets/icons/settings/share-light.svg';

import { styles } from './PopupBibleActions.styles';
import GrabberHandle from '../../GrabberHandle/GrabberHandle';
import { PopupModal } from '../PopupModal';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';


export type PopupBibleActionsProps = {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  style?: StyleProp<ViewStyle>;
};

const PopupBibleActions: React.FC<PopupBibleActionsProps> = ({
  visible,
  onClose,
  onSave,
  onCopy,
  onShare,
  style,
}) => {
  const { theme } = useTheme();

  const { modalVisible, translateY, panResponder, closeWithAnimationComplete } = useSwipeablePopup({
    visible,
    onClose,
  });

  const iconSize = getAdaptiveSize(24, false, 2);

  const SaveIcon = theme === 'light' ? SaveDark : SaveLight;
  const CopyIcon = theme === 'light' ? CopyDark : CopyLight;
  const ShareIcon = theme === 'light' ? ShareDark : ShareLight;

  const handleSave = () => {
    closeWithAnimationComplete(() => {
      onSave?.();
    });
  };

  const handleCopy = () => {
    closeWithAnimationComplete(() => {
      onCopy?.();
    });
  };

  const handleShare = () => {
    closeWithAnimationComplete(() => {
      onShare?.();
    });
  };


  return (
    <PopupModal
      key="bible-actions-modal"
      visible={modalVisible}
      onClose={closeWithAnimationComplete}
      animationType="none"
      backdropOpacity={0}
      rootStyle={{ justifyContent: 'flex-end', alignItems: 'stretch' }}
      contentStyle={{ width: '100%' }}
    >
      <Animated.View
        style={[
          styles.container,
          style,
          {
            backgroundColor:
              theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_900,
            transform: [{ translateY }],
          },
        ]}
      >
        <View {...panResponder.panHandlers}>
          <GrabberHandle />
        </View>
        <View
          style={[
            styles.actionsRow,
            {
              backgroundColor:
                theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_900,
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && styles.actionPressed,
              {
                backgroundColor:
                  theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK,
              },
            ]}
            onPress={handleSave}
          >
            <SaveIcon width={iconSize} height={iconSize} />
            <ThemedText variant="sfBody15Regular" align="center">
              Save
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && styles.actionPressed,
              {
                backgroundColor:
                  theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK,
              },
            ]}
            onPress={handleCopy}
          >
            <CopyIcon width={iconSize} height={iconSize} />
            <ThemedText variant="sfBody15Regular" align="center">
              Copy
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && styles.actionPressed,
              {
                backgroundColor:
                  theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK,
              },
            ]}
            onPress={handleShare}
          >
            <ShareIcon width={iconSize} height={iconSize} />
            <ThemedText variant="sfBody15Regular" align="center">
              Share
            </ThemedText>
          </Pressable>
        </View>
      </Animated.View>
    </PopupModal>
  );
};

export default PopupBibleActions;

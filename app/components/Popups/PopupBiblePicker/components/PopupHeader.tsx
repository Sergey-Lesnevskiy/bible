import React from 'react';
import { Pressable, View } from 'react-native';

import { COLORS } from '../../../../constants/theme';

import GrabberHandle from '../../../GrabberHandle/GrabberHandle';
import { ThemedText } from '../../../General/ThemedText/ThemedText';

import { styles } from '../PopupBiblePicker.styles';

type PopupHeaderProps = {
  theme: 'light' | 'dark';
  CloseIcon: React.ComponentType<any>;
  onClose: () => void;
  panResponder: any;
};

const PopupHeader: React.FC<PopupHeaderProps> = ({
  theme,  
  panResponder,
  CloseIcon,
  onClose,
}) => {
  return (
    <>
      <View {...panResponder.panHandlers}>
        <GrabberHandle />
      </View>

      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.closeButton,
            pressed && { opacity: 0.7 },
            {
              backgroundColor:
                theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK,
            },
          ]}
          onPress={onClose}
        >
          <CloseIcon width={12} height={12} />
        </Pressable>

        <View style={styles.titleBox}>
          <ThemedText variant="sfBody17Semibold">Bible</ThemedText>
        </View>

        <View style={styles.rightSpacer} />
      </View>
    </>
  );
};

export default PopupHeader;

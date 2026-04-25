import React from 'react';

import { Pressable, View } from 'react-native';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { styles } from './CalendarHeader.styles';
import { COLORS_THEME } from '../../../constants/theme';
import { useTheme } from '../../../context/ThemeContext';
import ArrowLight from '../../../assets/icons/settings/arrow-right-light.svg';
import ArrowDark from '../../../assets/icons/settings/arrow-right-dark.svg';
import { getAdaptiveSize } from '../../../constants/typography';

export type CalendarHeaderProps = {
  title: string;
  onBack?: () => void;
};

const CalendarHeader = ({ title, onBack }: CalendarHeaderProps) => {
  const { theme } = useTheme();
  const Arrow = theme === 'light' ? ArrowDark : ArrowLight;
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        disabled={onBack == null}
        hitSlop={12}
        style={({ pressed }) => [
          styles.backButton,
          pressed && !!onBack && styles.pressed,
          { backgroundColor: COLORS_THEME[theme].notification },
        ]}
      >
        <View>
          <Arrow
            width={getAdaptiveSize(10, false, 1)}
            height={getAdaptiveSize(14, false, 1)}
          />
        </View>
      </Pressable>

      <ThemedText variant="sfTitle2Bold" align="center" style={styles.title}>
        {title}
      </ThemedText>

      <View style={styles.rightPlaceholder} />
    </View>
  );
};

export default CalendarHeader;

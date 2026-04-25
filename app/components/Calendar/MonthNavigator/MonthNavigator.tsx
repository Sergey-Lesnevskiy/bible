import React from 'react';

import { Pressable, View } from 'react-native';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { getAdaptiveSize } from '../../../constants/typography';
import { styles } from './MonthNavigator.styles';

import ArrowLight from '../../../assets/icons/settings/arrow-right-light.svg';
import ArrowDark from '../../../assets/icons/settings/arrow-right-dark.svg';
import ArrowDisabledLight from '../../../assets/icons/settings/arrow-right-disabled-light.svg';
import ArrowDisabledDark from '../../../assets/icons/settings/arrow-right-disabled-dark.svg';
import { useTheme } from '../../../context/ThemeContext';

export type MonthNavigatorProps = {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
};

const MonthNavigator = ({
  title,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: MonthNavigatorProps) => {
  const { theme } = useTheme();
  const Arrow = theme === 'light' ? ArrowDark : ArrowLight;
  const ArrowDisabled =
    theme === 'light' ? ArrowDisabledLight : ArrowDisabledDark;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPrev}
        disabled={prevDisabled}
        hitSlop={10}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.rotate180}>
          {prevDisabled ? (
            <ArrowDisabled
              width={getAdaptiveSize(16, false, 3)}
              height={getAdaptiveSize(16, false, 3)}
            />
          ) : (
            <Arrow
              width={getAdaptiveSize(16, false, 3)}
              height={getAdaptiveSize(16, false, 3)}
            />
          )}
        </View>
      </Pressable>

      <View style={styles.titleBox}>
        <ThemedText variant="sfBody18Semibold" align="center">
          {title}
        </ThemedText>
      </View>
      <Pressable
        onPress={onNext}
        disabled={nextDisabled}
        hitSlop={10}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.pressed,
        ]}
      >
        {nextDisabled ? (
          <ArrowDisabled
            width={getAdaptiveSize(16, false, 3)}
            height={getAdaptiveSize(16, false, 3)}
          />
        ) : (
          <Arrow
            width={getAdaptiveSize(16, false, 3)}
            height={getAdaptiveSize(16, false, 3)}
          />
        )}
      </Pressable>
    </View>
  );
};

export default MonthNavigator;

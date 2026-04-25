import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../General/ThemedText/ThemedText';
import { useTheme } from '../../context/ThemeContext';
import SvgBadgeDark from '../../assets/icons/onboarding/badge-dark.svg';
import SvgBadgeLight from '../../assets/icons/onboarding/badge-light.svg';
import { styles } from './PricingRadio.styles';
import { COLORS } from '../../constants/theme';
interface PricingOption {
  id: string;
  title: string;
  price?: string;
  showSavings?: boolean;
}

interface PricingRadioProps {
  options: PricingOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const PricingRadio: React.FC<PricingRadioProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionContainer,
              isSelected && styles.selectedOption,
              ,
              !isSelected && {
                borderColor:
                  theme === 'light' ? COLORS.GRAY_50 : COLORS.GRAY_700,
              },
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <View style={styles.content}>
              {/* Text content */}
              <View style={styles.textContainer}>
                <ThemedText variant="sfBody17Semibold">
                  {option.title}
                </ThemedText>
                {option.price && (
                  <ThemedText variant="sfBody15Regular" notifiCationText>
                    {option.price}
                  </ThemedText>
                )}
              </View>
              <View>
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                    !isSelected && {
                      borderColor:
                        theme === 'light' ? COLORS.GRAY_50 : COLORS.GRAY_700,
                    },
                  ]}
                >
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </View>
              {/* Best value indicator */}
            </View>
            {option.showSavings && (
              <View style={styles.bestValueIndicator}>
                {theme === 'light' ? <SvgBadgeLight /> : <SvgBadgeDark />}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

import React, { useCallback, useRef, useState } from 'react';
import { styles } from './Choice.styles';

import { Animated, View } from 'react-native';
import WrapperContent from '../../../../components/WrapperContent/WrapperContent';
import { ThemedText } from '../../../../components/General/ThemedText/ThemedText';
import { ThemedButton } from '../../../../components/General/ThemeButton/ThemedButton';
import TopScrollGradient from '../../../../components/TopScrollGradient/TopScrollGradient';
import BottomScrollGradient from '../../../../components/BottomScrollGradient/BottomScrollGradient';
import { useTheme } from '../../../../context/ThemeContext';
import { COLORS } from '../../../../constants/theme';

import { getAdaptiveSize } from '../../../../constants/typography';
import { IWithOnClick, IWithSelectString } from '../../../../types/iWith';

interface ChoicerPops extends IWithOnClick, IWithSelectString {
  title: string;
  description?: string;
  options: string[];
}

const Choice: React.FC<ChoicerPops> = ({
  title,
  description,
  options,
  onClick,
  onSelect,
}) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isAtBottom, setIsAtBottom] = useState(false);
  const topGradientOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = useCallback(
    (option: string) => {
      const newSelection = selectedOption === option ? null : option;
      setSelectedOption(newSelection);
      onSelect(option);
    },
    [selectedOption],
  );

  const handleContinue = () => {
    if (selectedOption === null) return;

    onClick();
  };

  const continueButtonVariant =
    selectedOption === null ? 'disabled' : 'primary';

  return (
    <WrapperContent type="launcher">
      <View style={styles.header}>
        <View style={styles.containerText}>
          <ThemedText align="left" variant="sfTitle1Semibold">
            {title}
          </ThemedText>
          {description && (
            <ThemedText variant="sfBody17Regular" align="left" notifiCationText>
              {description}
            </ThemedText>
          )}
        </View>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.scrollArea}>
          <TopScrollGradient
            style={styles.topGradient}
            opacity={topGradientOpacity}
            colorsLight={
              ['rgba(255,255,255,1)', 'rgba(255, 255, 255, 0)'] as const
            }
            colorsDark={
              [
                COLORS.BLACK_10,
                'rgba(10, 10, 11, 0.92)',
                'rgba(10, 10, 11, 0.65)',
                'rgba(10, 10, 11, 0)',
              ] as const
            }
          />

          <Animated.View
            pointerEvents="none"
            style={[styles.bottomGradient, { opacity: isAtBottom ? 0 : 1 }]}
          >
            {theme === 'light' ? (
              <BottomScrollGradient
                style={{ flex: 1 }}
                colorsLight={
                  ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'] as const
                }
              />
            ) : (
              <BottomScrollGradient
                style={{ flex: 1 }}
                colorsDark={
                  [
                    'rgba(10, 10, 11, 0)',
                    'rgba(10, 10, 11, 0.65)',
                    'rgba(10, 10, 11, 0.92)',
                    COLORS.BLACK_10,
                  ] as const
                }
                locations={[0, 0.45, 0.75, 1] as const}
              />
            )}
          </Animated.View>

          <Animated.ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
                listener: (event: any) => {
                  const { contentOffset, layoutMeasurement, contentSize } =
                    event.nativeEvent;
                  const paddingToBottom = 16;
                  const reachedBottom =
                    contentOffset.y + layoutMeasurement.height >=
                    contentSize.height - paddingToBottom;

                  setIsAtBottom(reachedBottom);
                },
              },
            )}
            contentContainerStyle={{
              paddingBottom: getAdaptiveSize(40, false, 10),
            }}
            scrollEventThrottle={16}
          >
            <View style={styles.listQuestions}>
              {options.map((item, index) => {
                const isSelected = selectedOption === item;
                return (
                  <ThemedButton
                    title={item}
                    variant={'question'}
                    key={`religion-${index}`}
                    onPress={() => {
                      handleSelectOption(item);
                    }}
                    isSelected={isSelected}
                  />
                );
              })}
            </View>
          </Animated.ScrollView>
        </View>
        <View style={styles.containerButton}>
          <ThemedButton
            title="Continue"
            style={{
              height: getAdaptiveSize(60, false, 10),
              opacity: 1,
            }}
            variant={continueButtonVariant}
            onlyWhiteText={continueButtonVariant === 'disabled' ? false : true}
            textColor={
              theme === 'dark'
                ? COLORS.GRAY_425
                : COLORS.PRIMARY_TEXT_THEME_DARK
            }
            onPress={handleContinue}
            disabled={continueButtonVariant === 'disabled'}
          />
        </View>
      </View>
    </WrapperContent>
  );
};

export default Choice;

import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { styles } from './WelcomePage.styles';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';

import SvgLight from '../../../assets/icons/onboarding/star-light.svg';
import SvgDark from '../../../assets/icons/onboarding/star-dark.svg';
import { useTheme } from '../../../context/ThemeContext';


import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';
import { getAdaptiveSize } from '../../../constants/typography';
import { REMOVE_SIZE } from '../../../constants/metrics';

import { COLORS } from '../../../constants/theme';
import { IWithOnClick } from '../../../types/iWith';

const WelcomePage = ({ onClick }: IWithOnClick) => {
  const { theme } = useTheme();
  const iconSize = getAdaptiveSize(40, false, REMOVE_SIZE.SIZE_10);

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <View style={styles.containerHeader}>
          <View style={styles.iconContainer}>
            {theme === 'light' ? (
              <SvgLight width={iconSize} height={iconSize} />
            ) : (
              <SvgDark width={iconSize} height={iconSize} />
            )}
          </View>
          <View style={styles.containerText}>
            <ThemedText variant="sfLargeTitleBold" align="left" reverseColor>
              {`Let God’s \nWord Lead You`}
            </ThemedText>
            <ThemedText
              variant="sfBody17Regular"
              align="left"
              color={theme === 'dark' ? COLORS.GRAY_380 : COLORS.WHITE_10}
            >
              Begin a daily journey of faith and inspiration
            </ThemedText>
          </View>
        </View>
        <ThemedView type="transparent" style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/onboarding/Welcome.png')}
            style={styles.image}
          />
        </ThemedView>
        <View style={styles.containerButton}>
          <ThemedButton title="Continue" variant="secondary" onPress={onClick} style={{ width: '100%' }} />
        </View>
      </View>
    </View>
  );
};

export default WelcomePage;

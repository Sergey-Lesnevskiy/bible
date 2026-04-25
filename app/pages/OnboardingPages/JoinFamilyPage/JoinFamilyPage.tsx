import React from 'react';
import { styles } from './JoinFamilyPage.styles';

import { Image, View } from 'react-native';
import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';

import { ThemedText } from '../../../components/General/ThemedText/ThemedText';

import WrapperContent from '../../../components/WrapperContent/WrapperContent';
import ArrowDark from '../../../assets/icons/onboarding/arrow-dark.svg';
import ArrowLight from '../../../assets/icons/onboarding/arrow-light.svg';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';
import { getAdaptiveSize } from '../../../constants/typography';
import { useTheme } from '../../../context/ThemeContext';
import { REMOVE_SIZE } from '../../../constants/metrics';
import { useAppDispatch } from '../../../store/store';
import { openPopupAction } from '../../../store/features/popup/actions';

const JoinFamilyPage = () => {
  const { theme } = useTheme();
  const iconSize = getAdaptiveSize(100, false, REMOVE_SIZE.SIZE_30);
  const dispatch = useAppDispatch();

  const handleOpenPopup = () => {
    dispatch(openPopupAction({ key: 'allowSendNotifications' }));
  };

  return (
    <WrapperContent type="launcher">
      <View style={styles.containerText}>
        <ThemedText align="left" variant="sfTitle1Semibold">
          Join a Vibrant and Expanding Faith Family
        </ThemedText>
        <ThemedText variant="sfBody17Regular" align="left" notifiCationText>
          Thousands grow their faith every day with our personalized widget.
          Turn on notifications to stay inspired and connected
        </ThemedText>
      </View>
      <View style={styles.containerImages}>
        <ThemedView type="transparent" style={styles.wrapperImage}>
          {theme === 'light' ? (
            <Image
              source={require('../../../assets/images/onboarding/JoinFamily-light.png')}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../../assets/images/onboarding/JoinFamily-dark.png')}
              style={styles.image}
            />
          )}
        </ThemedView>
        <ThemedView type="transparent" style={styles.wrapperIcon}>
          {theme === 'light' ? (
            <ArrowDark
              style={styles.iconArrow}
              width={iconSize}
              height={iconSize}
            />
          ) : (
            <ArrowLight
              style={styles.iconArrow}
              width={iconSize}
              height={iconSize}
            />
          )}
        </ThemedView>
      </View>
      <View style={styles.containerButton}>
        <ThemedButton
          title="Continue"
          variant="primary"
          onlyWhiteText
          onPress={handleOpenPopup}
        />
      </View>
    </WrapperContent>
  );
};

export default JoinFamilyPage;

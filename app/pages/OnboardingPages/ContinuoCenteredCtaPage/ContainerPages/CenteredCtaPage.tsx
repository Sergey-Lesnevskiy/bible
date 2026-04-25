import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { styles } from './CenteredCtaPage.styles';
import { ThemedView } from '../../../../components/General/ThemedView/ThemedView';
import { ThemedText } from '../../../../components/General/ThemedText/ThemedText';
import { ThemedButton } from '../../../../components/General/ThemeButton/ThemedButton';

import { getAdaptiveSize } from '../../../../constants/typography';
import { REMOVE_SIZE } from '../../../../constants/metrics';
import { MaxWidthContainerOnboarding } from '../../../../components/MaxWidthContainer/MaxWidthContainerOnboarding/MaxWidthContainerOnboarding';

interface CenteredCtaPageProps {
  title: string;
  IconLight: React.FC<SvgProps>;
  IconDark: React.FC<SvgProps>;
  theme: 'light' | 'dark';
  buttonTitle: string;
  onPress: () => void;
  lightBackgroundColor?: string;
}

const CenteredCtaPage: React.FC<CenteredCtaPageProps> = ({
  title,
  IconLight,
  IconDark,
  theme,
  buttonTitle,
  onPress,
  lightBackgroundColor,
}) => {
  const iconSize = getAdaptiveSize(40, false, REMOVE_SIZE.SIZE_10);
  const Icon = theme === 'light' ? IconDark : IconLight;

  return (
    <ThemedView
      style={[
        styles.container,
        theme === 'light' && lightBackgroundColor
          ? { backgroundColor: lightBackgroundColor }
          : null,
      ]}
      type="notification"
    >
      <MaxWidthContainerOnboarding>
        <View style={styles.content}>
          <ThemedView type="transparent" style={styles.imageContainer}>
            <Icon width={iconSize} height={iconSize} />
          </ThemedView>
          <ThemedText variant="amTitle1_400Semibold" align="center">
            {title}
          </ThemedText>
        </View>
        <View style={styles.containerButton}>
          <ThemedButton
            title={buttonTitle}
            variant={'primary'}
            onlyWhiteText
            onPress={onPress}
          />
        </View>
      </MaxWidthContainerOnboarding>
    </ThemedView>
  );
};

export default CenteredCtaPage;

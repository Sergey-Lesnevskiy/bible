import React, { useEffect } from 'react';
import { styles } from './LaunchPage.styles';
import { ThemedView } from '../../../components/General/ThemedView/ThemedView';
import { ThemedText } from '../../../components/General/ThemedText/ThemedText';
import { useTheme } from '../../../context/ThemeContext';
import { getAdaptiveSize } from '../../../constants/typography';
import { REMOVE_SIZE } from '../../../constants/metrics';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { selectUserDataSelector } from '../../../store/features/userData/selectors';
import { isNil } from '../../../utils/nil';
import { openPopupAction } from '../../../store/features/popup/actions';
import { Image } from 'react-native';

interface ILaunchPageProps {
  onboarding?: boolean;
}

const LaunchPage = ({ onboarding = false }: ILaunchPageProps) => {
  const { theme } = useTheme();
  const iconSize = getAdaptiveSize(120, false, REMOVE_SIZE.SIZE_20);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(selectUserDataSelector);

  useEffect(() => {
    if (onboarding) {
      if (isNil(userData.allowTrackActivity)) {
        dispatch(openPopupAction({ key: 'allowTrackActivity' }));
      }
    }
  }, [userData]);

  return (
    <ThemedView style={styles.container} type="launcher">
      <ThemedView type="area" style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/onboarding/Icon-logo.png')}
          style={{ width: iconSize, height: iconSize }}
        />
      </ThemedView>
      <ThemedText variant="amTitle1_400Semibold" align="center">
        Ready to dive deeper into Scripture?
      </ThemedText>
    </ThemedView>
  );
};

export default LaunchPage;

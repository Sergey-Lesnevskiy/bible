import React, { useCallback, useState } from 'react';
import { styles } from './LetterPtroblemPage.styles';

import { ThemedButton } from '../../../components/General/ThemeButton/ThemedButton';

import { ThemedText } from '../../../components/General/ThemedText/ThemedText';

import WrapperContent from '../../../components/WrapperContent/WrapperContent';

import {
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

import LockSvgDark from '../../../assets/icons/onboarding/lock-dark.svg';
import LockSvgLight from '../../../assets/icons/onboarding/lock-light.svg';
import { ThemedInput } from '../../../components/General/ThemedInput/ThemedInput';
import { useTheme } from '../../../context/ThemeContext';
import { getAdaptiveSize } from '../../../constants/typography';
import { COLORS } from '../../../constants/theme';
import { IWithOnClick } from '../../../types/iWith';
import { useAppDispatch } from '../../../store/store';
import { updateFacingMessageAction } from '../../../store/features/userData/actions';

const LetterProblemPage = ({ onClick }: IWithOnClick) => {
  const [letter, setLetter] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    onClick();
  };
  const handleSelectReligion = useCallback((religion: string) => {
    setLetter(religion);
    dispatch(updateFacingMessageAction(religion));
  }, []);

  const isDisabled = letter.trim().length === 0;

  const { theme } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? isFocused
            ? getAdaptiveSize(120, false, 10)
            : 0
          : 0
      }
      style={{ flex: 1 }}
    >
        <WrapperContent style={{ justifyContent: 'flex-start' }}>
          <View style={{ flex: 1, height: '100%' }}>
            <View style={styles.header}>
              <View style={styles.containerText}>
                <ThemedText align="left" variant="sfTitle1Semibold">
                  Let’s bring God into what you’re facing right now
                </ThemedText>
                <ThemedText
                  variant="sfBody17Regular"
                  align="left"
                  notifiCationText
                  style={{ marginBottom: 30 }}
                >
                  This allows us to personalize your experience
                </ThemedText>
              </View>
            </View>

            <View
              style={[styles.inputArea]}
            >
              <View style={styles.containerInputText}>
                <ThemedInput
                  type="primary"
                  value={letter}
                  onChangeText={handleSelectReligion}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Be honest with yourself. Which situation, habit, or feeling has been the toughest for you lately?"
                />
              </View>
            </View>

            <View style={[styles.footer, isFocused && styles.inputAreaFocusedFooter]}>
              {!isFocused && (
                <View style={styles.containerLock}>
                  {theme === 'light' ? <LockSvgDark /> : <LockSvgLight />}
                  <ThemedText
                    variant="sfBody13Regular"
                    notifiCationText
                    align="center"
                  >
                    Your privacy is guaranteed and your information{'\n'} will
                    remain confidential
                  </ThemedText>
                </View>
              )}
              <View style={[styles.containerButton]}>
                <ThemedButton
                  title="Continue"
                  variant={isDisabled ? 'disabled' : 'primary'}
                  onlyWhiteText={!isDisabled}
                  textColor={
                    theme === 'dark'
                      ? COLORS.GRAY_425
                      : COLORS.PRIMARY_TEXT_THEME_DARK
                  }
                  onPress={handleNextPage}
                  style={{
                    height: getAdaptiveSize(60, false, 10),
                    opacity: 1,
                  }}
                  disabled={isDisabled}
                />
              </View>
            </View>
          </View>
        </WrapperContent>
    </KeyboardAvoidingView>
  );
};

export default LetterProblemPage;
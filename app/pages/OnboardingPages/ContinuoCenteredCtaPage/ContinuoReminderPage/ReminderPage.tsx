import React from 'react';
import SvgLight from '../../../../assets/icons/onboarding/star-light.svg';
import SvgDark from '../../../../assets/icons/onboarding/star-dark.svg';
import { useTheme } from '../../../../context/ThemeContext';
import CenteredCtaPage from '../ContainerPages/CenteredCtaPage';
import { IWithOnClick } from '../../../../types/iWith';

const ReminderPage = ({ onClick }: IWithOnClick) => {
  const { theme } = useTheme();
  const handleNextPage = () => {
    onClick();
  };

  return (
    <CenteredCtaPage
      title={'You’ll receive a \nreminder 2 days before your trial expires'}
      IconLight={SvgLight}
      IconDark={SvgDark}
      theme={theme}
      lightBackgroundColor="#FFF"
      buttonTitle="Continue"
      onPress={handleNextPage}
    />
  );
};

export default ReminderPage;

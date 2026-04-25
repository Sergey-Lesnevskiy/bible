import React from 'react';
import SvgLight from '../../../../assets/icons/onboarding/star-light.svg';
import SvgDark from '../../../../assets/icons/onboarding/star-dark.svg';
import { useTheme } from '../../../../context/ThemeContext';
import CenteredCtaPage from '../ContainerPages/CenteredCtaPage';
import { IWithOnClick } from '../../../../types/iWith';

const OfferPage = ({ onClick }: IWithOnClick) => {
  const { theme } = useTheme();
  const handleNextPage = () => {
    onClick();
  };

  return (
    <CenteredCtaPage
      title="We provide 7 free days to help everyone grow closer to God"
      IconLight={SvgLight}
      IconDark={SvgDark}
      theme={theme}
      lightBackgroundColor="#FFF"
      buttonTitle="Continue"
      onPress={handleNextPage}
    />
  );
};

export default OfferPage;

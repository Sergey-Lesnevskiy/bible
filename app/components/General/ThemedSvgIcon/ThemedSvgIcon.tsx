import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '../../../context/ThemeContext';
import { getAdaptiveSize } from '../../../constants/typography';

type SvgComponent = React.FC<SvgProps>;

interface ThemedSvgIconProps {
  LightIcon: SvgComponent;
  DarkIcon: SvgComponent;
  baseSize?: number;
  useVerticalScale?: boolean;
  step?: number;
  iconProps?: SvgProps;
}

const ThemedSvgIcon: React.FC<ThemedSvgIconProps> = ({
  LightIcon,
  DarkIcon,
  baseSize,
  useVerticalScale = true,
  step,
  iconProps,
}) => {
  const { theme } = useTheme();
  const size =
    baseSize != null
      ? getAdaptiveSize(baseSize, useVerticalScale, step)
      : undefined;

  const Icon = theme === 'light' ? LightIcon : DarkIcon;

  return (
    <Icon
      {...(size != null ? { width: size, height: size } : {})}
      {...iconProps}
    />
  );
};

export default ThemedSvgIcon;

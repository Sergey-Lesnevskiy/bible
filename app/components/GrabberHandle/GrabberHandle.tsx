import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import ThemedSvgIcon from '../General/ThemedSvgIcon/ThemedSvgIcon';

import GrabberLight from '../../assets/icons/streak/grabber-light.svg';
import GrabberDark from '../../assets/icons/streak/grabber-dark.svg';

import { styles } from './GrabberHandle.styles';

export type GrabberHandleProps = {
  style?: StyleProp<ViewStyle>;
};

const GrabberHandle: React.FC<GrabberHandleProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <ThemedSvgIcon LightIcon={GrabberDark} DarkIcon={GrabberLight} />
    </View>
  );
};

export default GrabberHandle;

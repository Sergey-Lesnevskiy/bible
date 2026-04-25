import React from 'react';

import { Image, View } from 'react-native';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { ThemedView } from '../../General/ThemedView/ThemedView';
import IconFireDark from '../../../assets/icons/streak/fire-dark.svg';
import IconFireLight from '../../../assets/icons/streak/fire-light.svg';
import IconFireRed from '../../../assets/icons/streak/fire-red.svg';
import { styles } from './StatsCards.styles';
import ThemedSvgIcon from '../../General/ThemedSvgIcon/ThemedSvgIcon';

export type StatsCardData = {
  icon: 'moon';
  value: number;
  label: string;
  isDaily?: boolean;
};

export type StatsCardsProps = {
  left: StatsCardData;
  right: StatsCardData;
};

const StatsCard = ({ data }: { data: StatsCardData }) => {
  return (
    <ThemedView type="notification" style={styles.card}>
      <View style={styles.valueRow}>
        {data.isDaily ? (
          <Image
            source={require('../../../assets/images/streak/Fire.png')}
            style={styles.imageFireActive}
          />
        ) : (
          <IconFireRed />
        )}
        <ThemedText variant="amBody20Default">{data.value}</ThemedText>
      </View>
      <ThemedText variant="sfBody17Regular" notifiCationText>
        {data.label}
      </ThemedText>
    </ThemedView>
  );
};

const StatsCards = ({ left, right }: StatsCardsProps) => {
  return (
    <View style={styles.container}>
      <StatsCard data={left} />
      <StatsCard data={right} />
    </View>
  );
};

export default StatsCards;

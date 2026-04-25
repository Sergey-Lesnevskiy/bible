import React from 'react';

import { View } from 'react-native';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { styles } from './WeekdayRow.styles';

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const WeekdayRow = () => {
  return (
    <View style={styles.container}>
      {labels.map((l) => (
        <View key={l} style={styles.cell}>
          <ThemedText variant="sfBody17Regular" notifiCationText align="center">
            {l}
          </ThemedText>
        </View>
      ))}
    </View>
  );
};

export default WeekdayRow;

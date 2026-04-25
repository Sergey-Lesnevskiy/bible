import React from 'react';
import { ThemedText } from '../../General/ThemedText/ThemedText';
import { ThemedView } from '../../General/ThemedView/ThemedView';
import { styles } from './HolidayNotification.styles';

interface HolidayNotificationProps {
  title: string;
  description: string;
  date: string | undefined;
}

const HolidayNotification: React.FC<HolidayNotificationProps> = ({
  title,
  description,
  date,

}) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  return (
    <ThemedView type="notification" style={styles.notification}>
      <ThemedText variant="amBody20Default">{title}</ThemedText>
      <ThemedText variant="sfBody17Regular" notifiCationText>
        {description}
      </ThemedText>
      <ThemedText variant="sfBody17Regular" notifiCationText>
        {formattedDate}
      </ThemedText>
    </ThemedView>
  );
};

export default HolidayNotification;

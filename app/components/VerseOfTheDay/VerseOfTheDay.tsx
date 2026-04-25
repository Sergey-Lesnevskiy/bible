import React from 'react';
import { ImageBackground, StyleProp, View, ViewStyle } from 'react-native';
import { ThemedText } from '../General/ThemedText/ThemedText';
import { styles } from './VerseOfTheDay.styles';

interface VerseOfTheDayProps {
  text: string;
  acts?: React.ReactNode;
  greeting?: string;
  style?: StyleProp<ViewStyle>;
}

const VerseOfTheDay: React.FC<VerseOfTheDayProps> = ({
  text,
  acts,
  greeting = 'Verse Of the Day',
  style,
}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/streak/VerseOfDay.jpg')}
      style={[styles.background, style]}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      <View pointerEvents="none" style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.greetingContainer}>
          <ThemedText variant="amBody20Default" align="center" onlyWhiteText>
            {greeting}
          </ThemedText>
        </View>

        <View style={styles.textContainer}>
          <ThemedText variant="amBody20Default" align="center" onlyWhiteText>
            {text}
          </ThemedText>
        </View>

        {acts != null && (
          <ThemedText
            align="center"
            style={styles.actsContainer}
            notifiCationText
            variant="amBody16Default"
          >
            Acts {acts}
          </ThemedText>
        )}
      </View>
    </ImageBackground>
  );
};

export default VerseOfTheDay;

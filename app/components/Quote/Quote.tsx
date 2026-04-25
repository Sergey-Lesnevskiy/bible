import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { ThemedText } from '../General/ThemedText/ThemedText';
import { styles } from './Quote.styles';
import { COLORS_THEME } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useAppSelector } from '../../store/store';
import { selectFontSize } from '../../store/features/bibleReader/selectors';

export type QuoteProps = {
  number: number;
  text: string;
  highlightQuery?: string;
  isSelected?: boolean;
  onPress?: () => void;
  onLayout?: (y: number) => void;
};

const Quote: React.FC<QuoteProps> = ({
  number,
  text,
  highlightQuery,
  isSelected,
  onPress,
  onLayout,
}) => {
  const { theme } = useTheme();
  const fontSize = useAppSelector(selectFontSize);

  const renderHighlightedText = () => {
    const query = (highlightQuery ?? '').trim();

    const lines = text.split('\n');

    if (!query) {
      return lines.map((line, lineIdx) => (
        <Text key={lineIdx}>
          {line}
          {lineIdx < lines.length - 1 ? '\n' : ''}
        </Text>
      ));
    }

    const qLower = query.toLowerCase();
    const allParts: React.ReactNode[] = [];
    let globalKey = 0;

    lines.forEach((line, lineIdx) => {
      const lower = line.toLowerCase();
      let startIndex = 0;

      while (startIndex < line.length) {
        const matchIndex = lower.indexOf(qLower, startIndex);
        if (matchIndex === -1) {
          const tail = line.slice(startIndex);
          if (tail) allParts.push(<Text key={globalKey++}>{tail}</Text>);
          break;
        }

        const before = line.slice(startIndex, matchIndex);
        if (before) allParts.push(<Text key={globalKey++}>{before}</Text>);

        const match = line.slice(matchIndex, matchIndex + query.length);
        allParts.push(
          <Text key={globalKey++} style={styles.highlight}>
            {match}
          </Text>,
        );

        startIndex = matchIndex + query.length;
      }

      // Add line break after each line except the last one
      if (lineIdx < lines.length - 1) {
        allParts.push(<Text key={globalKey++}>{'\n'}</Text>);
      }
    });

    return allParts;
  };

  return (
    <Pressable
      onPress={onPress}
      onLayout={(e) => {
        onLayout?.(e.nativeEvent.layout.y);
      }}
    >
      <View style={styles.container}>
        <ThemedText
          style={{ color: COLORS_THEME[theme].notification_text }}
          variant="sfBody13Regular"
        >
          {number}
        </ThemedText>
        <ThemedText
          style={[
            styles.verseText,
            { fontSize },
            isSelected && styles.verseTextSelected,
          ]}
          variant="sfBody17Regular"
        >
          {renderHighlightedText()}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default Quote;

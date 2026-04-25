import React from 'react';
import { View } from 'react-native';

import { ThemedText } from '../General/ThemedText/ThemedText';
import Quote from '../Quote/Quote';
import { VALUE_HEIGHT } from '../../constants/metrics';
import { COLORS_THEME } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export type ParagraphProps = {
  verses: string[];
  highlightQuery?: string;
  selectedVerseIndex?: number | null;
  onVerseLayout?: (payload: {
    index: number;
    number: number;
    y: number;
  }) => void;
  onVersePress?: (payload: {
    index: number;
    number: number;
    text: string;
  }) => void;
};

const Paragraph: React.FC<ParagraphProps> = ({
  verses,
  highlightQuery,
  selectedVerseIndex,
  onVerseLayout,
  onVersePress,
}) => {
  const query = (highlightQuery ?? '').trim();
  const queryLower = query.toLowerCase();
  const shouldFilter = queryLower.length > 0;
  const { theme } = useTheme();
  const hasMatches =
    !shouldFilter ||
    verses.some((text) => text.toLowerCase().includes(queryLower));

  return (
    <View>
      {shouldFilter && !hasMatches ? (
        <View
          style={{
            width: '100%',
            minHeight: VALUE_HEIGHT.SIZE_5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThemedText
            variant="sfBody17Regular"
            align="center"
            style={{ color: COLORS_THEME[theme].notification_text }}
          >
            No verses matches your search term
          </ThemedText>
        </View>
      ) : null}
      {verses.map((text, idx) => {
        if (shouldFilter && !text.toLowerCase().includes(queryLower))
          return null;
        return (
          <Quote
            key={idx}
            number={idx + 1}
            text={text}
            highlightQuery={query}
            isSelected={selectedVerseIndex === idx}
            onLayout={(y) => {
              onVerseLayout?.({ index: idx, number: idx + 1, y });
            }}
            onPress={() => {
              onVersePress?.({ index: idx, number: idx + 1, text });
            }}
          />
        );
      })}
    </View>
  );
};

export default Paragraph;

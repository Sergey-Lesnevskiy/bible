import React, { useMemo} from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '../General/ThemedText/ThemedText';
import { ThemedView } from '../General/ThemedView/ThemedView';
import { styles } from './Notification.styles';

import { StarRating } from '../StarRating/StartRating';

import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants/theme';

import { COUNT_LINES, HEIGHT_LINES } from '../../constants/metrics';
import { getAdaptiveSize } from '../../constants/typography';

interface NotificationProps {
  text: string;
  name: string;
  star?: number;
  baseWidth?: number;

  isSecondType?: boolean;
  heightsRef?: React.RefObject<Record<string, number>>;
  onPress?: () => void;
  showTrash?: boolean;
  itemId?: string;
  background?: string;
  enableHeightCalculation?: boolean;
}

export const Notification: React.FC<NotificationProps> = ({
  name,
  star,
  text,
  isSecondType,
  onPress,
  showTrash,
  baseWidth,
  itemId,
  heightsRef,
  enableHeightCalculation,
  background,
}) => {
  const { theme } = useTheme();

  const textVariant = useMemo(
    () => (isSecondType ? 'sfBody17Regular' : 'sfBody15Regular'),
    [isSecondType],
  );

  const calculatedLines = useMemo(() => {
    if (!enableHeightCalculation || !itemId) return COUNT_LINES.default;

    const storedHeight = heightsRef?.current[itemId];
    if (!storedHeight) return COUNT_LINES.default;

    const lineHeight = isSecondType
      ? getAdaptiveSize(HEIGHT_LINES.default_22)
      : getAdaptiveSize(HEIGHT_LINES.default_20);

    return Math.max(1, Math.floor(storedHeight / lineHeight));
  }, [itemId, enableHeightCalculation, isSecondType]);

  const content = (
    <ThemedView
      style={[
        styles.container,
        isSecondType && { gap: 12 },
        background != null ? { backgroundColor: background } : null,
        { overflow: 'hidden' },
      ]}
      type="notification"
    >
      <View style={styles.row}>
        <View style={styles.main}>
          <View style={[styles.containerName, {
            overflow: 'hidden',
            width: baseWidth,
            maxWidth: baseWidth,
            minWidth: baseWidth,
            flexShrink: 0,
          }]} >
            <ThemedText
              variant="amBody20Default"
              align="left"
            >
              {name}
            </ThemedText>
            {star && (
              <ThemedText variant="sfBody15Regular">
                <StarRating rating={star} />
              </ThemedText>
            )}
          </View>
          {
            enableHeightCalculation ? (
              <View
                onLayout={
                  !showTrash && itemId ?
                    e => {
                      const { height: layoutHeight } = e.nativeEvent.layout;
                      if (layoutHeight > 0 && heightsRef?.current && !heightsRef.current[itemId]) {
                        heightsRef.current[itemId] = layoutHeight;
                      }

                    } : undefined
                }
                style={{
                  overflow: 'hidden',
                  width: baseWidth,
                  maxWidth: baseWidth,
                  minWidth: baseWidth,
                  flexShrink: 0,
                }}
              >
                <ThemedText
                  variant={textVariant}
                  align="left"
                  numberOfLines={calculatedLines}
                  style={[
                    {
                      color: theme === 'light' ? COLORS.GRAY_350 : COLORS.GRAY_375,
                    },
                  ]}
                >
                  {text}
                </ThemedText>
              </View>
            ) : (
              <View>
                <ThemedText
                  variant={textVariant}
                  align="left"
                  style={[
                    {
                      color: theme === 'light' ? COLORS.GRAY_350 : COLORS.GRAY_375,
                    },
                  ]}
                >
                  {text}
                </ThemedText>
              </View>
            )
          }
        </View>
      </View>
    </ThemedView>
  );

  if (!onPress) return content;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

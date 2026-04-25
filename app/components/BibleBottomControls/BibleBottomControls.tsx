import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../context/ThemeContext';
import { COLORS_THEME } from '../../constants/theme';
import { getAdaptiveSize } from '../../constants/typography';

import ArrowLight from '../../assets/icons/settings/arrow-right-light.svg';
import ArrowDark from '../../assets/icons/settings/arrow-right-dark.svg';
import PlayIconDark from '../../assets/icons/bible/play-dark.svg';
import PauseIconDark from '../../assets/icons/bible/pause-dark.svg';
import PauseIconLight from '../../assets/icons/bible/pause-light.svg';
import PlayIconLight from '../../assets/icons/bible/play-light.svg';

import { styles } from './BibleBottomControls.styles';

export type BibleBottomControlsProps = {
  onPrev?: () => void;
  onPlay?: () => void;
  onNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  isPlaying?: boolean;
  chapterKeys?: string[];
  currentChapterIndex?: number;
  onChangeChapter?: (nextChapter: string) => void;
  style?: StyleProp<ViewStyle>;
};

const BibleBottomControls: React.FC<BibleBottomControlsProps> = ({
  onPrev,
  onPlay,
  onNext,
  disabledPrev,
  disabledNext,
  isPlaying: isPlayingProp,
  chapterKeys,
  currentChapterIndex,
  onChangeChapter,
  style,
}) => {
  const { theme } = useTheme();
  const isPlaying = isPlayingProp ?? false;

  const handlePrev = () => {
    if (
      chapterKeys &&
      typeof currentChapterIndex === 'number' &&
      onChangeChapter
    ) {
      if (chapterKeys.length === 0) return;
      const nextIndex =
        (currentChapterIndex - 1 + chapterKeys.length) % chapterKeys.length;
      const nextChapter = chapterKeys[nextIndex];
      if (!nextChapter) return;
      onChangeChapter(nextChapter);
      return;
    }
    if (!disabledPrev) onPrev?.();
  };

  const handleNext = () => {
    if (
      chapterKeys &&
      typeof currentChapterIndex === 'number' &&
      onChangeChapter
    ) {
      if (chapterKeys.length === 0) return;
      const nextIndex = (currentChapterIndex + 1) % chapterKeys.length;
      const nextChapter = chapterKeys[nextIndex];
      if (!nextChapter) return;
      onChangeChapter(nextChapter);
      return;
    }
    if (!disabledNext) onNext?.();
  };

  const handleTogglePlay = () => {
    onPlay?.();
  };

  const CenterIcon = isPlaying
    ? theme === 'light'
      ? PauseIconDark
      : PauseIconLight
    : theme === 'light'
      ? PlayIconDark
      : PlayIconLight;

  const borderColors: readonly [string, string, ...string[]] =
    theme === 'dark'
      ? [
          'rgba(255,255,255,0.55)',
          'rgba(255,255,255,0.08)',
          'rgba(255,255,255,0.55)',
        ]
      : [
          'rgba(255,255,255,0.95)',
          'rgba(255,255,255,0.55)',
          'rgba(255,255,255,0.95)',
        ];

  const innerColors: readonly [string, string, ...string[]] =
    theme === 'dark'
      ? ['#3A3A3A', '#121212', '#0B0B0B']
      : ['#FFFFFF', '#F3F3F3', '#E9E9E9'];

  return (
    <View style={[styles.bottomControls, style]}>
      <LinearGradient
        colors={borderColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.controlButtonGradient}
      >
        <Pressable
          hitSlop={12}
          style={({ pressed }) => [
            styles.controlButtonInner,
            pressed && styles.pressed,
            { backgroundColor: COLORS_THEME[theme].notification },
          ]}
          onPress={handlePrev}
        >
          <LinearGradient
            colors={innerColors}
            locations={[0, 0.55, 1]}
            start={{ x: 0.15, y: 0.15 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
          />
          <View style={styles.controlButtonContent}>
            <View style={styles.rotate180}>
              {theme === 'light' ? (
                <ArrowDark
                  width={getAdaptiveSize(14, false, 3)}
                  height={getAdaptiveSize(14, false, 3)}
                />
              ) : (
                <ArrowLight
                  width={getAdaptiveSize(14, false, 3)}
                  height={getAdaptiveSize(14, false, 3)}
                />
              )}
            </View>
          </View>
        </Pressable>
      </LinearGradient>

      <LinearGradient
        colors={borderColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.controlButtonGradient}
      >
        <Pressable
          hitSlop={12}
          style={({ pressed }) => [
            styles.controlButtonInner,
            pressed && styles.pressed,
            { backgroundColor: COLORS_THEME[theme].notification },
          ]}
          onPress={handleTogglePlay}
        >
          <LinearGradient
            colors={innerColors}
            locations={[0, 0.55, 1]}
            start={{ x: 0.15, y: 0.15 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
          />
          <View style={styles.controlButtonContent}>
            <CenterIcon
              width={getAdaptiveSize(15, false, 3)}
              height={getAdaptiveSize(17, false, 3)}
            />
          </View>
        </Pressable>
      </LinearGradient>

      <LinearGradient
        colors={borderColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.controlButtonGradient}
      >
        <Pressable
          hitSlop={12}
          style={({ pressed }) => [
            styles.controlButtonInner,
            pressed && styles.pressed,
            { backgroundColor: COLORS_THEME[theme].notification },
          ]}
          onPress={handleNext}
        >
          <LinearGradient
            colors={innerColors}
            locations={[0, 0.55, 1]}
            start={{ x: 0.15, y: 0.15 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
          />
          <View style={styles.controlButtonContent}>
            {theme === 'light' ? (
              <ArrowDark
                width={getAdaptiveSize(14, false, 3)}
                height={getAdaptiveSize(14, false, 3)}
              />
            ) : (
              <ArrowLight
                width={getAdaptiveSize(14, false, 3)}
                height={getAdaptiveSize(14, false, 3)}
              />
            )}
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default BibleBottomControls;

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, View, type LayoutChangeEvent } from 'react-native';

import { COLORS, COLORS_THEME } from '../../../constants/theme';
import { getAdaptiveSize } from '../../../constants/typography';
import { useTheme } from '../../../context/ThemeContext';

import { ThemedText } from '../../General/ThemedText/ThemedText';

import { styles } from './PopupFontSize.styles';
import GrabberHandle from '../../GrabberHandle/GrabberHandle';
import { PopupModal } from '../PopupModal';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';

export type PopupFontSizeProps = {
  visible: boolean;
  onClose: () => void;
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(v, max));

const roundToStep = (value: number, step: number) => {
  if (!step || step <= 0) return value;
  return Math.round(value / step) * step;
};

const PopupFontSize: React.FC<PopupFontSizeProps> = ({
  visible,
  onClose,
  initialValue,
  min = 12,
  max = 28,
  step = 1,
  onChange,
}) => {
  const { theme } = useTheme();

  const [value, setValue] = useState(() => {
    const start = initialValue ?? 18;
    return clamp(roundToStep(start, step), min, max);
  });

  const [trackWidth, setTrackWidth] = useState(0);
  const trackPageXRef = useRef(0);
  const trackRef = useRef<View | null>(null);
  const lastMeasuredWidthRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartValueRef = useRef(value);

  const { modalVisible, translateY, panResponder: swipePanResponder, closeWithAnimation } = useSwipeablePopup({
    visible,
    onClose,
  });

  const cardBg = theme === 'light' ? COLORS.COLOR_WHITE : COLORS.GRAY_900;
  const panelBg = theme === 'light' ? COLORS.GRAY_20 : COLORS.TABS_DARK;
  const trackBaseBg = theme === 'light' ? COLORS.GRAY_30 : COLORS.GRAY_35;
  const dotBg = theme === 'light' ? COLORS.GRAY_40 : COLORS.WHITE_20;

  const aSmallSize = useMemo(() => getAdaptiveSize(16, false, 4), []);
  const aBigSize = useMemo(() => getAdaptiveSize(22, false, 6), []);

  const dotsCount = 6;

  const normalized = useMemo(() => {
    if (max <= min) return 0;
    return clamp((value - min) / (max - min), 0, 1);
  }, [max, min, value]);

  const fillWidth = useMemo(() => {
    if (trackWidth <= 0) return 0;
    return normalized * trackWidth;
  }, [normalized, trackWidth]);

  const thumbWidth = useMemo(() => getAdaptiveSize(44, false, 14), []);

  const thumbLeft = useMemo(() => {
    if (trackWidth <= 0) return 0;
    return clamp(
      fillWidth - thumbWidth / 2,
      -thumbWidth / 2,
      trackWidth - thumbWidth / 2,
    );
  }, [fillWidth, thumbWidth, trackWidth]);

  const setValueFromX = useCallback(
    (x: number) => {
      if (trackWidth <= 0) return;
      const p = clamp(x / trackWidth, 0, 1);
      const raw = min + p * (max - min);
      const stepped = roundToStep(raw, step);
      const next = clamp(stepped, min, max);
      setValue(next);
      onChange?.(next);
    },
    [max, min, onChange, step, trackWidth],
  );

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    const nextWidth = e.nativeEvent.layout.width;

    // iOS can fire onLayout multiple times with same values; avoid render loops.
    setTrackWidth((prev) => (prev === nextWidth ? prev : nextWidth));

    if (lastMeasuredWidthRef.current === nextWidth) return;
    lastMeasuredWidthRef.current = nextWidth;

    requestAnimationFrame(() => {
      trackRef.current?.measureInWindow((x) => {
        if (Number.isFinite(x)) trackPageXRef.current = x;
      });
    });
  }, []);

  const sliderPanResponder  = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_evt, gestureState) => {
          const x = gestureState.x0 - trackPageXRef.current;
          dragStartXRef.current = x;
          dragStartValueRef.current = value;
          setValueFromX(x);
        },
        onPanResponderMove: (_evt, gestureState) => {
          const x = gestureState.moveX - trackPageXRef.current;
          setValueFromX(x);
        },
        onPanResponderRelease: () => {
          dragStartValueRef.current = value;
        },
        onPanResponderTerminate: () => {
          dragStartValueRef.current = value;
        },
      }),
    [normalized, setValueFromX, trackWidth, value],
  );


  return (
    <PopupModal
      visible={modalVisible}
      onClose={closeWithAnimation}
      animationType="none"
      rootStyle={{ justifyContent: 'flex-end', alignItems: 'stretch' }}
      contentStyle={{ width: '100%', paddingHorizontal: 6, paddingBottom: 6 }}
    >
      <Animated.View 
        style={[
          styles.card, 
          { 
            backgroundColor: cardBg,
            transform: [{ translateY }],
          }
        ]}
      >
        <View {...swipePanResponder.panHandlers}>
          <GrabberHandle />
        </View>
        <ThemedText
          variant="sfBody17Semibold"
          align="center"
          style={[styles.title]}
        >
          Font Size
        </ThemedText>

        <View style={[styles.panel, { backgroundColor: panelBg }]}>
          <View style={styles.row}>
            <ThemedText
              variant="sfBody17Regular"
              style={[
                styles.aSmall,
                { fontSize: aSmallSize, color: COLORS_THEME[theme].text },
              ]}
            >
              A
            </ThemedText>

            <View
              ref={trackRef}
              style={styles.sliderTrackWrap}
              onLayout={onTrackLayout}
              {...sliderPanResponder.panHandlers}
            >
              <View
                style={[styles.trackBase, { backgroundColor: trackBaseBg }]}
              />
              <View style={[styles.trackFill, { width: fillWidth }]} />
              <View style={styles.dotsRow} pointerEvents="none">
                {Array.from({ length: dotsCount }).map((_, idx) => (
                  <View
                    key={idx}
                    style={[styles.dot, { backgroundColor: dotBg }]}
                  />
                ))}
              </View>
              <View style={[styles.thumb, { left: thumbLeft }]} />
            </View>

            <ThemedText
              variant="sfBody17Regular"
              style={[
                styles.aBig,
                { fontSize: aBigSize, color: COLORS_THEME[theme].text },
              ]}
            >
              A
            </ThemedText>
          </View>
        </View>
      </Animated.View>
    </PopupModal>
  );
};

export default PopupFontSize;

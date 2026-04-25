import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import ProgressBar from '../ProgressBar/ProgressBar';
import { PADDING } from '../../constants/metrics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProgressBarWrapperProps {
  progress: number;
  children: React.ReactNode;
  previousChildren?: React.ReactNode;
  isTransitioning: boolean;
  slideAnim: Animated.Value;
  currentPageKey?: string;
  previousPageKey?: string;
}

const ProgressBarWrapper: React.FC<ProgressBarWrapperProps> = ({
  progress,
  children,
  previousChildren,
  isTransitioning,
  slideAnim,
  currentPageKey,
  previousPageKey,
}) => {
  const previousContentTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });

  const currentContentTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <ProgressBar value={progress} />
      </View>

      <View style={styles.contentContainer}>
        {isTransitioning && previousChildren && (
          <Animated.View
            key={`previous-${previousPageKey}`}
            pointerEvents="none"
            style={[
              styles.contentPage,
              {
                transform: [{ translateX: previousContentTranslateX }],
              },
            ]}
          >
            {previousChildren}
          </Animated.View>
        )}

        <Animated.View
          key={`current-${currentPageKey}`}
          style={[
            styles.contentPage,
            {
              transform: [{ translateX: isTransitioning ? currentContentTranslateX : 0 }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarContainer: {
    zIndex: 10,
    paddingHorizontal: PADDING.screenHorizontal,
    paddingTop: 28,
  },
  contentContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  contentPage: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ProgressBarWrapper;

import { useEffect, useRef, useState, useCallback } from 'react';
import { Platform } from 'react-native';

export type AudioPlayerState = {
  isPlaying: boolean;
  isLoading: boolean;
  currentVerseNumber: number | null;
  error: string | null;
};

export type UseAudioPlayerProps = {
  onVerseComplete?: (verseNumber: number) => void;
  onError?: (error: string) => void;
};

// Check if expo-av is available (not in Expo Go)
let Audio: any = null;
let isAudioAvailable = false;

if (Platform.OS !== 'web') {
  try {
    Audio = require('expo-av').Audio;
    isAudioAvailable = true;
  } catch (error) {
    console.warn('expo-av not available, audio playback will be disabled');
    isAudioAvailable = false;
  }
}

export const useAudioPlayer = (props?: UseAudioPlayerProps) => {
  const { onVerseComplete, onError } = props ?? {};
  
  const soundRef = useRef<any>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    currentVerseNumber: null,
    error: null,
  });

  const currentVerseNumberRef = useRef<number | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web' || !isAudioAvailable) {
      return;
    }

    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    }).catch(() => {});

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  const loadAudio = useCallback(async (audioUrl: string, verseNumber: number) => {
    if (Platform.OS === 'web' || !isAudioAvailable) {
      setState((prev) => ({
        ...prev,
        error: 'Audio playback is not available. Please use a development build or production app.',
      }));
      onError?.('Audio playback requires a development build');
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        (status: any) => {
          if (status.isLoaded && status.didJustFinish) {
            setState((prev) => ({ ...prev, isPlaying: false }));
            const currentVerse = currentVerseNumberRef.current;
            if (currentVerse != null) {
              onVerseComplete?.(currentVerse);
            }
          }
        },
      );

      soundRef.current = sound;
      currentVerseNumberRef.current = verseNumber;

      setState((prev) => ({
        ...prev,
        isLoading: false,
        currentVerseNumber: verseNumber,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load audio';
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      onError?.(errorMessage);
    }
  }, [onVerseComplete, onError]);

  const play = useCallback(async () => {
    if (Platform.OS === 'web' || !isAudioAvailable) return;
    if (!soundRef.current) return;

    try {
      await soundRef.current.playAsync();
      setState((prev) => ({ ...prev, isPlaying: true }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to play audio';
      setState((prev) => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  }, [onError]);

  const pause = useCallback(async () => {
    if (Platform.OS === 'web' || !isAudioAvailable) return;
    if (!soundRef.current) return;

    try {
      await soundRef.current.pauseAsync();
      setState((prev) => ({ ...prev, isPlaying: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to pause audio';
      setState((prev) => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  }, [onError]);

  const stop = useCallback(async () => {
    if (Platform.OS === 'web' || !isAudioAvailable) return;
    if (!soundRef.current) return;

    try {
      await soundRef.current.stopAsync();
      setState((prev) => ({ ...prev, isPlaying: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to stop audio';
      setState((prev) => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  }, [onError]);

  const replay = useCallback(async () => {
    if (Platform.OS === 'web' || !isAudioAvailable) return;
    if (!soundRef.current) return;

    try {
      await soundRef.current.replayAsync();
      setState((prev) => ({ ...prev, isPlaying: true }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to replay audio';
      setState((prev) => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    }
  }, [onError]);

  const togglePlayPause = useCallback(async () => {
    if (state.isPlaying) {
      await pause();
    } else {
      await play();
    }
  }, [state.isPlaying, play, pause]);

  return {
    state,
    loadAudio,
    play,
    pause,
    stop,
    replay,
    togglePlayPause,
  };
};

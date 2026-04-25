import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  TextInput,
  UIManager,
  View,
} from 'react-native';

import { ThemedText } from '../General/ThemedText/ThemedText';
import { ThemedView } from '../General/ThemedView/ThemedView';
import { ThemedButton } from '../General/ThemeButton/ThemedButton';
import { useTheme } from '../../context/ThemeContext';
import { COLORS, COLORS_THEME } from '../../constants/theme';
import SearchDark from '../../assets/icons/bible/search-dark.svg';
import SearchLight from '../../assets/icons/bible/search-light.svg';
import SearchSmallDark from '../../assets/icons/bible/search-small-dark.svg';
import SearchSmallLight from '../../assets/icons/bible/search-small-light.svg';
import CrossDark from '../../assets/icons/bible/cross-dark.svg';
import CrossLight from '../../assets/icons/bible/cross-light.svg';

import { styles } from './BibleHeader.styles';
import { useAppSelector } from '../../store/store';
import {
  selectHeaderTitle,
  selectVersionLabel,
} from '../../store/features/bibleReader/selectors';
import { getAdaptiveSize } from '../../constants/typography';

export type BibleHeaderProps = {
  title?: string;
  versionLabel?: string;
  onPressTitle?: () => void;
  onPressSearch?: () => void;
  isSearchOpen?: boolean;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onSearchOpen?: () => void;
  onSearchClose?: () => void;
  onPressMore?: () => void;
  onMoreAnchor?: (rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

const BibleHeader: React.FC<BibleHeaderProps> = ({
  title,
  versionLabel,
  onPressTitle,
  onPressSearch,
  isSearchOpen: isSearchOpenProp,
  searchValue: searchValueProp,
  onSearchChange,
  onSearchOpen,
  onSearchClose,
  onPressMore,
  onMoreAnchor,
}) => {
  const { theme } = useTheme();

  const headerTitleFromState = useAppSelector(selectHeaderTitle);
  const versionLabelFromState = useAppSelector(selectVersionLabel);

  const resolvedTitle = title ?? headerTitleFromState;
  const resolvedVersionLabel = versionLabel ?? versionLabelFromState;

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
  }, []);

  const moreAnchorRef = useRef<View>(null);
  const searchInputRef = useRef<TextInput>(null);

  const searchSlideAnim = useRef(new Animated.Value(0)).current;

  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [internalSearchValue, setInternalSearchValue] = useState('');

  const [renderSearch, setRenderSearch] = useState(false);
  const renderSearchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const isSearchOpen = isSearchOpenProp ?? internalSearchOpen;
  const searchValue = searchValueProp ?? internalSearchValue;

  const isSearchActive = isSearchOpen || renderSearch;

  const dividerColor = theme === 'light' ? COLORS.GRAY_50 : COLORS.GRAY_700;

  const iconColor = theme === 'light' ? <SearchDark /> : <SearchLight />;
  const SearchSmallIcon =
    theme === 'light' ? SearchSmallDark : SearchSmallLight;
  const CloseIcon = theme === 'light' ? CrossDark : CrossLight;

  const iconDottedColor =
    theme === 'light' ? COLORS.COLOR_ICON_DARK : COLORS.COLOR_WHITE;

  const handleOpenSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (typeof isSearchOpenProp === 'boolean') {
      onSearchOpen?.();
    } else {
      setInternalSearchOpen(true);
    }
    onPressSearch?.();
  };

  const handleCloseSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (typeof isSearchOpenProp === 'boolean') {
      onSearchClose?.();
    } else {
      setInternalSearchOpen(false);
      setInternalSearchValue('');
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      if (renderSearchTimeoutRef.current) {
        clearTimeout(renderSearchTimeoutRef.current);
        renderSearchTimeoutRef.current = null;
      }
      setRenderSearch(true);
    }

    Animated.timing(searchSlideAnim, {
      toValue: isSearchOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (isSearchOpen) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    } else {
      if (renderSearchTimeoutRef.current) {
        clearTimeout(renderSearchTimeoutRef.current);
      }
      renderSearchTimeoutRef.current = setTimeout(() => {
        setRenderSearch(false);
        renderSearchTimeoutRef.current = null;
      }, 200);
    }
  }, [isSearchOpen, searchSlideAnim]);

  useEffect(() => {
    return () => {
      if (renderSearchTimeoutRef.current) {
        clearTimeout(renderSearchTimeoutRef.current);
        renderSearchTimeoutRef.current = null;
      }
    };
  }, []);

  const searchWrapAnimatedStyle = {
    opacity: searchSlideAnim,
    transform: [
      {
        translateX: searchSlideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  } as const;

  return (
    <View style={styles.container}>
      <View style={[styles.left, isSearchActive && styles.leftHidden]}>
        {isSearchActive ? null : (
          <ThemedButton
            title={
              <ThemedView type="notification" style={styles.pill}>
                <ThemedText variant="sfBody14Semibold">
                  {resolvedTitle}
                </ThemedText>
                <View
                  style={[
                    styles.pillDivider,
                    { backgroundColor: dividerColor },
                  ]}
                />
                <ThemedText variant="sfBody14Semibold">
                  {resolvedVersionLabel.replace(/_/g, ' ')}
                </ThemedText>
              </ThemedView>
            }
            variant="transparent"
            style={styles.titleButton}
            onPress={onPressTitle}
          />
        )}
      </View>

      <View style={[styles.right, isSearchActive && styles.rightSearch]}>
        {renderSearch ? (
          <Animated.View style={[{ flex: 1 }, searchWrapAnimatedStyle]}>
            <ThemedView type="notification" style={styles.searchWrap}>
              <SearchSmallIcon width={21} height={21} />
              <TextInput
                ref={searchInputRef}
                value={searchValue}
                onChangeText={(text) => {
                  onSearchChange?.(text);
                  if (typeof searchValueProp !== 'string') {
                    setInternalSearchValue(text);
                  }
                }}
                placeholder="Search"
                placeholderTextColor={COLORS_THEME[theme].text}
                style={[
                  styles.searchInput,
                  { color: COLORS_THEME[theme].text },
                  Platform.OS === 'web'
                    ? ({ outlineStyle: 'none' } as any)
                    : undefined,
                ]}
                underlineColorAndroid="transparent"
                returnKeyType="search"
              />
            </ThemedView>
          </Animated.View>
        ) : (
          <ThemedButton
            title={iconColor}
            variant="transparent"
            style={[
              styles.iconButton,
              { backgroundColor: COLORS_THEME[theme].notification },
            ]}
            onPress={handleOpenSearch}
          />
        )}

        {renderSearch ? (
          <ThemedButton
            title={<CloseIcon width={12} height={12} />}
            variant="transparent"
            style={[
              styles.iconButton,
              { backgroundColor: COLORS_THEME[theme].notification },
            ]}
            onPress={handleCloseSearch}
            disabled={!isSearchOpen}
          />
        ) : (
          <View ref={moreAnchorRef} collapsable={false}>
            <ThemedButton
              title={
                <ThemedText
                  style={{ color: iconDottedColor, fontSize: 22, height: 22 }}
                >
                  ⋯
                </ThemedText>
              }
              variant="transparent"
              style={[
                styles.iconButton,
                { backgroundColor: COLORS_THEME[theme].notification },
              ]}
              onPress={() => {
                moreAnchorRef.current?.measureInWindow(
                  (x, y, width, height) => {
                    onMoreAnchor?.({ x, y, width, height });
                  },
                );
                onPressMore?.();
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default BibleHeader;

import React, { useMemo, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  View,
} from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { COLORS, COLORS_THEME } from '../../../constants/theme';


import CrossDark from '../../../assets/icons/bible/cross-dark.svg';
import CrossLight from '../../../assets/icons/bible/cross-light.svg';
import ArrowRightDark from '../../../assets/icons/settings/arrow-right-dark.svg';
import ArrowRightLight from '../../../assets/icons/settings/arrow-right-light.svg';

import AMP from '../../../assets/books/AMP.json';
import BDS from '../../../assets/books/BDS.json';
import FBV from '../../../assets/books/FBV.json';
import HTB from '../../../assets/books/HTB.json';
import KJV from '../../../assets/books/KJV.json';
import NASB from '../../../assets/books/NASB.json';
import NIV from '../../../assets/books/NIV.json';
import NKJV from '../../../assets/books/NKJV.json';
import NTR from '../../../assets/books/NTR.json';
import NVI_ES from '../../../assets/books/NVI_ES.json';
import NVI_PT from '../../../assets/books/NVI_PT.json';
import PEV from '../../../assets/books/PEV.json';
import RSVCE from '../../../assets/books/RSVCE.json';
import RVR1960 from '../../../assets/books/RVR1960.json';
import SCHL from '../../../assets/books/SCHL.json';
import TCB from '../../../assets/books/TCB.json';
import TPT from '../../../assets/books/TPT.json';
import WEBUS from '../../../assets/books/WEBUS.json';
import WMB from '../../../assets/books/WMB.json';

import type { BibleJson } from '../../../utils/bibleJson';
import { getAllBookNames } from '../../../utils/bibleJson';

import { styles } from './PopupBiblePicker.styles';

import { PopupModal } from '../PopupModal';

import PopupHeader from './components/PopupHeader';
import PickerTabs from './components/PickerTabs';
import VersionList from './components/VersionList';
import BooksList from './components/BooksList';
import {
  PopupBiblePickerProps,
  PopupBiblePickerSelection,
} from '../../../types/PopupBiblePicker';
import { useSwipeablePopup } from '../../../hooks/useSwipeablePopup';

type PickerTabKey = 'books' | 'version';

const AnimatedArrowRightDark = Animated.createAnimatedComponent(
  React.memo(ArrowRightDark as any),
);
const AnimatedArrowRightLight = Animated.createAnimatedComponent(
  React.memo(ArrowRightLight as any),
);

const PopupBiblePicker: React.FC<PopupBiblePickerProps> = ({
  visible: visibleProp,
  onClose,
  versionJson: versionJsonProp,
  value: valueProp,
  onSelect,
  onVersionChange,
}) => {
  const { theme } = useTheme();

 const { modalVisible, translateY, panResponder, closeWithAnimation } = useSwipeablePopup({
    visible: visibleProp,
    onClose,
  });

  const availableVersions = useMemo((): BibleJson[] => {
    return [
      AMP as BibleJson,
      BDS as BibleJson,
      FBV as BibleJson,
      HTB as BibleJson,
      KJV as BibleJson,
      NASB as BibleJson,
      NIV as BibleJson,
      NKJV as BibleJson,
      NTR as BibleJson,
      NVI_ES as BibleJson,
      NVI_PT as BibleJson,
      PEV as BibleJson,
      RSVCE as BibleJson,
      RVR1960 as BibleJson,
      SCHL as BibleJson,
      TCB as BibleJson,
      TPT as BibleJson,
      WEBUS as BibleJson,
      WMB as BibleJson,
    ];
  }, []);

  const [internalVersionJson, setInternalVersionJson] = useState<BibleJson>(
    () => {
      return (versionJsonProp ?? (AMP as BibleJson)) as BibleJson;
    },
  );

  const versionJson = useMemo(() => {
    return (versionJsonProp ?? internalVersionJson) as BibleJson;
  }, [internalVersionJson, versionJsonProp]);

  const versionName = useMemo(() => {
    return versionJson?.version ?? '';
  }, [versionJson]);

  const versionsData = useMemo(() => {
    return availableVersions
      .map((v) => {
        const code = v?.version ?? '';
        const name = v?.name ?? code;
        return {
          key: code || 'unknown',
          code,
          name: name || code,
          description: v?.description ?? '',
          json: v,
        };
      })
      .filter((x) => Boolean(x.code));
  }, [availableVersions]);

  const [internalSelection, setInternalSelection] =
    useState<PopupBiblePickerSelection>(() => {
      return {
        book: valueProp?.book ?? '',
        chapter: valueProp?.chapter ?? '',
      };
    });

  const selection: PopupBiblePickerSelection = useMemo(() => {
    return {
      book: valueProp?.book ?? internalSelection.book,
      chapter: valueProp?.chapter ?? internalSelection.chapter,
    };
  }, [internalSelection, valueProp?.book, valueProp?.chapter]);

  const CloseIcon = theme === 'light' ? CrossDark : CrossLight;
  const ChevronIcon =
    theme === 'dark' ? AnimatedArrowRightLight : AnimatedArrowRightDark;

  const [tab, setTab] = useState<PickerTabKey>('books');

  const booksData = useMemo(() => {
    const all = getAllBookNames(versionJson);
    return all.sort((a, b) => a.localeCompare(b));
  }, [versionJson]);

  const initialBook = selection.book ?? booksData[0] ?? 'Genesis';

  const [expandedBook, setExpandedBook] = useState<string | null>(
    () => initialBook,
  );

  const sheetBg = theme === 'dark' ? COLORS.GRAY_900 : COLORS.COLOR_WHITE;
  const itemBg = theme === 'dark' ? COLORS.TABS_DARK : COLORS.GRAY_20;
  const chapterBg = theme === 'dark' ? COLORS.GRAY_550 : COLORS.COLOR_WHITE;
  const chapterText =
    theme === 'dark' ? COLORS_THEME.dark.text : COLORS_THEME.light.text;

  const selectedChapter = selection.chapter ?? '1';

 const handlePickSelection = (nextSelection: PopupBiblePickerSelection) => {
    if (onSelect) {
      onSelect(nextSelection);
    } else {
      setInternalSelection(nextSelection);
    }
    closeWithAnimation();
  };

  const handlePickVersion = (nextJson: BibleJson) => {
    if (versionJsonProp) {
      onVersionChange?.(nextJson);
      closeWithAnimation();
    }else{  
      setInternalVersionJson(nextJson);
      onVersionChange?.(nextJson);
      closeWithAnimation();
    }

  };

  return (
    <PopupModal
      key="bible-picker-modal"
      visible={modalVisible}
      onClose={closeWithAnimation}
      animationType="none"
      rootStyle={{ justifyContent: 'flex-end', alignItems: 'stretch' }}
      contentStyle={{ width: '100%' }}
    >
      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: sheetBg,
            transform: [{ translateY }],
          },
        ]}
      >
        <PopupHeader
          panResponder={panResponder}
          theme={theme}
          CloseIcon={CloseIcon}
          onClose={closeWithAnimation}
        />

        <View style={styles.content}>
          <PickerTabs theme={theme} tab={tab} onChangeTab={setTab} />

          {tab === 'version' ? (
            <VersionList
              itemBg={itemBg}
              versions={versionsData}
              selectedName={versionName}
              isControlled={Boolean(versionJsonProp)}
              onPickVersion={handlePickVersion}
            />
          ) : (
            <BooksList
              booksData={booksData}
              expandedBook={expandedBook}
              onToggleExpanded={(book) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setExpandedBook((prev) => (prev === book ? null : book));
              }}
              versionJson={versionJson}
              selection={selection}
              selectedChapter={selectedChapter}
              itemBg={itemBg}
              chapterBg={chapterBg}
              chapterText={chapterText}
              ChevronIcon={ChevronIcon}
              onPickChapter={({ book, chapter }) => {
                const nextSelection: PopupBiblePickerSelection = {
                  book,
                  chapter,
                };

                handlePickSelection(nextSelection);
              }}
            />
          )}
        </View>
      </Animated.View>
    </PopupModal>
  );
};

export default PopupBiblePicker;

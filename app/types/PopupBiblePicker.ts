import { BibleJson } from '../utils/bibleJson';

export type PopupBiblePickerSelection = {
  book: string;
  chapter: string;
};

export type PopupBiblePickerProps = {
  visible: boolean;
  onClose: () => void;
  versionJson?: BibleJson;
  value?: Partial<PopupBiblePickerSelection>;
  onSelect?: (selection: PopupBiblePickerSelection) => void;
  onVersionChange?: (versionJson: BibleJson) => void;
};

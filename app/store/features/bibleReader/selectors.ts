import type { RootState } from '../../store';
import { BIBLE_READER_FEATURE_KEY } from './constants';

const selectBibleReaderState = (state: RootState) =>
  state[BIBLE_READER_FEATURE_KEY];

export const selectBook = (state: RootState) =>
  selectBibleReaderState(state).book;
export const selectChapter = (state: RootState) =>
  selectBibleReaderState(state).chapter;
export const selectSelectedVersion = (state: RootState) =>
  selectBibleReaderState(state).selectedVersion;

export const selectFontSize = (state: RootState) =>
  selectBibleReaderState(state).fontSize;

export const selectJumpToVerseNumber = (state: RootState) =>
  selectBibleReaderState(state).jumpToVerseNumber;

export const selectHeaderTitle = (state: RootState) => {
  const { book, chapter } = selectBibleReaderState(state);
  if (!book) return '';
  return `${book} ${chapter}`;
};

export const selectVersionLabel = (state: RootState) => {
  const { selectedVersion } = selectBibleReaderState(state);
  return selectedVersion || 'NIV';
};

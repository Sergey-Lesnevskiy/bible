import { createAction } from '@reduxjs/toolkit';

const setBookAction = createAction<string>('bibleReader/setBook');
const setChapterAction = createAction<string>('bibleReader/setChapter');
const setSelectedVersionAction = createAction<string>(
  'bibleReader/setSelectedVersion',
);

const setFontSizeAction = createAction<number>('bibleReader/setFontSize');

const setJumpToVerseNumberAction = createAction<number>(
  'bibleReader/setJumpToVerseNumber',
);
const clearJumpToVerseNumberAction = createAction(
  'bibleReader/clearJumpToVerseNumber',
);

const setSelectionAction = createAction<{
  book: string;
  chapter: string;
}>('bibleReader/setSelection');

export {
  setBookAction,
  setChapterAction,
  setSelectedVersionAction,
  setFontSizeAction,
  setSelectionAction,
  setJumpToVerseNumberAction,
  clearJumpToVerseNumberAction,
};

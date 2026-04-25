import { createReducer } from '@reduxjs/toolkit';

import type { IBibleReaderState } from './constants';
import {
  clearJumpToVerseNumberAction,
  setBookAction,
  setChapterAction,
  setFontSizeAction,
  setJumpToVerseNumberAction,
  setSelectedVersionAction,
  setSelectionAction,
} from './actions';

const initialState: IBibleReaderState = {
  book: '',
  chapter: '1',
  selectedVersion: '',
  fontSize: 17,
  jumpToVerseNumber: null,
};

const bibleReaderReducer = createReducer(initialState, (builder) => {
  builder.addCase(setBookAction, (state, action) => {
    state.book = action.payload;
    state.chapter = '1';
  });

  builder.addCase(setChapterAction, (state, action) => {
    state.chapter = action.payload;
  });

  builder.addCase(setSelectedVersionAction, (state, action) => {
    state.selectedVersion = action.payload;
  });

  builder.addCase(setFontSizeAction, (state, action) => {
    state.fontSize = action.payload;
  });

  builder.addCase(setJumpToVerseNumberAction, (state, action) => {
    state.jumpToVerseNumber = action.payload;
  });

  builder.addCase(clearJumpToVerseNumberAction, (state) => {
    state.jumpToVerseNumber = null;
  });

  builder.addCase(setSelectionAction, (state, action) => {
    state.book = action.payload.book;
    state.chapter = action.payload.chapter;
  });
});

export { bibleReaderReducer };

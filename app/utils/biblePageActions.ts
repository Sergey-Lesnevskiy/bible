import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import type { AppDispatch } from '../store/store';
import { toggleFavouriteVerseAction } from '../store/features/favouritesVerses/actions';

export const makeVerseMessage = (params: {
  book: string;
  chapter: string;
  verseNumber: number;
  text: string;
}) => {
  const { book, chapter, verseNumber, text } = params;
  return `${book} ${chapter}:${verseNumber}\n${text}`;
};

export const saveVerseToFavorites = (params: {
  dispatch: AppDispatch;
  version: string;
  book: string;
  chapter: string;
  verseNumber: number;
  text: string;
}) => {
  const { dispatch, version, book, chapter, verseNumber, text } = params;

  dispatch(
    toggleFavouriteVerseAction({
      version,
      book,
      chapter,
      verseNumber,
      text,
    }),
  );
};

export const copyVerseToClipboard = async (params: {
  dispatch: AppDispatch;
  book: string;
  chapter: string;
  verseNumber: number;
  text: string;
}) => {
  const message = makeVerseMessage(params);
  try {
    await Clipboard.setStringAsync(message);
  } catch {
    throw new Error('Copy failed');
  }
};

export const shareVerse = async (params: {
  dispatch: AppDispatch;
  book: string;
  chapter: string;
  verseNumber: number;
  text: string;
}) => {
  const message = makeVerseMessage(params);
  try {
    await Share.share({ message });
  } catch {
    throw new Error('Share failed');
  }
};

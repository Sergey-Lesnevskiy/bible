export const BIBLE_READER_FEATURE_KEY = 'bibleReader';

export interface IBibleReaderState {
  book: string;
  chapter: string;
  selectedVersion: string;
  fontSize: number;
  jumpToVerseNumber: number | null;
}

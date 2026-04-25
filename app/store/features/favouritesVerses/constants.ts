export const FAVOURITES_VERSES_FEATURE_KEY = 'favouritesVerses';

export type FavouriteVerseRef = {
  version: string;
  book: string;
  chapter: string;
  verseNumber: number;
};

export type FavouriteVerse = FavouriteVerseRef & {
  key: string;
  text: string;
  createdAt: number;
};

export interface IFavouritesVersesState {
  byKey: Record<string, FavouriteVerse>;
}

export const makeFavouriteVerseKey = (ref: FavouriteVerseRef) => {
  return `${ref.version}|${ref.book}|${ref.chapter}|${ref.verseNumber}`;
};

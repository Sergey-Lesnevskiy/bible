import { BibleJson, getAllBookNames, getChapter } from './bibleJson';

export interface DailyVerse {
  verse: string;
  acts: string;
}

interface VerseReference {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomVerseReference = (
  versionJson: BibleJson,
): VerseReference | null => {
  const books = getAllBookNames(versionJson);
  if (books.length === 0) return null;

  const randomBook = books[getRandomInt(0, books.length - 1)];
  const bookData = versionJson.result?.[randomBook];
  if (!bookData?.chapters) return null;

  const chapterKeys = Object.keys(bookData.chapters);
  if (chapterKeys.length === 0) return null;

  const randomChapterKey = chapterKeys[getRandomInt(0, chapterKeys.length - 1)];
  const chapterNumber = parseInt(randomChapterKey, 10);
  const chapterVerses = getChapter(versionJson, randomBook, chapterNumber);
  if (!chapterVerses || chapterVerses.length === 0) return null;

  const maxVerseCount = Math.min(3, chapterVerses.length);
  const verseCount = getRandomInt(1, maxVerseCount);

  const startVerse = getRandomInt(1, chapterVerses.length - verseCount + 1);
  const endVerse = startVerse + verseCount - 1;

  return {
    book: randomBook,
    chapter: chapterNumber,
    verseStart: startVerse,
    verseEnd: endVerse,
  };
};

const formatVerseReference = (ref: VerseReference): string => {
  if (ref.verseStart === ref.verseEnd) {
    return `${ref.book} ${ref.chapter}:${ref.verseStart}`;
  }
  return `${ref.book} ${ref.chapter}:${ref.verseStart}-${ref.verseEnd}`;
};

const getVerseText = (
  versionJson: BibleJson,
  ref: VerseReference,
): string | null => {
  const chapterVerses = getChapter(versionJson, ref.book, ref.chapter);
  if (!chapterVerses) return null;

  const verses: string[] = [];
  for (let i = ref.verseStart; i <= ref.verseEnd; i++) {
    const verseIndex = i - 1;
    if (verseIndex >= 0 && verseIndex < chapterVerses.length) {
      verses.push(chapterVerses[verseIndex]);
    }
  }

  return verses.length > 0 ? verses.join(' ') : null;
};

export const generateRandomVerse = (
  versionJson: BibleJson,
): DailyVerse | null => {
  const ref = getRandomVerseReference(versionJson);
  if (!ref) return null;

  const verseText = getVerseText(versionJson, ref);
  if (!verseText) return null;

  return {
    verse: verseText,
    acts: formatVerseReference(ref),
  };
};

export const getTodayDateKey = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

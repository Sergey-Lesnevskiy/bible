export type BibleBook = {
  max_chapters?: number;
  chapters: Record<string, string[] | null>;
};

export type BibleJson = {
  version?: string;
  name?: string;
  description?: string;
  result?: Record<string, BibleBook>;
};

/**
 * Удаляет любые комбинации символов в скобках вида (XXX), где XXX - произвольное количество латинских символов капсом
 * Заменяет две подряд идущие кавычки на одну
 */
const cleanBibleText = (text: string): string => {
  if (!text) return text;
  return text
    .replace(/\([A-Z]+\)/g, '')
    .replace(/""+/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Нормализует пробелы после знаков препинания и капитализирует начало предложений
 * Добавляет пробел после : ; . , ! ? - если его нет
 * Делает первую букву заглавной после . ! ?
 */
const normalizePunctuation = (text: string): string => {
  if (!text) return text;
  
  // Добавляем пробел после знаков препинания, если его нет
  // Исключаем случаи когда после знака уже есть пробел, конец строки или другой знак препинания
  let normalized = text
    .replace(/([.:;,!?\-])(?=[^\s.:;,!?\-])/g, '$1 ')
    .replace(/\s+/g, ' ') // Убираем множественные пробелы
    .trim();
  
  // Капитализируем первую букву текста
  normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  
  // Капитализируем первую букву после . ! ?
  normalized = normalized.replace(/([.!?])\s+([a-z])/g, (match, punct, letter) => {
    return punct + ' ' + letter.toUpperCase();
  });
  
  return normalized;
};

export const getAllBookNames = (versionJson: BibleJson): string[] => {
  const books = versionJson?.result;
  if (!books) return [];
  return Object.keys(books);
};

export const getBook = (versionJson: BibleJson, book: string): BibleBook | null => {
  const books = versionJson?.result;
  if (!books) return null;

  const bookObj = books[book];
  if (!bookObj || !bookObj.chapters) return null;
  return bookObj;
};

export const getChapter = (
  versionJson: BibleJson,
  book: string,
  chapter: number | string,
): string[] | null => {
  const bookObj = getBook(versionJson, book);
  if (!bookObj) return null;

  const chapterKey = String(chapter);
  const chapterArr = bookObj.chapters?.[chapterKey];
  if (!Array.isArray(chapterArr)) return null;

  return chapterArr.map(verse => typeof verse === 'string' ? cleanBibleText(verse) : verse);
};

export const getVerse = (
  versionJson: BibleJson,
  book: string,
  chapter: number | string,
  verse: number,
): string | null => {
  const chapterArr = getChapter(versionJson, book, chapter);
  if (!chapterArr) return null;

  const verseIndex = verse - 1;
  if (verseIndex < 0 || verseIndex >= chapterArr.length) return null;

  const text = chapterArr[verseIndex];
  return typeof text === 'string' ? text : null;
};

import type { BibleJson } from './bibleJson';

export const getChapterCount = (
  versionJson: BibleJson,
  book: string,
): number => {
  const bookObj = versionJson?.result?.[book];
  const maxChapters = bookObj?.max_chapters;
  if (
    typeof maxChapters === 'number' &&
    Number.isFinite(maxChapters) &&
    maxChapters > 0
  ) {
    return Math.floor(maxChapters);
  }

  const chapters = bookObj?.chapters;
  if (!chapters) return 0;

  const nums = Object.keys(chapters)
    .map((k) => Number(k))
    .filter((n) => Number.isFinite(n) && n > 0);

  if (nums.length === 0) return 0;
  return Math.max(...nums);
};

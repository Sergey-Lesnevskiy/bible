/**
 * Cleans Bible text by removing reference markers and adding line breaks
 * @param text - Raw Bible text with reference markers like (AA), (AB), etc.
 * @returns Cleaned text without reference markers and with proper line breaks
 */
export const cleanBibleText = (text: string): string => {
  if (!text) return text;
  
  let cleaned = text.replace(/\([A-Z]+\)/g, '');
  
  cleaned = cleaned
    .replace(/([.:;,!?\-])(?=[^\s.:;,!?\-])/g, '$1 ')
    .replace(/\s+/g, ' ');
  
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  
  cleaned = cleaned.replace(/([.!?])\s+([a-z])/g, (match, punct, letter) => {
    return punct + ' ' + letter.toUpperCase();
  });
  
  cleaned = cleaned
    .replace(/\?\s+/g, '?\n')
    .replace(/!\s+/g, '!\n')
    .replace(/\.\s+/g, '.\n');
  
  return cleaned.trim();
};

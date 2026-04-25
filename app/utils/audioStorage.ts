import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../api/firebase';

export const getAudioUrl = async (
  version: string,
  book: string,
  chapter: string | number,
  verse: number,
): Promise<string | null> => {
  try {
    const fileName = `${version}_${book}_${chapter}_${verse}.mp3`;
    const filePath = `${version}/${fileName}`;

    const storageRef = ref(storage, filePath);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Failed to get audio URL:', error);
    return null;
  }
};
import { useEffect, useState } from "react";

export const useFonts = (loadFonts: () => Promise<void>) => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await loadFonts();
        setIsAppReady(true);
      } catch (e) {
        console.error('Font loading failed', e);
        setIsAppReady(true);
      }
    };

    load();
  }, [loadFonts]);

  return isAppReady;
};
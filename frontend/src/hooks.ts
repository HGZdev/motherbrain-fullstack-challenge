import { useEffect, useState } from "react";

/**
 * Custom hook to check if a given media query matches
 * @param query
 * @returns
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);
    updateMatch();

    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
};

/**
 * Custom hook to check if the screen size is mobile
 * @returns boolean
 */
export const useIsMobile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile;
};

/**
 * Custom hook to check if the screen size is tablet
 * @returns boolean
 */
export const useIsTablet = () => {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  return isTablet;
};

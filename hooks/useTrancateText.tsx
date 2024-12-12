"use client";
import { useMediaQuery } from "@react-hook/media-query";

export const useTruncateText = (text: string | undefined, maxLength: number) => {
  const isSmallScreen = useMediaQuery(`(max-width: 640px)`);
  const length = isSmallScreen ? maxLength - 5 : maxLength;

  if (!text || text.length <= length) {
    return text || "";
  } else {
    return text.slice(0, length) + "...";
  }
};

import { useMemo } from 'react';

import { rgbToHsl } from './helper';

export const useColors = () => {
  const colors = useMemo(() => {
    let colorsArray = [];
    for (let a = 1; a <= 32; a++) {
      for (let b = 1; b <= 32; b++) {
        for (let c = 1; c <= 32; c++) {
          colorsArray.push({ r: a * 8, g: b * 8, b: c * 8 });
        }
      }
    }
    return colorsArray;
  }, []);

  const sortedColors = useMemo(() => {
    return colors
      .map((color, index) => {
        return { color: rgbToHsl(color), index };
      })
      .sort((a, b) => {
        if (a.color.h !== b.color.h) {
          return a.color.h - b.color.h;
        }
        return a.color.l - b.color.l;
      })
      .map((c) => {
        return colors[c.index];
      });
  }, [colors]);
  return { colors, sortedColors };
};

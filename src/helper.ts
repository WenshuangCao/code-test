export type RGBType = {
  r: number;
  g: number;
  b: number;
};

// helper function to convert rgb to hsl color
export const rgbToHsl = (rgb: RGBType) => {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        throw Error('This should not happen');
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

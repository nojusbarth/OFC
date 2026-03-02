import type { PixelData } from "./ImageLoader";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Skaliert ein Bild per Nearest-Neighbor-Sampling auf die gewünschte Zielauflösung.
 * @param sourceWidth - Breite des Quellbildes.
 * @param sourceHeight - Höhe des Quellbildes.
 * @param sourceData - RGBA-Pixeldaten des Quellbildes.
 * @param targetWidth - Zielbreite.
 * @param targetHeight - Zielhöhe.
 * @returns Neu berechnete Pixeldaten in der Zielauflösung.
 */
export function resampleImageNearest(
  sourceWidth: number,
  sourceHeight: number,
  sourceData: Uint8ClampedArray,
  targetWidth: number,
  targetHeight: number,
): PixelData {
  const targetData = new Uint8ClampedArray(targetWidth * targetHeight * 4);

  const xRatio = sourceWidth / targetWidth;
  const yRatio = sourceHeight / targetHeight;

  for (let ty = 0; ty < targetHeight; ty++) {
    for (let tx = 0; tx < targetWidth; tx++) {
      const sx = Math.floor(tx * xRatio);
      const sy = Math.floor(ty * yRatio);

      const sourceIndex = (sy * sourceWidth + sx) * 4;
      const targetIndex = (ty * targetWidth + tx) * 4;

      targetData[targetIndex] = sourceData[sourceIndex];
      targetData[targetIndex + 1] = sourceData[sourceIndex + 1];
      targetData[targetIndex + 2] = sourceData[sourceIndex + 2];
      targetData[targetIndex + 3] = sourceData[sourceIndex + 3];
    }
  }

  return {
    width: targetWidth,
    height: targetHeight,
    data: targetData,
  };
}

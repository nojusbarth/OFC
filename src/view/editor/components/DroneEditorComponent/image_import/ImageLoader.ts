// Dieser Code ist teilweise KI generiert

/**
 * Repräsentiert rohe Pixeldaten eines Bildes.
 */
export interface PixelData {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

/**
 * Lädt eine Bilddatei in einen Canvas und gibt die RGBA-Pixeldaten zurück.
 * @param file - Die zu ladende Bilddatei.
 * @returns Promise mit Breite, Höhe und Pixeldaten des Bildes.
 * @throws Error - Falls kein Canvas-Kontext verfügbar ist.
 */
export async function loadImagePixels(file: File): Promise<PixelData> {
  const imageBitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context not available");
  }

  ctx.drawImage(imageBitmap, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const data = imageData.data;

  return {
    width: canvas.width,
    height: canvas.height,
    data: new Uint8ClampedArray(data),
  };
}

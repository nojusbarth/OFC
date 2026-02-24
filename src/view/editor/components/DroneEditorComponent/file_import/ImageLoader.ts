export interface LoadedImage {
  width: number;
  height: number;
  rawData: Uint8ClampedArray;
}

export async function loadImagePixels(file: File): Promise<LoadedImage> {
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
    rawData: new Uint8ClampedArray(data), // ← extra safe copy
  };
}

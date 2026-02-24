import { useEffect, useRef } from "react";
import { SampledImage } from "./ImageSampling";

interface Props {
  image: SampledImage;
}

export function PixelPreviewCanvas({ image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fixedSize = 400;
    canvas.width = fixedSize;
    canvas.height = fixedSize;

    ctx.imageSmoothingEnabled = false;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;

    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    const safeData = new Uint8ClampedArray(image.data);

    const imageData = new ImageData(safeData, image.width, image.height);

    tempCtx.putImageData(imageData, 0, 0);

    ctx.clearRect(0, 0, fixedSize, fixedSize);

    ctx.drawImage(tempCanvas, 0, 0, fixedSize, fixedSize);
  }, [image]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        width: "400px",
        height: "400px",
      }}
    />
  );
}

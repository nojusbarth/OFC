import { useRef, useState, useEffect, useMemo } from "react";
import { loadImagePixels, PixelData } from "./ImageLoader";
import { resampleImageNearest } from "./ImageSampling";
import { ImagePreview } from "./ImagePreview";
import { calculateValidPixelCount, clampResolution, generateDroneFormation, IgnoreColor } from "./ImageAnalysis";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";


// Dieser Abschnitt ist teilweise KI generiert



export function ImageImportDialog({
    controller,
}: {
    controller: IUndoableController;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rawImage, setRawImage] = useState<PixelData | null>(null);

  const [targetWidth, setTargetWidth] = useState<number>(50);
  const [targetHeight, setTargetHeight] = useState<number>(50);
  const [ignoreColor, setIgnoreColor] = useState<IgnoreColor>("white");
  const [pixelSpacingX, setPixelSpacingX] = useState<number>(1);
  const [pixelSpacingY, setPixelSpacingY] = useState<number>(1);

  const handleFile = async (file: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFileName(file.name);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const result = await loadImagePixels(file);

    setRawImage(result);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const sampledImage = useMemo(() => {
    if (!rawImage) return null;

    const width = targetWidth;
    const height = targetHeight;

    if (!width || !height || width <= 0 || height <= 0) {
      return null;
    }

    return resampleImageNearest(
      rawImage.width,
      rawImage.height,
      rawImage.data,
      width,
      height,
    );
  }, [rawImage, targetWidth, targetHeight]);

  const validPixelCount = useMemo(() => {
    if (!sampledImage) return 0;

    return calculateValidPixelCount(sampledImage, ignoreColor);
  }, [sampledImage, ignoreColor]);

  return (
    <div className="d-flex flex-column align-items-center py-4">
      {/* Upload Area */}
      {!previewUrl && (
        <div
          onClick={openFileDialog}
          style={{
            width: "100%",
            maxWidth: "500px",
            border: "2px dashed #6c757d",
            borderRadius: "12px",
            padding: "60px 20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "2rem" }}>📷</div>
          <h5 className="fw-semibold mt-3">Bild hier ablegen</h5>
          <div className="text-muted">
            oder klicken, um eine Datei auszuwählen
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Preview */}
      {previewUrl && sampledImage && (
        <div
          className="mt-4 text-center"
          style={{ cursor: "pointer" }}
          onClick={openFileDialog}
        >
          <ImagePreview image={sampledImage} />

          <div className="mt-3 fw-semibold">{fileName}</div>

          <div className="text-muted small">
            {validPixelCount} / {targetWidth * targetHeight} Pixel aktiv
          </div>

          <div className="text-muted small mt-2">
            Klicken, um anderes Bild auszuwählen
          </div>
        </div>
      )}

      {/* OPTIONS */}
      {previewUrl && sampledImage && (
        <div className="mt-5 w-100" style={{ maxWidth: "600px" }}>
          <hr className="mb-4" />

          {/* Wunsch Auflösung */}
          <div className="mb-4">
            <div className="fw-semibold mb-2">Wunsch Auflösung</div>

            <div className="d-flex gap-3">
              <div className="flex-fill">
                <label className="form-label small text-muted">Breite</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  step={1}
                  value={targetWidth}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const { width, height } = clampResolution(
                      value,
                      targetHeight,
                    );
                    setTargetWidth(width);
                    setTargetHeight(height);
                  }}
                />
              </div>

              <div className="flex-fill">
                <label className="form-label small text-muted">Höhe</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  step={1}
                  value={targetHeight}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    const { width, height } = clampResolution(
                      targetWidth,
                      value,
                    );
                    setTargetWidth(width);
                    setTargetHeight(height);
                  }}
                />
              </div>
            </div>

            <div className="text-muted small mt-2">
              Maximal 2500 Pixel insgesamt (Breite × Höhe)
            </div>
          </div>
          {/* Pixelabstand */}
          <div className="mb-4">
            <div className="fw-semibold mb-2">Drohnenabstand</div>

            <div className="d-flex gap-3">
              <div className="flex-fill">
                <label className="form-label small text-muted">Abstand X</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  step={0.1}
                  value={pixelSpacingX}
                  onChange={(e) =>
                    setPixelSpacingX(Math.max(0, Number(e.target.value)))
                  }
                />
              </div>

              <div className="flex-fill">
                <label className="form-label small text-muted">Abstand Y</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  step={0.1}
                  value={pixelSpacingY}
                  onChange={(e) =>
                    setPixelSpacingY(Math.max(0, Number(e.target.value)))
                  }
                />
              </div>
            </div>

            <div className="text-muted small mt-2">
              Abstand der Drohnen im Raum
            </div>
          </div>

          {/* Farbe ignorieren */}
          <div className="mb-4">
            <div className="fw-semibold mb-2">Hintergrundfarbe ignorieren</div>

            <div className="btn-group">
              <button
                type="button"
                className={`btn ${
                  ignoreColor === "white"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setIgnoreColor("white")}
              >
                Weiß
              </button>

              <button
                type="button"
                className={`btn ${
                  ignoreColor === "black"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setIgnoreColor("black")}
              >
                Schwarz
              </button>

              <button
                type="button"
                className={`btn ${
                  ignoreColor === "transparent"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setIgnoreColor("transparent")}
              >
                Transparent
              </button>
            </div>
          </div>

          {/* Limit Hinweis */}
          <div className="alert alert-warning small mb-0">
            Dieses Projekt unterstützt maximal <strong>3000 Drohnen</strong>.
          </div>

          <div className="mt-4">
            <button
              className="btn btn-success"
              onClick={() => {
                try {
                  generateDroneFormation(
                    controller,
                    sampledImage,
                    pixelSpacingX,
                    pixelSpacingY,
                    ignoreColor,
                  );
                } catch (error) {
                  alert(
                    error instanceof Error
                      ? error.message
                      : "Unbekannter Fehler",
                  );
                }
              }}
            >
              Formation erzeugen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

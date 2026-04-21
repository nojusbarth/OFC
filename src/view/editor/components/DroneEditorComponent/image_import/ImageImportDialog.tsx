import { useRef, useState, useEffect, useMemo } from "react";
import { loadImagePixels, PixelData } from "./ImageLoader";
import { resampleImageNearest } from "./ImageSampling";
import { ImagePreview } from "./ImagePreview";
import {
  calculateValidPixelCount,
  clampResolution,
  generateDroneFormationForNew,
  generateDroneFormationForSelected,
  IgnoreColor,
} from "./ImageAnalysis";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useTranslation } from "react-i18next";


// Dieser Abschnitt ist teilweise KI generiert



/**
 * Diese Komponente stellt den kompletten Ablauf für den Bildimport bereit,
 * inklusive Vorschau, Auflösungsanpassung, Filterung und Erzeugung einer Formation.
 * @param controller - Controller für das Erzeugen der Drohnenformation.
 * @returns JSX-Dialoginhalt für den Bildimport.
 */
export function ImageImportDialog({
    controller,
}: {
    controller: IUndoableController;
}) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rawImage, setRawImage] = useState<PixelData | null>(null);
  const [selectedDroneCount, setSelectedDroneCount] = useState<number>(
    controller.getSelectedDrones().length,
  );
  const [consentDialogType, setConsentDialogType] = useState<
    "tooFew" | "tooMany" | null
  >(null);

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

  useEffect(() => {
    const updateSelectedDroneCount = (selectedDrones: number[]) => {
      setSelectedDroneCount(selectedDrones.length);
    };

    controller.getDroneSelectEvent().register(updateSelectedDroneCount);

    return () => {
      controller.getDroneSelectEvent().remove(updateSelectedDroneCount);
    };
  }, [controller]);

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

  const openSelectedConsentDialog = () => {
    if (!sampledImage) {
      return;
    }

    if (selectedDroneCount < validPixelCount) {
      setConsentDialogType("tooFew");
      return;
    }

    if (selectedDroneCount > validPixelCount) {
      setConsentDialogType("tooMany");
      return;
    }

    handleSelectedFormation();
  };

  const closeConsentDialog = () => {
    setConsentDialogType(null);
  };

  const handleSelectedFormation = () => {
    if (!sampledImage) {
      return;
    }

    try {
      generateDroneFormationForSelected(
        controller,
        sampledImage,
        pixelSpacingX,
        pixelSpacingY,
        ignoreColor,
      );
      closeConsentDialog();
    } catch (error) {
      alert(
        error instanceof Error
          ? t(error.message, { maxDrones: 3000 })
          : t("common.unknownError"),
      );
    }
  };

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
          <h5 className="fw-semibold mt-3">{t("editor.imageImport.dropImageHere")}</h5>
          <div className="text-muted">
            {t("editor.imageImport.clickToSelectFile")}
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
            {t("editor.imageImport.activePixels", {
              active: validPixelCount,
              total: targetWidth * targetHeight,
            })}
          </div>

          <div className="text-muted small mt-2">
            {t("editor.imageImport.clickForAnotherImage")}
          </div>
        </div>
      )}

      {/* OPTIONS */}
      {previewUrl && sampledImage && (
        <div className="mt-5 w-100" style={{ maxWidth: "600px" }}>
          <hr className="mb-4" />

          {/* Wunsch Auflösung */}
          <div className="mb-4">
            <div className="fw-semibold mb-2">{t("editor.imageImport.targetResolution")}</div>

            <div className="d-flex gap-3">
              <div className="flex-fill">
                <label className="form-label small text-muted">{t("editor.imageImport.width")}</label>
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
                <label className="form-label small text-muted">{t("editor.imageImport.height")}</label>
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
              {t("editor.imageImport.maxPixelsInfo")}
            </div>
          </div>
          {/* Pixelabstand */}
          <div className="mb-4">
            <div className="fw-semibold mb-2">{t("editor.imageImport.droneSpacing")}</div>

            <div className="d-flex gap-3">
              <div className="flex-fill">
                <label className="form-label small text-muted">{t("editor.imageImport.spacingX")}</label>
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
                <label className="form-label small text-muted">{t("editor.imageImport.spacingY")}</label>
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
              {t("editor.imageImport.spacingInfo")}
            </div>
          </div>

          {/* Farbe ignorieren */}
          <div className="mb-4">
            <div className="fw-semibold mb-2">{t("editor.imageImport.ignoreBackground")}</div>

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
                {t("editor.imageImport.white")}
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
                {t("editor.imageImport.black")}
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
                {t("editor.imageImport.transparent")}
              </button>
            </div>
          </div>

          {/* Limit Hinweis */}
          <div className="alert alert-warning small mb-0">
            {t("editor.imageImport.maxDronesNoticePrefix")} <strong>3000 {t("editor.imageImport.drones")}</strong>.
          </div>

          <div className="mt-4 d-flex flex-column gap-3">
            <div className="text-muted small">
              {t("editor.imageImport.selectedDrones", { count: selectedDroneCount })}
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              <button
                className="btn btn-success"
                onClick={() => {
                  try {
                    generateDroneFormationForNew(
                      controller,
                      sampledImage,
                      pixelSpacingX,
                      pixelSpacingY,
                      ignoreColor,
                    );
                  } catch (error) {
                    alert(
                      error instanceof Error
                        ? t(error.message, { maxDrones: 3000 })
                        : t("common.unknownError"),
                    );
                  }
                }}
              >
                {t("editor.imageImport.createFromNew")}
              </button>

              <button
                className="btn btn-outline-success"
                type="button"
                onClick={openSelectedConsentDialog}
              >
                {t("editor.imageImport.createFromSelected")}
              </button>
            </div>
          </div>
        </div>
      )}

      {consentDialogType && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t("editor.imageImport.confirmationRequired")}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeConsentDialog}
                />
              </div>

              <div className="modal-body">
                {consentDialogType === "tooFew" && (
                  <p className="mb-0">
                    {t("editor.imageImport.tooFewDrones", {
                      count: validPixelCount - selectedDroneCount,
                    })}
                  </p>
                )}

                {consentDialogType === "tooMany" && (
                  <p className="mb-0">
                    {t("editor.imageImport.tooManyDrones", {
                      count: selectedDroneCount - validPixelCount,
                    })}
                  </p>
                )}
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeConsentDialog}
                >
                  {t("common.cancel")}
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSelectedFormation}
                >
                  {consentDialogType === "tooFew" ? t("common.create") : t("common.yes")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

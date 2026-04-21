import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { WaveLinearSection } from "./ChildLinearWave";
import { WaveRadialSection } from "./ChildRadialWave";
import { useTranslation } from "react-i18next";

export function WaveColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"linear" | "radial">("linear");

  return (
    <KeyframeEditorComponent title={t("editor.color.wave.typeTitle")}>
      <div className="d-flex flex-column gap-4">
        <div className="btn-group w-100" role="group" aria-label={t("editor.color.wave.ariaWaveType")}>
          <button
            type="button"
            className={`btn btn-sm ${
              mode === "linear" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("linear")}
          >
            {t("editor.color.wave.linear")}
          </button>

          <button
            type="button"
            className={`btn btn-sm ${
              mode === "radial" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("radial")}
          >
            {t("editor.color.wave.radial")}
          </button>
        </div>

        {mode === "linear" && (
          <WaveLinearSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {mode === "radial" && (
          <WaveRadialSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}
      </div>
    </KeyframeEditorComponent>
  );
}

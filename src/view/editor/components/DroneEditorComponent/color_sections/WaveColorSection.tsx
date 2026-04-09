import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { WaveLinearSection } from "./ChildLinearWave";
import { WaveRadialSection } from "./ChildRadialWave";

export function WaveColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [mode, setMode] = useState<"linear" | "radial">("linear");

  return (
    <KeyframeEditorComponent title="Typ der Farb-Welle">
      <div className="d-flex flex-column gap-4">
        <div className="btn-group w-100" role="group" aria-label="Wave type">
          <button
            type="button"
            className={`btn btn-sm ${
              mode === "linear" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("linear")}
          >
            Linear
          </button>

          <button
            type="button"
            className={`btn btn-sm ${
              mode === "radial" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("radial")}
          >
            Radial
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

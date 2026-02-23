import { useState } from "react";
import { KeyframeEditorComponent } from "../SharedComponents";
import { RandomFormatSection } from "./RandomFormatSection";
import { HorizontalFormatSection } from "./HorizontalFormatSection";
import { VerticalFormatSection } from "./VerticalFormatSection";
import { GridFormatSection } from "./GridFormatSection";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
export function GroupFormatSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [mode, setMode] = useState<
    "random" | "horizontal" | "vertical" | "grid"
  >("random");

  return (
    <KeyframeEditorComponent title="Format anwenden">
      <div className="d-flex flex-column gap-4">
        {/* Segmented Control – kompakt & zusammenhängend */}
        <div className="btn-group w-100" role="group">
          <button
            type="button"
            className={`btn btn-sm ${
              mode === "random" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("random")}
          >
            Random
          </button>

          <button
            type="button"
            className={`btn btn-sm ${
              mode === "horizontal" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("horizontal")}
          >
            Horizontal
          </button>

          <button
            type="button"
            className={`btn btn-sm ${
              mode === "vertical" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("vertical")}
          >
            Vertical
          </button>

          <button
            type="button"
            className={`btn btn-sm ${
              mode === "grid" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setMode("grid")}
          >
            Grid
          </button>
        </div>

        {/* Hier kommt später direkt die jeweilige UI rein */}
        {/* Kein zusätzlicher Container */}
        {mode === "random" && <RandomFormatSection selectedDrones={selectedDrones} controller={controller} />}
        {mode === "horizontal" && <HorizontalFormatSection selectedDrones={selectedDrones} controller={controller} />}
        {mode === "vertical" && <VerticalFormatSection selectedDrones={selectedDrones} controller={controller} />}
        {mode === "grid" && <GridFormatSection selectedDrones={selectedDrones} controller={controller} />}
      </div>
    </KeyframeEditorComponent>
  );
}

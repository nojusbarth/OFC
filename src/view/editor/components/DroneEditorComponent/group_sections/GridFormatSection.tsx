import { useState } from "react";
import { Vector3 } from "three";
import {
  KeyframeEditorComponent,
  PositionInputComponent,
} from "../SharedComponents";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

// Dieser Abschnitt ist teilweise KI generiert

type GridPlane = "horizontal" | "vertical";

/**
 * Die GridFormatSection ermöglicht es dem Nutzer, die Positionen mehrerer Drohnen gleichzeitig in einem Rastermuster anzuordnen. 
 * Der Nutzer kann den Mittelpunkt des Rasters, den Abstand zwischen den Drohnen in X- und Y-Richtung sowie die Ebene (horizontal oder vertikal) auswählen. 
 * @param selectedDrones - Eine Liste der IDs der aktuell ausgewählten Drohnen, die formatiert werden sollen.
 * @param controller - Ein Controller-Objekt, das Funktionen zum Ändern der Drohnenpositionen bereitstellt.
 * @returns JSX-Komponente zur Formatierung der Drohnen in einem Rastermuster.
 */
export function GridFormatSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [center, setCenter] = useState<Vector3>(new Vector3(0, 0, 0));

  const [spacingX, setSpacingX] = useState<number>(2);
  const [spacingY, setSpacingY] = useState<number>(2);

  const [plane, setPlane] = useState<GridPlane>("horizontal");

  const handleCenterChange = (axis: "x" | "y" | "z", value: number) => {
    const newCenter = center.clone();
    newCenter[axis] = value;
    setCenter(newCenter);
  };

  const handleApply = () => {
    const count = selectedDrones.length;
    if (count === 0) return;

    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);

    const totalWidth = (cols - 1) * spacingX;
    const totalHeight = (rows - 1) * spacingY;

    selectedDrones.forEach((droneId, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      let newPosition: Vector3;

      if (plane === "horizontal") {
        const startX = center.x - totalWidth / 2;
        const startZ = center.z - totalHeight / 2;

        newPosition = new Vector3(
          startX + col * spacingX,
          center.y,
          startZ + row * spacingY,
        );
      } else {
        const startX = center.x - totalWidth / 2;
        const startY = center.y - totalHeight / 2;

        newPosition = new Vector3(
          startX + col * spacingX,
          startY + row * spacingY,
          center.z,
        );
      }

      controller.addPositionKeyFrameNow(droneId, newPosition);
    });
  };

  return (
    <KeyframeEditorComponent title="Grid Formation">
      {/* Center */}
      <div className="mb-3">
        <div className="text-muted small mb-2">Mittelpunkt</div>

        <div className="d-flex gap-2">
          <PositionInputComponent
            title="X"
            currentValue={center.x}
            onChangePosition={(v) => handleCenterChange("x", v)}
          />
          <PositionInputComponent
            title="Y"
            currentValue={center.y}
            onChangePosition={(v) => handleCenterChange("y", v)}
          />
          <PositionInputComponent
            title="Z"
            currentValue={center.z}
            onChangePosition={(v) => handleCenterChange("z", v)}
          />
        </div>
      </div>

      {/* Spacing + Plane Selection */}
      <div className="mb-3">
        <div className="text-muted small mb-2">Abstand & Ebene</div>

        <div className="d-flex gap-2 align-items-end">
          <PositionInputComponent
            title="X Abstand"
            currentValue={spacingX}
            onChangePosition={(v) => setSpacingX(Math.max(0, v))}
          />

          <PositionInputComponent
            title="Y Abstand"
            currentValue={spacingY}
            onChangePosition={(v) => setSpacingY(Math.max(0, v))}
          />

          <div className="btn-group btn-group-sm">
            <button
              type="button"
              className={`btn ${
                plane === "horizontal" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setPlane("horizontal")}
            >
              XZ
            </button>

            <button
              type="button"
              className={`btn ${
                plane === "vertical" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setPlane("vertical")}
            >
              XY
            </button>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={handleApply}
        disabled={selectedDrones.length === 0}
      >
        Anwenden
      </button>
    </KeyframeEditorComponent>
  );
}

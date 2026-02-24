import { useState } from "react";
import { Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import {
  KeyframeEditorComponent,
  PositionInputComponent,
} from "../SharedComponents";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Die OffsetSection ermöglicht es dem Nutzer, einen Versatz (Offset) anzugeben, der auf die aktuellen Positionen der ausgewählten Drohnen angewendet wird.
 * @param selectedDrones - Eine Liste der IDs der aktuell ausgewählten Drohnen, auf die der Offset angewendet werden soll.
 * @param controller - Ein Controller-Objekt, das Funktionen zum Ändern der Drohnenpositionen bereitstellt.
 * @returns JSX-Komponente zur Eingabe eines Offsets und zur Anwendung dieses Offsets auf die Positionen der ausgewählten Drohnen.
 */
export function OffsetSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [offset, setOffset] = useState<Vector3>(new Vector3(0, 0, 0));

  const handleOffsetChange = (axis: "x" | "y" | "z", value: number) => {
    const newOffset = offset.clone();
    newOffset[axis] = value;
    setOffset(newOffset);
  };

  const handleApplyOffset = () => {
    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      const currentPosition = controller.getPosition(droneId);

      const newPosition = currentPosition.clone().add(offset);

      controller.addPositionKeyFrameNow(droneId, newPosition);
    });
    controller.endBatching();
  };

  return (
    <KeyframeEditorComponent title="Offset angeben">
      <div className="d-flex flex-column gap-3">
        {/* Eingabefelder */}
        <div className="d-flex align-items-center gap-2">
          <PositionInputComponent
            title="X"
            currentValue={offset.x}
            onChangePosition={(value) => handleOffsetChange("x", value)}
          />
          <PositionInputComponent
            title="Y"
            currentValue={offset.y}
            onChangePosition={(value) => handleOffsetChange("y", value)}
          />
          <PositionInputComponent
            title="Z"
            currentValue={offset.z}
            onChangePosition={(value) => handleOffsetChange("z", value)}
          />
        </div>

        {/* Button darunter */}
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleApplyOffset}>
            Anwenden
          </button>
        </div>
      </div>
    </KeyframeEditorComponent>
  );
}

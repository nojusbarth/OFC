import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import {
  KeyframeEditorComponent,
  PositionInputComponent,
} from "../SharedComponents";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [offset, setOffset] = useState<Vector3>(new Vector3(0, 0, 0));

  const updateGhostPreview = (previewOffset: Vector3) => {
    const ghostController = controller.getGhostController();

    // Kein aktives Preview fuer leere Auswahl oder Null-Offset.
    if (selectedDrones.length === 0 || previewOffset.lengthSq() === 0) {
      ghostController.resetGhosts();
      return;
    }

    let positionMap = new Map<number, Vector3>();
    selectedDrones.forEach((droneId) => {
      const currentPosition = controller.getPosition(droneId);
      const previewPosition = currentPosition.clone().add(previewOffset);
      positionMap.set(droneId, previewPosition);
    });

    ghostController.setGhostPositions(positionMap);
  };

  const handleOffsetChange = (axis: "x" | "y" | "z", value: number) => {
    const newOffset = offset.clone();
    newOffset[axis] = value;
    setOffset(newOffset);
    updateGhostPreview(newOffset);
  };

  useEffect(() => {
    updateGhostPreview(offset);
    return () => {
      controller.getGhostController().resetGhosts();
    };
  }, [selectedDrones]);

  const handleApplyOffset = () => {
    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      const currentPosition = controller.getPosition(droneId);

      const newPosition = currentPosition.clone().add(offset);

      controller.addPositionKeyFrameNow(droneId, newPosition);
    });
    controller.endBatching();
    controller.getGhostController().resetGhosts();
  };

  return (
    <KeyframeEditorComponent title={t("editor.group.offsetTitle")}>
      <div className="d-flex flex-column gap-3">
        {/* Eingabefelder */}
        <div className="d-flex align-items-center gap-2">
          <PositionInputComponent
            title={t("axes.x")}
            currentValue={offset.x}
            onChangePosition={(value) => handleOffsetChange("x", value)}
          />
          <PositionInputComponent
            title={t("axes.y")}
            currentValue={offset.y}
            onChangePosition={(value) => handleOffsetChange("y", value)}
          />
          <PositionInputComponent
            title={t("axes.z")}
            currentValue={offset.z}
            onChangePosition={(value) => handleOffsetChange("z", value)}
          />
        </div>

        {/* Button darunter */}
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={handleApplyOffset}>
            {t("common.apply")}
          </button>
        </div>
      </div>
    </KeyframeEditorComponent>
  );
}

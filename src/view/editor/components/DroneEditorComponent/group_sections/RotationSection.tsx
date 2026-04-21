import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { RotationHelper } from "./RotationHelper";
import { useTranslation } from "react-i18next";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Die RotationSection ermöglicht es dem Nutzer, die Positionen mehrerer Drohnen gleichzeitig um einen gemeinsamen Mittelpunkt zu rotieren.
 * @param selectedDrones - Eine Liste der IDs der aktuell ausgewählten Drohnen, die rotiert werden sollen.
 * @param controller - Ein Controller-Objekt, das Funktionen zum Ändern der Drohnenpositionen bereitstellt.
 * @returns JSX-Komponente zur Eingabe von Rotationswinkeln und zur Anwendung dieser Rotation auf die Positionen der ausgewählten Drohnen.
 */
export function RotationSection({
    selectedDrones,
    controller,
}: {
    selectedDrones: number[];
    controller: IUndoableController;
}) {
    const { t } = useTranslation();

    const [rotation, setRotation] = useState<Vector3>(
        new Vector3(0, 0, 0)
    );

    const handleRotationChange = (axis: "x" | "y" | "z", value: number) => {
        const newRotation = rotation.clone();
        newRotation[axis] = value;
        setRotation(newRotation);
    };

    const updateGhostPreview = () => {
        const ghostController = controller.getGhostController();

        if (selectedDrones.length === 0) {
            ghostController.resetGhosts();
            return;
        }

        const positions = selectedDrones.map((id) =>
            controller.getPosition(id).clone()
        );
        const rotatedPositions = RotationHelper.rotatePositions(
            positions,
            rotation,
        );

        const positionMap = new Map<number, Vector3>();
        selectedDrones.forEach((droneId, index) => {
            positionMap.set(droneId, rotatedPositions[index]);
        });

        ghostController.setGhostPositions(positionMap);
    };

    useEffect(() => {
        updateGhostPreview();
    }, [selectedDrones, rotation]);

    useEffect(() => {
        return () => {
            controller.getGhostController().resetGhosts();
        };
    }, [controller]);

    const handleApplyRotation = () => {
        const positions = selectedDrones.map((id) =>
            controller.getPosition(id).clone()
        );
        const rotatedPositions = RotationHelper.rotatePositions(
            positions,
            rotation,
        );

        controller.startBatching();
        selectedDrones.forEach((droneId, index) => {
            controller.addPositionKeyFrameNow(droneId, rotatedPositions[index]);
        });
        controller.endBatching();
        controller.getGhostController().resetGhosts();

    };

    return (
        <KeyframeEditorComponent title={t("editor.group.rotationTitle")}>
            <div className="d-flex flex-column gap-3">

                <div className="d-flex align-items-center gap-2">

                    <PositionInputComponent
                        title={t("editor.group.rotationX")}
                        currentValue={rotation.x}
                        onChangePosition={(value) =>
                            handleRotationChange("x", value)
                        }
                    />

                    <PositionInputComponent
                        title={t("editor.group.rotationY")}
                        currentValue={rotation.y}
                        onChangePosition={(value) =>
                            handleRotationChange("y", value)
                        }
                    />

                    <PositionInputComponent
                        title={t("editor.group.rotationZ")}
                        currentValue={rotation.z}
                        onChangePosition={(value) =>
                            handleRotationChange("z", value)
                        }
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary"
                        onClick={handleApplyRotation}
                    >
                        {t("common.apply")}
                    </button>
                </div>

            </div>
        </KeyframeEditorComponent>
    );
}
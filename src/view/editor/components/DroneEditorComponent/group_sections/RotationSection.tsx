import { useState } from "react";
import { Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";
import { RotationHelper } from "./RotationHelper";

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

    const [rotation, setRotation] = useState<Vector3>(
        new Vector3(0, 0, 0)
    );

    const handleRotationChange = (axis: "x" | "y" | "z", value: number) => {
        const newRotation = rotation.clone();
        newRotation[axis] = value;
        setRotation(newRotation);
    };

    const handleApplyRotation = () => {

        // aktuelle Positionen holen
        const positions = selectedDrones.map((id) =>
            controller.getPosition(id).clone()
        );

        const rotatedPositions =
            RotationHelper.rotatePositions(positions, rotation);
        controller.startBatching();
        selectedDrones.forEach((droneId, index) => {
            controller.addPositionKeyFrameNow(droneId, rotatedPositions[index]);
        });
        controller.endBatching();

    };

    return (
        <KeyframeEditorComponent title="Rotation angeben">
            <div className="d-flex flex-column gap-3">

                <div className="d-flex align-items-center gap-2">

                    <PositionInputComponent
                        title="X Rot"
                        currentValue={rotation.x}
                        onChangePosition={(value) =>
                            handleRotationChange("x", value)
                        }
                    />

                    <PositionInputComponent
                        title="Y Rot"
                        currentValue={rotation.y}
                        onChangePosition={(value) =>
                            handleRotationChange("y", value)
                        }
                    />

                    <PositionInputComponent
                        title="Z Rot"
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
                        Anwenden
                    </button>
                </div>

            </div>
        </KeyframeEditorComponent>
    );
}
import { useState } from "react";
import { Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";
import { RotationHelper } from "./RotationHelper";

// Dieser Abschnitt ist teilweise KI generiert

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

        const time = controller.getTimeController().getTime();

        // aktuelle Positionen holen
        const positions = selectedDrones.map((id) =>
            controller.getPositionAt(id, time).clone()
        );

        const rotatedPositions =
            RotationHelper.rotatePositions(positions, rotation);

        selectedDrones.forEach((droneId, index) => {
            const newFrame = new PositionKeyFrame(
                rotatedPositions[index],
                time
            );

            controller.addPositionKeyFrame(droneId, newFrame);
        });


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
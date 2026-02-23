import { useState } from "react";
import { Vector3 } from "three";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

export function HorizontalFormatSection({
    selectedDrones,
    controller,
}: {
    selectedDrones: number[];
    controller: IUndoableController;
}) {
    const [center, setCenter] = useState<Vector3>(
        new Vector3(0, 0, 0)
    );

    const [spacing, setSpacing] = useState<number>(2);

    const handleCenterChange = (axis: "x" | "y" | "z", value: number) => {
        const newCenter = center.clone();
        newCenter[axis] = value;
        setCenter(newCenter);
    };

    const handleApply = () => {
        const count = selectedDrones.length;
        if (count === 0) return;

        const totalWidth = (count - 1) * spacing;
        const startX = center.x - totalWidth / 2;

        selectedDrones.forEach((droneId, index) => {
            const newPosition = new Vector3(
                startX + index * spacing,
                center.y,
                center.z
            );

            controller.addPositionKeyFrameNow(droneId, newPosition);
        });
    };

    return (
        <KeyframeEditorComponent title="Horizontal Formation">

            {/* Center */}
            <div className="mb-3">
                <div className="text-muted small mb-2">
                    Mittelpunkt
                </div>

                <div className="d-flex gap-2">
                    <PositionInputComponent
                        title="X"
                        currentValue={center.x}
                        onChangePosition={(v) =>
                            handleCenterChange("x", v)
                        }
                    />
                    <PositionInputComponent
                        title="Y"
                        currentValue={center.y}
                        onChangePosition={(v) =>
                            handleCenterChange("y", v)
                        }
                    />
                    <PositionInputComponent
                        title="Z"
                        currentValue={center.z}
                        onChangePosition={(v) =>
                            handleCenterChange("z", v)
                        }
                    />
                </div>
            </div>

            {/* Spacing */}
            <div className="mb-3">
                <div className="text-muted small mb-2">
                    Abstand (X-Achse)
                </div>

                <PositionInputComponent
                    title="Abstand"
                    currentValue={spacing}
                    onChangePosition={(v) =>
                        setSpacing(Math.max(0, v))
                    }
                />
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
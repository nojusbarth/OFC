import { useState } from "react";
import { Vector3 } from "three";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

// Dieser Abschnitt ist teilweise KI generiert

export function RandomFormatSection({
    selectedDrones,
    controller,
}: {
    selectedDrones: number[];
    controller: IUndoableController;
}) {
    const [center, setCenter] = useState<Vector3>(
        new Vector3(0, 0, 0)
    );

    const [bounds, setBounds] = useState<Vector3>(
        new Vector3(1, 1, 1)
    );

    const handleCenterChange = (axis: "x" | "y" | "z", value: number) => {
        const newCenter = center.clone();
        newCenter[axis] = value;
        setCenter(newCenter);
    };

    const handleBoundsChange = (axis: "x" | "y" | "z", value: number) => {
        const newBounds = bounds.clone();
        newBounds[axis] = Math.max(0, value); // keine negativen Bounds
        setBounds(newBounds);
    };

    const handleApply = () => {
        selectedDrones.forEach((droneId) => {
            const randomOffset = new Vector3(
                (Math.random() * 2 - 1) * bounds.x,
                (Math.random() * 2 - 1) * bounds.y,
                (Math.random() * 2 - 1) * bounds.z
            );

            const newPosition = center.clone().add(randomOffset);

            controller.addPositionKeyFrameNow(droneId, newPosition);
        });
    };

    return (
        <KeyframeEditorComponent title="Random Formation">

            {/* Reference Position */}
            <div className="mb-3">
                <div className="text-muted small mb-2">
                    Referenz Position
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

            {/* Bounds */}
            <div className="mb-3">
                <div className="text-muted small mb-2">
                    Bounds (+/-)
                </div>

                <div className="d-flex gap-2">
                    <PositionInputComponent
                        title="X"
                        currentValue={bounds.x}
                        onChangePosition={(v) =>
                            handleBoundsChange("x", v)
                        }
                    />
                    <PositionInputComponent
                        title="Y"
                        currentValue={bounds.y}
                        onChangePosition={(v) =>
                            handleBoundsChange("y", v)
                        }
                    />
                    <PositionInputComponent
                        title="Z"
                        currentValue={bounds.z}
                        onChangePosition={(v) =>
                            handleBoundsChange("z", v)
                        }
                    />
                </div>
            </div>

            {/* Apply Button */}
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
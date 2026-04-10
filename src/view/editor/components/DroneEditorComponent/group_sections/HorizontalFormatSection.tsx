import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";

// Dieser Abschnitt ist teilweise KI generiert


/**
 * Die HorizontalFormatSection ermöglicht es dem Nutzer, die Positionen mehrerer Drohnen gleichzeitig in einer horizontalen Linie anzuordnen.
 * @param selectedDrones - Eine Liste der IDs der aktuell ausgewählten Drohnen, die formatiert werden sollen.
 * @param controller - Ein Controller-Objekt, das Funktionen zum Ändern der Drohnenpositionen bereitstellt. 
 * @returns JSX-Komponente zur Formatierung der Drohnen in einer horizontalen Linie.
 */
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

    const updateGhostPreview = () => {
        const ghostController = controller.getGhostController();

        if (selectedDrones.length === 0) {
            ghostController.resetGhosts();
            return;
        }

        const count = selectedDrones.length;
        const totalWidth = (count - 1) * spacing;
        const startX = center.x - totalWidth / 2;

        const positionMap = new Map<number, Vector3>();
        selectedDrones.forEach((droneId, index) => {
            positionMap.set(
                droneId,
                new Vector3(startX + index * spacing, center.y, center.z),
            );
        });

        ghostController.setGhostPositions(positionMap);
    };

    useEffect(() => {
        updateGhostPreview();
    }, [selectedDrones, center, spacing]);

    useEffect(() => {
        return () => {
            controller.getGhostController().resetGhosts();
        };
    }, [controller]);

    const handleApply = () => {
        const count = selectedDrones.length;
        if (count === 0) return;

        const totalWidth = (count - 1) * spacing;
        const startX = center.x - totalWidth / 2;
        controller.startBatching();
        selectedDrones.forEach((droneId, index) => {
            const newPosition = new Vector3(
                startX + index * spacing,
                center.y,
                center.z
            );

            controller.addPositionKeyFrameNow(droneId, newPosition);
        });
        controller.endBatching();
        controller.getGhostController().resetGhosts();
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
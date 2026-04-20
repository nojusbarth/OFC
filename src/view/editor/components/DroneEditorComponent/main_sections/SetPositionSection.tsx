
import { useEffect } from "react";
import { Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController"; // deinen Pfad einsetzen
import { KeyframeEditorComponent, PositionInputComponent, AddKeyframeComponent } from "../SharedComponents";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Diese Komponente setzt für alle ausgewählten Drohnen eine Positions-Keyframe
 * am aktuellen Zeitpunkt.
 * @param position - Aktuell konfigurierte Zielposition.
 * @param setPosition - Setter zum Aktualisieren der Positionseingabe.
 * @param selectedDrones - IDs der aktuell ausgewählten Drohnen.
 * @param controller - Controller für das Anlegen von Positions-Keyframes.
 * @returns JSX-Bereich zur Positionseingabe und Anwendung.
 */
export function SetPositionSection({
    position,
    setPosition,
    selectedDrones,
    controller,
}: {
    position: Vector3;
    setPosition: React.Dispatch<React.SetStateAction<Vector3>>;
    selectedDrones: number[];
    controller: IUndoableController;
}) {

    const handlePositionChange = (axis: "x" | "y" | "z", value: number) => {
        const newPosition = position.clone();
        newPosition[axis] = value;
        setPosition(newPosition);
    };

    const updateGhostPreview = () => {
        const ghostController = controller.getGhostController();

        if (selectedDrones.length === 0) {
            ghostController.resetGhosts();
            return;
        }

        const positionMap = new Map<number, Vector3>();
        selectedDrones.forEach((droneId) => {
            positionMap.set(droneId, position.clone());
        });

        ghostController.setGhostPositions(positionMap);
    };

    useEffect(() => {
        updateGhostPreview();
    }, [selectedDrones, position]);

    useEffect(() => {
        return () => {
            controller.getGhostController().resetGhosts();
        };
    }, [controller]);

    const handleAddPositionKeyframe = () => {
        controller.startBatching();
        selectedDrones.forEach((droneId) => {
            controller.addPositionKeyFrameNow(droneId, position);
        });
        controller.endBatching();
        controller.getGhostController().resetGhosts();
    };

    return (
        <KeyframeEditorComponent title="Position Setzen">
            <div className="d-flex align-items-center gap-2">
                <PositionInputComponent
                    title="X"
                    currentValue={position.x}
                    onChangePosition={(value) =>
                        handlePositionChange("x", value)
                    }
                />
                <PositionInputComponent
                    title="Y"
                    currentValue={position.y}
                    onChangePosition={(value) =>
                        handlePositionChange("y", value)
                    }
                />
                <PositionInputComponent
                    title="Z"
                    currentValue={position.z}
                    onChangePosition={(value) =>
                        handlePositionChange("z", value)
                    }
                />
            </div>

            <AddKeyframeComponent
                onClick={handleAddPositionKeyframe}
            />
        </KeyframeEditorComponent>
    );
}
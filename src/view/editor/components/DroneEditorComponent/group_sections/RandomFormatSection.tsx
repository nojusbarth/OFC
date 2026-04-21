import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { KeyframeEditorComponent, PositionInputComponent } from "../SharedComponents";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useTranslation } from "react-i18next";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Die RandomFormatSection ermöglicht es dem Nutzer, die Positionen mehrerer Drohnen gleichzeitig zufällig um einen angegebenen Mittelpunkt und innerhalb bestimmter Bounds zu verteilen.
 * @param selectedDrones - Eine Liste der IDs der aktuell ausgewählten Drohnen, die formatiert werden sollen.
 * @param controller - Ein Controller-Objekt, das Funktionen zum Ändern der Drohnenpositionen bereitstellt.
 * @returns JSX-Komponente zur Formatierung der Drohnen in einer zufälligen Anordnung um einen Mittelpunkt.
 */
export function RandomFormatSection({
    selectedDrones,
    controller,
}: {
    selectedDrones: number[];
    controller: IUndoableController;
}) {
    const { t } = useTranslation();
    const [center, setCenter] = useState<Vector3>(
        new Vector3(0, 0, 0)
    );

    const [bounds, setBounds] = useState<Vector3>(
        new Vector3(1, 1, 1)
    );

    const pseudoRandom = (seed: number) => {
        const value = Math.sin(seed * 12.9898) * 43758.5453;
        return value - Math.floor(value);
    };

    const updateGhostPreview = () => {
        const ghostController = controller.getGhostController();

        if (selectedDrones.length === 0) {
            ghostController.resetGhosts();
            return;
        }

        const positionMap = new Map<number, Vector3>();
        selectedDrones.forEach((droneId) => {
            const randomOffset = new Vector3(
                (pseudoRandom(droneId * 3 + 1) * 2 - 1) * bounds.x,
                (pseudoRandom(droneId * 3 + 2) * 2 - 1) * bounds.y,
                (pseudoRandom(droneId * 3 + 3) * 2 - 1) * bounds.z,
            );

            positionMap.set(droneId, center.clone().add(randomOffset));
        });

        ghostController.setGhostPositions(positionMap);
    };

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

    useEffect(() => {
        updateGhostPreview();
    }, [selectedDrones, center, bounds]);

    useEffect(() => {
        return () => {
            controller.getGhostController().resetGhosts();
        };
    }, [controller]);

    const handleApply = () => {
        controller.startBatching();
        selectedDrones.forEach((droneId) => {
            const randomOffset = new Vector3(
                (Math.random() * 2 - 1) * bounds.x,
                (Math.random() * 2 - 1) * bounds.y,
                (Math.random() * 2 - 1) * bounds.z
            );

            const newPosition = center.clone().add(randomOffset);

            controller.addPositionKeyFrameNow(droneId, newPosition);
        });
        controller.endBatching();
        controller.getGhostController().resetGhosts();
    };

    return (
        <KeyframeEditorComponent title={t("editor.group.randomFormation")}>

            {/* Reference Position */}
            <div className="mb-3">
                <div className="text-muted small mb-2">
                    {t("editor.group.referencePosition")}
                </div>

                <div className="d-flex gap-2">
                    <PositionInputComponent
                        title={t("axes.x")}
                        currentValue={center.x}
                        onChangePosition={(v) =>
                            handleCenterChange("x", v)
                        }
                    />
                    <PositionInputComponent
                        title={t("axes.y")}
                        currentValue={center.y}
                        onChangePosition={(v) =>
                            handleCenterChange("y", v)
                        }
                    />
                    <PositionInputComponent
                        title={t("axes.z")}
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
                    {t("editor.group.bounds")}
                </div>

                <div className="d-flex gap-2">
                    <PositionInputComponent
                        title={t("axes.x")}
                        currentValue={bounds.x}
                        onChangePosition={(v) =>
                            handleBoundsChange("x", v)
                        }
                    />
                    <PositionInputComponent
                        title={t("axes.y")}
                        currentValue={bounds.y}
                        onChangePosition={(v) =>
                            handleBoundsChange("y", v)
                        }
                    />
                    <PositionInputComponent
                        title={t("axes.z")}
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
                {t("common.apply")}
            </button>

        </KeyframeEditorComponent>
    );
}
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Color } from "three";
import { ColorKeyFrame } from "../../../repository/entity/ColorKeyFrame";
import { PositionKeyFrame } from "../../../repository/entity/PositionKeyFrame";
import { Card, Form } from "react-bootstrap";
import { IUndoableController } from "../../../controller/interface/IUndoableController";
import { toolTipps } from "../config";
import { ITimeController } from "../../../controller/interface/ITimeController";

// Die Klasse wurde zu Teilen mit Hilfe von KI generiert
/**
 * Erstellt eine Drone Editor Komponente auf der der Nutzer für die aktuell ausgewählten Drohnen Keyframes setzen und entfernen kann
 * @param controller Stellt den Controller mit Zugriff auf die Logik bereit
 * @returns JSX-Element der Drone Editor Komponente
 */
export default function DroneEditorComponent({
    controller,
}: {
    controller: IUndoableController;
}) {
    /* ---------- Used Controllers ---------- */
    const timerController: ITimeController = controller.getTimeController();

    /* ---------- State Hooks ---------- */
    const [selectedDrones, setSelectedDrones] = useState<Array<number>>(
        controller.getSelectedDrones(),
    );
    const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));
    const [color, setColor] = useState<Color>(new Color(0, 0, 0));
    const [positionKeyframes, setPositionKeyframes] = useState<
        Array<PositionKeyFrame>
    >([]);
    const [colorKeyframes, setColorKeyframes] = useState<Array<ColorKeyFrame>>(
        [],
    );
    const [showKeyframes, setShowKeyframes] = useState<boolean>(false);

    /* ---------- Referenced Variables ---------- */

    const positionKeyframeToId = useRef<Map<PositionKeyFrame, number>>(
        new Map(),
    );
    const colorKeyframeToId = useRef<Map<ColorKeyFrame, number>>(new Map());

    /* ---------- Register Events ---------- */
    useEffect(() => {
        updateKeyframes();

        const onSelectionChange = (newSelectedDrones: Array<number>) => {
            // Update Color and Position if no drones were previously selected
            if (selectedDrones.length == 0 && newSelectedDrones.length != 0) {
                setPosition(controller.getPosition(newSelectedDrones[0]));
                setColor(new Color(controller.getColor(newSelectedDrones[0])));
            }

            setSelectedDrones(newSelectedDrones);
            updateKeyframes();
        };

        const onDroneAttributeChanged = (droneId: number) => {
            updateKeyframes();
        };

        controller.getDroneSelectEvent().register(onSelectionChange);
        controller.getDroneChangedEvent().register(onDroneAttributeChanged);

        return () => {
            controller.getDroneSelectEvent().remove(onSelectionChange);
            controller.getDroneChangedEvent().remove(onDroneAttributeChanged);
        };
    }, [selectedDrones, controller]);

    /* ---------- Helper Functions ---------- */
    function updateKeyframes() {
        const positionKeyframes: Array<PositionKeyFrame> =
            new Array<PositionKeyFrame>();
        const colorKeyframes: Array<ColorKeyFrame> = new Array<ColorKeyFrame>();

        positionKeyframeToId.current.clear();
        colorKeyframeToId.current.clear();

        controller.getSelectedDrones().forEach((droneId) => {
            const currentPositionKeyframes =
                controller.getPositionKeyFrames(droneId);
            const currentColorKeyframes = controller.getColorKeyFrames(droneId);

            positionKeyframes.push(...currentPositionKeyframes);
            colorKeyframes.push(...currentColorKeyframes);

            for (const posKeyframe of currentPositionKeyframes) {
                positionKeyframeToId.current.set(posKeyframe, droneId);
            }
            for (const colorKeyframe of currentColorKeyframes) {
                colorKeyframeToId.current.set(colorKeyframe, droneId);
            }
        });

        positionKeyframes.sort((a, b) => a.getTime() - b.getTime());
        colorKeyframes.sort((a, b) => a.getTime() - b.getTime());

        setPositionKeyframes(positionKeyframes);
        setColorKeyframes(colorKeyframes);
    }

    const getIdForKeyframe = (keyframe: PositionKeyFrame | ColorKeyFrame) => {
        if (keyframe instanceof PositionKeyFrame) {
            return positionKeyframeToId.current.get(keyframe);
        } else if (keyframe instanceof ColorKeyFrame) {
            return colorKeyframeToId.current.get(keyframe);
        }
        return undefined;
    };

    /* ---------- Click Handlers ---------- */
    const handlePositionChange = (axis: "x" | "y" | "z", value: number) => {
        const newPosition = position.clone();
        newPosition[axis] = value;
        setPosition(newPosition);
    };

    const handleColorChange = (hexColor: string) => {
        setColor(new Color(hexColor));
    };

    const handleRemoveKeyframe = (
        keyframe: PositionKeyFrame | ColorKeyFrame,
    ) => {
        const droneId = getIdForKeyframe(keyframe);

        if (keyframe instanceof PositionKeyFrame) {
            if (droneId == undefined) return;
            controller.removePositionKeyFrame(droneId, keyframe);
        } else if (keyframe instanceof ColorKeyFrame) {
            if (droneId == undefined) return;
            controller.removeColorKeyFrame(droneId, keyframe);
        }
    };

    const handleJumpToTime = (keyframe: PositionKeyFrame | ColorKeyFrame) => {
        timerController.setTime(keyframe.getTime());
    };

    const handleAddPositionKeyframe = () => {
        selectedDrones.forEach((droneId) => {
            controller.addPositionKeyFrameNow(droneId, position);
        });
    };

    const handleAddColorKeyframe = () => {
        selectedDrones.forEach((droneId) => {
            controller.addColorKeyFrameNow(droneId, color);
        });
    };

    return (
        <Card
            className="d-flex flex-column h-100 w-100 
            rounded-0 border-2 border-secondary border-end-0 border-top-0 border-bottom-0"
        >
            <Card.Header className="d-flex justify-content-between align-items-center bg-light border-bottom">
                <span className="fw-bold">Aktionen</span>
                <div className="d-flex gap-2">
                    <button
                        title={toolTipps.PROJECT_UNDO}
                        className="btn btn-primary btn-sm d-flex gap-2"
                        onClick={() => {
                            controller.undo();
                        }}
                    >
                        <i className="bi bi-caret-left" />
                    </button>
                    <button
                        title={toolTipps.PROJECT_REDO}
                        className="btn btn-primary btn-sm d-flex gap-2"
                        onClick={() => {
                            controller.redo();
                        }}
                    >
                        <i className="bi bi-caret-right" />
                    </button>
                </div>
            </Card.Header>

            {/* Content */}
            <Card.Body className="d-flex flex-column overflow-y-auto p-3 gap-3">
                {/* Selected Drones Info */}
                <div className="text-muted small">
                    <i className="bi bi-info-circle me-2" />
                    {selectedDrones.length} Drohne(n) ausgewählt
                </div>

                {selectedDrones.length == 1 && (
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
                )}

                {selectedDrones.length > 0 && (
                    <>
                        <KeyframeEditorComponent title="Farbe Setzen">
                            <Form.Group>
                                <Form.Label className="small">
                                    LED-Farbe wählen
                                </Form.Label>
                                <input
                                    type="color"
                                    value={`#${color.getHexString()}`}
                                    onChange={(e) =>
                                        handleColorChange(e.target.value)
                                    }
                                    style={{
                                        cursor: "pointer",
                                        height: "40px",
                                        width: "100%",
                                    }}
                                />
                            </Form.Group>

                            <AddKeyframeComponent
                                onClick={handleAddColorKeyframe}
                            />
                        </KeyframeEditorComponent>

                        <div>
                            <div>
                                <button
                                    className="btn btn-link text-black d-flex align-items-start gap-2"
                                    onClick={() =>
                                        setShowKeyframes(!showKeyframes)
                                    }
                                >
                                    <TitleComponent title="Drohnen Keyframes" />
                                    <i
                                        className={`bi ${showKeyframes ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}
                                    />
                                </button>
                            </div>

                            {showKeyframes && (
                                <KeyframeListComponent
                                    handleRemoveKeyframe={handleRemoveKeyframe}
                                    handleJumpToTime={handleJumpToTime}
                                    getIdForKeyframe={getIdForKeyframe}
                                    positionKeyframes={positionKeyframes}
                                    colorKeyframes={colorKeyframes}
                                />
                            )}
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

function KeyframeListComponent({
    handleRemoveKeyframe,
    handleJumpToTime,
    getIdForKeyframe,
    positionKeyframes,
    colorKeyframes,
}: {
    handleRemoveKeyframe: (keyframe: PositionKeyFrame | ColorKeyFrame) => void;
    handleJumpToTime: (keyframe: PositionKeyFrame | ColorKeyFrame) => void;
    getIdForKeyframe: (
        keyframe: PositionKeyFrame | ColorKeyFrame,
    ) => number | undefined;
    positionKeyframes: Array<PositionKeyFrame>;
    colorKeyframes: Array<ColorKeyFrame>;
}) {
    return (
        <div>
            {positionKeyframes.length > 0 && (
                <div className="mb-3">
                    <div className="text-muted small mb-2">
                        Position Keyframes
                    </div>
                    {positionKeyframes.map((keyframe) => (
                        <KeyframeComponent
                            keyframe={keyframe}
                            handleRemoveKeyframe={handleRemoveKeyframe}
                            handleJumpToTime={handleJumpToTime}
                            getIdForKeyframe={getIdForKeyframe}
                        />
                    ))}
                </div>
            )}

            {colorKeyframes.length > 0 && (
                <div className="mb-3">
                    <div className="text-muted small mb-2">Color Keyframes</div>
                    {colorKeyframes.map((keyframe) => (
                        <KeyframeComponent
                            keyframe={keyframe}
                            handleRemoveKeyframe={handleRemoveKeyframe}
                            handleJumpToTime={handleJumpToTime}
                            getIdForKeyframe={getIdForKeyframe}
                        />
                    ))}
                </div>
            )}

            {positionKeyframes.length === 0 && colorKeyframes.length === 0 && (
                <p className="text-muted small mb-2 mt-3">
                    Keine Keyframes vorhanden
                </p>
            )}
        </div>
    );
}

function KeyframeComponent({
    keyframe,
    handleRemoveKeyframe,
    handleJumpToTime,
    getIdForKeyframe,
}: {
    keyframe: PositionKeyFrame | ColorKeyFrame;
    handleRemoveKeyframe: (keyframe: PositionKeyFrame | ColorKeyFrame) => void;
    handleJumpToTime: (keyframe: PositionKeyFrame | ColorKeyFrame) => void;
    getIdForKeyframe: (
        keyframe: PositionKeyFrame | ColorKeyFrame,
    ) => number | undefined;
}) {
    return (
        <Card className="mb-2">
            <Card.Body className="p-2 d-flex align-items-center justify-content-between">
                <div className="flex-grow-1 d-flex align-items-center gap-2">
                    {keyframe instanceof ColorKeyFrame && (
                        <div
                            style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "4px",
                                backgroundColor: `#${keyframe.getColor().getHexString()}`,
                                border: "1px solid var(--bs-secondary)",
                            }}
                        />
                    )}

                    <div>
                        <div
                            className="small text-info fw-bold"
                            onClick={() => handleJumpToTime(keyframe)}
                            style={{ cursor: "pointer" }}
                        >
                            {keyframe.getTime().toFixed(1)}s
                        </div>

                        <div className="small text-muted">
                            {getIdForKeyframe(keyframe) !== undefined
                                ? "ID: " + getIdForKeyframe(keyframe)
                                : "Keine ID"}{" "}
                            •{" "}
                            {keyframe instanceof ColorKeyFrame && (
                                <>
                                    [{keyframe.getColor().r.toFixed(2)},{" "}
                                    {keyframe.getColor().g.toFixed(2)},{" "}
                                    {keyframe.getColor().b.toFixed(2)}] • #
                                    {keyframe
                                        .getColor()
                                        .getHexString()
                                        .toUpperCase()}
                                </>
                            )}
                            {keyframe instanceof PositionKeyFrame && (
                                <>
                                    [{keyframe.getPos().x.toFixed(1)},{" "}
                                    {keyframe.getPos().y.toFixed(1)},{" "}
                                    {keyframe.getPos().z.toFixed(1)}]
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                        handleRemoveKeyframe(keyframe);
                    }}
                    title="Löschen"
                >
                    <i className="bi bi-trash" />
                </button>
            </Card.Body>
        </Card>
    );
}

function KeyframeEditorComponent({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <TitleComponent title={title} />
            <Card>
                <Card.Body className="d-flex flex-column gap-3">
                    {children}
                </Card.Body>
            </Card>
        </div>
    );
}

function TitleComponent({ title }: { title: string }) {
    return <h6 className="fw-bold text-uppercase text-xs mb-3">{title}</h6>;
}

function AddKeyframeComponent({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="btn btn-info w-100 mb-2 text-white"
            onClick={onClick}
        >
            <i className="bi bi-pencil me-2" />
            Keyframe hinzufügen
        </button>
    );
}

function PositionInputComponent({
    title,
    currentValue,
    onChangePosition,
}: {
    title: string;
    currentValue: number;
    onChangePosition: (value: number) => void;
}) {
    return (
        <Form.Group>
            <Form.Label className="small">{title}</Form.Label>
            <Form.Control
                type="number"
                step="0.1"
                size="sm"
                value={currentValue}
                onChange={(e) =>
                    onChangePosition(parseFloat(e.target.value) || 0)
                }
                className="border-secondary"
            />
        </Form.Group>
    );
}

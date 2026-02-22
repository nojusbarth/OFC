import { useEffect, useRef, useState } from "react";
import { Color, Vector3 } from "three";
import { ColorKeyFrame } from "../../../../repository/entity/ColorKeyFrame";
import { PositionKeyFrame } from "../../../../repository/entity/PositionKeyFrame";
import { Card, Form } from "react-bootstrap";
import { IUndoableController } from "../../../../controller/interface/IUndoableController";
import { toolTipps } from "../../config";
import { ITimeController } from "../../../../controller/interface/ITimeController";
import { KeyframeSection } from "./KeyframeSection";
import { ColorSection } from "./ColorSection";
import { PositionSection } from "./PositionSection";

// Die Klasse wurde zu Teilen mit Hilfe von KI generiert
/**
 * Erstellt eine Drone Editor Komponente auf der der Nutzer für die aktuell ausgewählten Drohnen Keyframes setzen und entfernen kann
 * @param props
 * @param props.controller - Stellt den Controller mit Zugriff auf die Logik bereit
 * @returns JSX-Element der Drone Editor Komponente
 */
export function DroneEditorComponent({
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
  /* ---------- Referenced Variables ---------- */

  const positionKeyframeToId = useRef<Map<PositionKeyFrame, number>>(new Map());
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
      const currentPositionKeyframes = controller.getPositionKeyFrames(droneId);
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

  const handleRemoveKeyframe = (keyframe: PositionKeyFrame | ColorKeyFrame) => {
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

  return (
    <Card
      className="d-flex flex-column h-100 w-100 
            rounded-0 border-2 border-secondary border-end-0 border-top-0 border-bottom-0"
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-light border-bottom">
        <span className="fw-bold">Aktionen</span>
        {/* Selected Drones Info */}
        <div className="text-muted small">
          {selectedDrones.length}{" "}
          {selectedDrones.length == 1 ? "Drohne" : "Drohnen"} ausgewählt
        </div>
        <div className="d-flex gap-2">
          <button
            title={toolTipps.PROJECT_UNDO}
            className="btn btn-primary btn-sm d-flex gap-2"
            onClick={() => {
              controller.undo();
            }}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
          <button
            title={toolTipps.PROJECT_REDO}
            className="btn btn-primary btn-sm d-flex gap-2"
            onClick={() => {
              controller.redo();
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </Card.Header>

      {/* Content */}
      <Card.Body className="d-flex flex-column overflow-y-auto p-3 gap-3">
        {selectedDrones.length == 1 && (
          <PositionSection
            position={position}
            setPosition={setPosition}
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {selectedDrones.length > 0 && (
          <>
            <ColorSection
              color={color}
              setColor={setColor}
              selectedDrones={selectedDrones}
              controller={controller}
            />

            {selectedDrones.length === 1 && (
              <KeyframeSection
                positionKeyframes={positionKeyframes}
                colorKeyframes={colorKeyframes}
                getIdForKeyframe={getIdForKeyframe}
                handleRemoveKeyframe={handleRemoveKeyframe}
                handleJumpToTime={handleJumpToTime}
              />
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

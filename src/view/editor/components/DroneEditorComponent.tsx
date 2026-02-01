import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { Color } from "three";
import { IController } from "../../../controller/interface/IController";
import { ColorKeyFrame } from "../../../repository/entity/ColorKeyFrame";
import { PositionKeyFrame } from "../../../repository/entity/PositionKeyFrame";
import { Card, Form, Button } from "react-bootstrap";

interface DroneEditorComponentProps {
  // Props
  controller: IController;
}

export default function DroneEditorComponent({
  controller,
}: DroneEditorComponentProps) {
  // State Hooks
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

  // Register Event Handlers
  useEffect(() => {
    // Define Functions
    const onSelectionChange = () => {
      setSelectedDrones(controller.getSelectedDrones());
      updateKeyframes();
    };

    const onDroneKeyframeChange = (droneId: number) => {
      updateKeyframes();
    };

    // Register Events
    controller.getDroneSelectEvent().register(onSelectionChange);
    for (const droneId of selectedDrones) {
      controller.getDroneChangedEvent().register(onDroneKeyframeChange);
    }

    return () => {
      // Remove Events
      controller.getDroneSelectEvent().remove(onSelectionChange);
      for (const droneId of selectedDrones) {
        controller.getDroneChangedEvent().remove(onDroneKeyframeChange);
      }
    };
  }, [selectedDrones, controller]);

  // Helper functions
  function updateKeyframes() {
    const positionKeyframes: Array<PositionKeyFrame> =
      new Array<PositionKeyFrame>();
    const colorKeyframes: Array<ColorKeyFrame> = new Array<ColorKeyFrame>();

    controller.getDrones().forEach((droneId) => {
      positionKeyframes.push(...controller.getPositionKeyFrames(droneId));
      colorKeyframes.push(...controller.getColorKeyFrames(droneId));
    });

    setPositionKeyframes(positionKeyframes);
    setColorKeyframes(colorKeyframes);
  }

  // Click handlers
  const handlePositionChange = (axis: "x" | "y" | "z", value: number) => {
    const newPosition = position.clone();
    newPosition[axis] = value;
    setPosition(newPosition);
  };

  const handleColorChange = (hexColor: string) => {
    setColor(new Color(hexColor));
  };

  const handleAddPositionKeyframe = () => {
    const time: number = controller.getTimeController().getTime();
    selectedDrones.forEach((droneId) => {
      controller.addPositionKeyFrame(
        droneId,
        new PositionKeyFrame(position, time),
      );
    });
  };

  const handleAddColorKeyframe = () => {
    const time: number = controller.getTimeController().getTime();
    selectedDrones.forEach((droneId) => {
      controller.addColorKeyFrame(droneId, new ColorKeyFrame(color, time));
    });
  };

  return (
    <Card className="d-flex flex-column h-100 w-100 rounded-0 border-2 border-secondary border-end-0 border-top-0 border-bottom-0">
      {/* Heading */}
      <Card.Header className="bg-light border-bottom flex-shrink-0">
        <span className="fw-bold">Aktionen</span>
      </Card.Header>

      {/* Content */}
      <Card.Body className="p-3 flex-grow-1 overflow-y-auto">
        {/* Selected Drones Info */}
        <div className="mb-3 text-muted small">
          <i className="bi bi-info-circle me-2" />
          {selectedDrones.length} Drohne(n) ausgewählt
        </div>

        {/* Position Section */}
        <div className="mb-4">
          <h6 className="fw-bold text-uppercase mb-3">Position Setzen</h6>

          <div className="row g-2 mb-3">
            <div className="col-4">
              <Form.Group>
                <Form.Label className="small">X</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={position.x}
                  onChange={(e) =>
                    handlePositionChange("x", parseFloat(e.target.value) || 0)
                  }
                  className="border-secondary"
                />
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group>
                <Form.Label className="small">Y</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={position.y}
                  onChange={(e) =>
                    handlePositionChange("y", parseFloat(e.target.value) || 0)
                  }
                  className="border-secondary"
                />
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group>
                <Form.Label className="small">Z</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={position.z}
                  onChange={(e) =>
                    handlePositionChange("z", parseFloat(e.target.value) || 0)
                  }
                  className="border-secondary"
                />
              </Form.Group>
            </div>
          </div>

          <button
            className="btn btn-info w-100 mb-2"
            onClick={handleAddPositionKeyframe}
            disabled={selectedDrones.length === 0}
          >
            <i className="bi bi-pencil me-2" />
            Keyframe hinzufügen
          </button>
        </div>

        {/* Color Section */}
        <div className="mb-4">
          <h6 className="fw-bold text-uppercase mb-3">Farbe Setzen</h6>

          <Form.Group className="mb-3">
            <Form.Label className="small">LED-Farbe wählen</Form.Label>
            <div
              className="rounded border border-2 border-secondary p-2"
              style={{
                backgroundColor: `#${color.getHexString()}`,
                height: "40px",
                cursor: "pointer",
              }}
            >
              <input
                type="color"
                value={`#${color.getHexString()}`}
                onChange={(e) => handleColorChange(e.target.value)}
                className="invisible"
                style={{ cursor: "pointer" }}
              />
            </div>
          </Form.Group>

          <button
            className="btn btn-info w-100 mb-2 text-white"
            onClick={handleAddColorKeyframe}
            disabled={selectedDrones.length === 0}
          >
            <i className="bi bi-pencil me-2" />
            Keyframe hinzufügen
          </button>
        </div>

        {/* Keyframe Manager */}
        <div className="border-top pt-3">
          <button
            className="btn btn-link text-decoration-none text-dark fw-bold p-0 w-100 text-start"
            onClick={() => setShowKeyframes(!showKeyframes)}
          >
            <i className={`bi bi-pencil-square me-2`} />
            KEYFRAME MANAGER
            <i
              className={`bi bi-chevron-${
                showKeyframes ? "up" : "down"
              } float-end`}
            />
          </button>

          {showKeyframes && (
            <div className="mt-3 ps-3 border-start border-secondary">
              <p className="text-muted small mb-2">Keine Keyframes vorhanden</p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

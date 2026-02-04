import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { Color } from "three";
import { IController } from "../../../controller/interface/IController";
import { ColorKeyFrame } from "../../../repository/entity/ColorKeyFrame";
import { PositionKeyFrame } from "../../../repository/entity/PositionKeyFrame";
import { Card, Form, Button } from "react-bootstrap";

interface DroneEditorComponentProps {
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
      const newSelectedDrones = controller.getSelectedDrones();

      // Update Color and Position if no drones were previously selected
      if (selectedDrones.length == 0 && newSelectedDrones.length != 0) {
        setPosition(controller.getPosition(newSelectedDrones[0]));
        setColor(new Color(controller.getColor(newSelectedDrones[0])));
      }

      setSelectedDrones(new Array<number>(...newSelectedDrones)); //TODO Im Controller anders ausgeben?
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

    setPositionKeyframes(new Array<PositionKeyFrame>(...positionKeyframes));
    setColorKeyframes(new Array<ColorKeyFrame>(...colorKeyframes));

    //TODO
    console.log("Updated Keyframes:");
    console.log("Position Keyframes:", positionKeyframes);
    console.log("Color Keyframes:", colorKeyframes);
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
    <Card
      className="d-flex flex-column h-100 w-100 
    rounded-0 border-2 border-secondary border-end-0 border-top-0 border-bottom-0"
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-light border-bottom">
        <span className="fw-bold">Aktionen</span>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm d-flex gap-2"
            onClick={() => {}} //TODO Implementieren
          >
            <i className="bi bi-caret-left" />
          </button>
          <button
            className="btn btn-primary btn-sm d-flex gap-2"
            onClick={() => {}} //TODO Implementieren
          >
            <i className="bi bi-caret-right" />
          </button>
        </div>
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
          <h6 className="fw-bold text-uppercase text-xs mb-3">
            Position Setzen
          </h6>
          <Card>
            <Card.Body>
              <div className="row g-2 mb-3">
                <div className="col-4">
                  <Form.Group>
                    <Form.Label className="small">X</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      size="sm"
                      value={position.x}
                      onChange={(e) =>
                        handlePositionChange(
                          "x",
                          parseFloat(e.target.value) || 0,
                        )
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
                      step="0.1"
                      size="sm"
                      value={position.y}
                      onChange={(e) =>
                        handlePositionChange(
                          "y",
                          parseFloat(e.target.value) || 0,
                        )
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
                      step="0.1"
                      size="sm"
                      value={position.z}
                      onChange={(e) =>
                        handlePositionChange(
                          "z",
                          parseFloat(e.target.value) || 0,
                        )
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
            </Card.Body>
          </Card>
        </div>

        {selectedDrones.length > 0 && (
          <>
            {/* Color Section */}
            <div className="mb-4">
              <h6 className="fw-bold text-uppercase text-xs mb-3">
                Farbe Setzen
              </h6>

              <Form.Group className="mb-3">
                <Form.Label className="small">LED-Farbe wählen</Form.Label>
                <input
                  type="color"
                  value={`#${color.getHexString()}`}
                  onChange={(e) => handleColorChange(e.target.value)}
                  style={{
                    cursor: "pointer",
                    height: "40px",
                    width: "100%",
                  }}
                />
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

              {/* Keyframe List */}
              {showKeyframes && (
                <div className="mt-3">
                  {/* Position Keyframes */}
                  {positionKeyframes.length > 0 && (
                    <div className="mb-3">
                      <div className="text-muted small mb-2">
                        Position Keyframes
                      </div>
                      {positionKeyframes.map((keyframe, index) => (
                        <Card key={`pos-${index}`} className="mb-2">
                          <Card.Body className="p-2 d-flex align-items-center justify-content-between">
                            <div className="flex-grow-1">
                              <div className="small text-info fw-bold">
                                {keyframe.getTime().toFixed(1)}s
                              </div>
                              <div className="small text-muted">
                                Position • [{keyframe.getPos().x.toFixed(1)},{" "}
                                {keyframe.getPos().y.toFixed(1)},{" "}
                                {keyframe.getPos().z.toFixed(1)}]
                              </div>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                selectedDrones.forEach((droneId) => {
                                  controller.removePositionKeyFrame(
                                    droneId,
                                    keyframe,
                                  );
                                });
                              }}
                              title="Löschen"
                            >
                              <i className="bi bi-trash" />
                            </button>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Color Keyframes */}
                  {colorKeyframes.length > 0 && (
                    <div className="mb-3">
                      <div className="text-muted small mb-2">
                        Color Keyframes
                      </div>
                      {colorKeyframes.map((keyframe, index) => (
                        <Card key={`col-${index}`} className="mb-2">
                          <Card.Body className="p-2 d-flex align-items-center justify-content-between">
                            <div className="flex-grow-1 d-flex align-items-center gap-2">
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "4px",
                                  backgroundColor: `#${keyframe.getColor().getHexString()}`,
                                  border: "1px solid #ddd",
                                }}
                              />
                              <div>
                                <div className="small text-info fw-bold">
                                  {keyframe.getTime().toFixed(1)}s
                                </div>
                                <div className="small text-muted">
                                  Farbe • [{keyframe.getColor().r.toFixed(2)},{" "}
                                  {keyframe.getColor().g.toFixed(2)},{" "}
                                  {keyframe.getColor().b.toFixed(2)}] • #
                                  {keyframe
                                    .getColor()
                                    .getHexString()
                                    .toUpperCase()}
                                  ff
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                selectedDrones.forEach((droneId) => {
                                  controller.removeColorKeyFrame(
                                    droneId,
                                    keyframe,
                                  );
                                });
                              }}
                              title="Löschen"
                            >
                              <i className="bi bi-trash" />
                            </button>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* No Keyframes */}
                  {positionKeyframes.length === 0 &&
                    colorKeyframes.length === 0 && (
                      <p className="text-muted small mb-2 mt-3">
                        Keine Keyframes vorhanden
                      </p>
                    )}
                </div>
              )}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

import { Color, Vector3 } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import {
  AddKeyframeComponent,
  KeyframeEditorComponent,
} from "../SharedComponents";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";

export function WaveLinearSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [waveColor, setWaveColor] = useState<Color>(new Color(0x00a3ff));
  const [wavelength, setWavelength] = useState<number>(2);
  const [startPosition, setStartPosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const [startPositionInput, setStartPositionInput] = useState<{
    x: string;
    y: string;
    z: string;
  }>({
    x: "0",
    y: "0",
    z: "0",
  });
  const [direction, setDirection] = useState<Vector3>(new Vector3(1, 0, 0));
  const [directionInput, setDirectionInput] = useState<{ x: string; y: string; z: string }>({
    x: "1",
    y: "0",
    z: "0",
  });
  const [directionInvalid, setDirectionInvalid] = useState<{
    x: boolean;
    y: boolean;
    z: boolean;
  }>({
    x: false,
    y: false,
    z: false,
  });
  const [speed, setSpeed] = useState<number>(1);

  const clamp = (value: number, min: number, max: number): number => {
    return Math.min(max, Math.max(min, value));
  };

  const parseAndClamp = (
    raw: string,
    fallback: number,
    min: number,
    max: number,
  ): number => {
    const parsed = Number.parseFloat(raw);
    if (Number.isNaN(parsed)) return fallback;
    return clamp(parsed, min, max);
  };

  const handleWaveColorChange = (hexColor: string) => {
    setWaveColor(new Color(hexColor));
  };

  const handleStartPositionChange = (
    axis: "x" | "y" | "z",
    rawValue: string,
  ) => {
    setStartPositionInput((prev) => ({ ...prev, [axis]: rawValue }));

    const parsed = Number.parseFloat(rawValue);
    if (Number.isNaN(parsed)) return;

    const newStartPosition = startPosition.clone();
    newStartPosition[axis] = parsed;
    setStartPosition(newStartPosition);
  };

  const handleStartPositionBlur = (axis: "x" | "y" | "z") => {
    const rawValue = startPositionInput[axis];
    const parsed = Number.parseFloat(rawValue);

    if (Number.isNaN(parsed)) {
      setStartPositionInput((prev) => ({
        ...prev,
        [axis]: startPosition[axis].toString(),
      }));
      return;
    }

    setStartPositionInput((prev) => ({ ...prev, [axis]: parsed.toString() }));
  };

  const handleDirectionChange = (axis: "x" | "y" | "z", rawValue: string) => {
    setDirectionInput((prev) => ({ ...prev, [axis]: rawValue }));

    const parsed = Number.parseFloat(rawValue);
    const isValid = !Number.isNaN(parsed) && parsed >= -1 && parsed <= 1;

    setDirectionInvalid((prev) => ({ ...prev, [axis]: !isValid }));

    if (isValid) {
      const newDirection = direction.clone();
      newDirection[axis] = parsed;
      setDirection(newDirection);
    }
  };

  const handleDirectionBlur = (axis: "x" | "y" | "z") => {
    const rawValue = directionInput[axis];
    const parsed = Number.parseFloat(rawValue);

    if (Number.isNaN(parsed)) {
      setDirectionInput((prev) => ({ ...prev, [axis]: direction[axis].toString() }));
      setDirectionInvalid((prev) => ({ ...prev, [axis]: false }));
      return;
    }

    const clamped = clamp(parsed, -1, 1);
    const newDirection = direction.clone();
    newDirection[axis] = clamped;
    setDirection(newDirection);

    setDirectionInput((prev) => ({ ...prev, [axis]: clamped.toString() }));
    setDirectionInvalid((prev) => ({ ...prev, [axis]: false }));
  };

  const handleAddColorKeyframe = () => {
    if (selectedDrones.length === 0) return;

    const safeSpeed = Math.max(0.1, speed);
    const safeWavelength = Math.max(0.1, wavelength);
    const waveDuration = safeWavelength / safeSpeed;

    const propagationDirection = direction.clone();
    if (propagationDirection.lengthSq() < 1e-8) {
      // Ohne Richtung kann keine Ausbreitung berechnet werden.
      return;
    }
    propagationDirection.normalize();

    const startTime = controller.getTimeController().getTime();

    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      const dronePosition = controller.getPosition(droneId);
      const relativePosition = dronePosition.clone().sub(startPosition);

      // Projektion auf den Ausbreitungsvektor: Distanz zur orthogonalen Wellenebene.
      const projectedDistance = relativePosition.dot(propagationDirection);

      // Drohnen "hinter" der Start-Ebene werden von einer nur vorwaerts laufenden Welle nicht getroffen.
      if (projectedDistance < 0) return;

      const arrivalTime = startTime + projectedDistance / safeSpeed;
      const restoreTime = arrivalTime + waveDuration;

      const originalColorAtArrival = new Color(
        controller.getColorAt(droneId, arrivalTime),
      );

      controller.addColorKeyFrame(
        droneId,
        new ColorKeyFrame(waveColor.clone(), arrivalTime),
      );
      controller.addColorKeyFrame(
        droneId,
        new ColorKeyFrame(originalColorAtArrival, restoreTime),
      );
    });
    controller.endBatching();
  };

  return ( 
    <KeyframeEditorComponent title="Welle konfigurieren">
      <div>
        <label className="small">Wellen-Farbe</label>
        <input
          id="drone-wave-color-input"
          type="color"
          value={`#${waveColor.getHexString()}`}
          onInput={(e) => handleWaveColorChange((e.target as HTMLInputElement).value)}
          onChange={(e) => handleWaveColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      <Form.Group>
        <Form.Label className="small">Wellenlänge (m)</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0.1}
          max={20}
          step={0.1}
          value={wavelength}
          onChange={(e) =>
            setWavelength(parseAndClamp(e.target.value, wavelength, 0.1, 20))
          }
          className="border-secondary"
        />
        <Form.Text className="text-muted">0.1-20 m</Form.Text>
      </Form.Group>

      <div>
        <Form.Label className="small">Startposition der Welle (X, Y, Z)</Form.Label>
        <div className="d-flex align-items-center gap-2">
          <Form.Group className="w-100">
            <Form.Label className="small">X Start</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              step={0.1}
              value={startPositionInput.x}
              onChange={(e) => handleStartPositionChange("x", e.target.value)}
              onBlur={() => handleStartPositionBlur("x")}
              className="border-secondary"
            />
          </Form.Group>

          <Form.Group className="w-100">
            <Form.Label className="small">Y Start</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              step={0.1}
              value={startPositionInput.y}
              onChange={(e) => handleStartPositionChange("y", e.target.value)}
              onBlur={() => handleStartPositionBlur("y")}
              className="border-secondary"
            />
          </Form.Group>

          <Form.Group className="w-100">
            <Form.Label className="small">Z Start</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              step={0.1}
              value={startPositionInput.z}
              onChange={(e) => handleStartPositionChange("z", e.target.value)}
              onBlur={() => handleStartPositionBlur("z")}
              className="border-secondary"
            />
          </Form.Group>
        </div>
      </div>

      <div>
        <Form.Label className="small">Wellenrichtung (X, Y, Z)</Form.Label>
        <div className="d-flex align-items-center gap-2">
          <Form.Group className="w-100">
            <Form.Label className="small">X Dir</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              min={-1}
              max={1}
              step={0.1}
              value={directionInput.x}
              onChange={(e) => handleDirectionChange("x", e.target.value)}
              onBlur={() => handleDirectionBlur("x")}
              isInvalid={directionInvalid.x}
              className="border-secondary"
            />
          </Form.Group>

          <Form.Group className="w-100">
            <Form.Label className="small">Y Dir</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              min={-1}
              max={1}
              step={0.1}
              value={directionInput.y}
              onChange={(e) => handleDirectionChange("y", e.target.value)}
              onBlur={() => handleDirectionBlur("y")}
              isInvalid={directionInvalid.y}
              className="border-secondary"
            />
          </Form.Group>

          <Form.Group className="w-100">
            <Form.Label className="small">Z Dir</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              min={-1}
              max={1}
              step={0.1}
              value={directionInput.z}
              onChange={(e) => handleDirectionChange("z", e.target.value)}
              onBlur={() => handleDirectionBlur("z")}
              isInvalid={directionInvalid.z}
              className="border-secondary"
            />
          </Form.Group>
        </div>
        <Form.Text className="text-muted">
          Ausbreitung im Raum (-1 bis 1 pro Achse)
        </Form.Text>
      </div>

      <Form.Group>
        <Form.Label className="small">Geschwindigkeit (m/s)</Form.Label>
        <Form.Control
          type="number"
          size="sm"
          min={0.1}
          max={50}
          step={0.1}
          value={speed}
          onChange={(e) => setSpeed(parseAndClamp(e.target.value, speed, 0.1, 50))}
          className="border-secondary"
        />
        <Form.Text className="text-muted">0.1-50 m/s</Form.Text>
      </Form.Group>

      <AddKeyframeComponent onClick={handleAddColorKeyframe} />
    </KeyframeEditorComponent>
  );
}
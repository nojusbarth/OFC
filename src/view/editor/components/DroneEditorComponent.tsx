import { useState } from "react";
import { Vector3 } from "three";
import { Color } from "three";

interface DroneEditorComponentProps {
  // Props
  // TODO
}

export default function DroneEditorComponent({}: DroneEditorComponentProps) {
  // State Hooks
  const [selectedDrones, setSelectedDrones] = useState<Array<number>>([]);
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const [color, setColor] = useState<Color>(new Color(0, 0, 0));
  const [positionKeyframes, setPositionKeyframes] = useState<null>(null); // TODO
  const [colorKeyframes, setColorKeyframes] = useState<null>(null); // TODO

  return <div>Drone Editor Component</div>;
}

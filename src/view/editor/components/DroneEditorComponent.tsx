import { useState } from "react";
import { Vector3 } from "three";
import { Color } from "three";
import { IController } from "../../../controller/interface/IController";

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
  const [positionKeyframes, setPositionKeyframes] = useState<null>(null); // TODO
  const [colorKeyframes, setColorKeyframes] = useState<null>(null); // TODO

  return (
    <div className="bg-secondary text-light p-3 h-100 border-start border-dark">
      DroneEditor
    </div>
  );
}

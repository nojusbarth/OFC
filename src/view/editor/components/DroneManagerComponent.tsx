import { useState } from "react";
import { Color } from "three";

interface DroneManagerComponentProps {
  // Props
  // TODO
}

export default function DroneManagerComponent({}: DroneManagerComponentProps) {
  // State Hooks
  const [allDrones, setAllDrones] = useState<Array<number>>([]);
  const [selectedDrones, setSelectedDrones] = useState<Array<number>>([]);
  const [collidingDrones, setCollidingDrones] = useState<Array<number>>([]);
  const [colors, setColors] = useState<Map<number, Color>>(new Map());

  return <div>Drone Manager Component</div>;
}

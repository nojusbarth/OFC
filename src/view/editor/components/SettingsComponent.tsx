import { useState } from "react";

interface SettingsComponentProps {
  // Props
  // TODO
}

export default function SettingsComponent({}: SettingsComponentProps) {
  // State Hooks
  const [dayTime, setDayTime] = useState<null>(null); // TODO
  const [collisionRadius, setCollisionRadius] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(60);

  return <div>Settings Component</div>;
}

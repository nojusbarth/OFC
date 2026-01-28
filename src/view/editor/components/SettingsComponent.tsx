import { useState } from "react";
import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";

interface SettingsComponentProps {
  // Props
  settings: ISettings;
  timeController: ITimeController;
  toggleStartpage: () => void;
}

export default function SettingsComponent({
  toggleStartpage,
}: SettingsComponentProps) {
  // State Hooks
  const [dayTime, setDayTime] = useState<null>(null); // TODO
  const [collisionRadius, setCollisionRadius] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(60);

  return (
    <div className="bg-secondary text-light p-2 border-start border-dark h-100">
      Settings
    </div>
  );
}

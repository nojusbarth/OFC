import { useState } from "react";
import { ISettings } from "../../../controller/interface/ISettings";
<<<<<<< HEAD
import { ITimeController } from "../../../controller/interface/ITimeController";

interface SettingsComponentProps {
  // Props
  settings: ISettings;
  timeController: ITimeController;
=======

interface SettingsComponentProps {
  // Props TODO
  // settings : ISettings;
  // timeController: ITimeController;
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
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

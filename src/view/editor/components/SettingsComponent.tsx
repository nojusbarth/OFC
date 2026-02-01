import { useState } from "react";
import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";
import { DayTime } from "../../../repository/entity/DayTime";

interface SettingsComponentProps {
  // Props
  settings: ISettings;
  timeController: ITimeController;
  toggleStartpage: () => void;
}

export default function SettingsComponent({
  settings,
  timeController,
  toggleStartpage,
}: SettingsComponentProps) {
  // State Hooks
  const [dayTime, setDayTime] = useState<DayTime>(settings.getDayTime());
  const [collisionRadius, setCollisionRadius] = useState<number>(
    settings.getDroneDistance(),
  );
  const [endTime, setEndTime] = useState<number>(settings.getEndTime());

  return (
    <button
      onClick={toggleStartpage}
      className="btn btn-light d-flex align-items-center h-100 w-100 rounded-0 border-2 border-end-0 border-top-0 border-secondary p-3 gap-2"
    >
      <i className="bi bi-gear-fill" />
      <span className="fw-bold">Einstellungen</span>
    </button>
  );
}

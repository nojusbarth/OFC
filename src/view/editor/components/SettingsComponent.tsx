import { useState } from "react";
import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";
import { DayTime } from "../../../repository/entity/DayTime";
import { IController } from "../../../controller/interface/IController";
import { Card } from "react-bootstrap";

interface SettingsComponentProps {
  controller: IController;
  toggleStartpage: () => void;
}

export default function SettingsComponent({
  controller,
  toggleStartpage,
}: SettingsComponentProps) {
  // Used Controllers
  const settings: ISettings = controller.getSettings();
  const timeController: ITimeController = controller.getTimeController();

  // State Hooks
  const [dayTime, setDayTime] = useState<DayTime>(settings.getDayTime());
  const [collisionRadius, setCollisionRadius] = useState<number>(
    settings.getDroneDistance(),
  );
  const [endTime, setEndTime] = useState<number>(settings.getEndTime());

  return (
    <Card
      className="d-flex flex-column h-100 w-100
      rounded-0 border-2 border-secondary border-end-0 border-top-0 border-bottom-0"
    >
      <Card.Header className="bg-light border-bottom">
        <span className="fw-bold">Einstellungen</span>
      </Card.Header>

      {/* Content */}
      <Card.Body className="p-3 flex-grow-1 overflow-y-auto">
        Einstellungen kommen bald!
      </Card.Body>
    </Card>
  );
}

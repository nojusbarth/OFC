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
        {/* Projekt Section */}
        <div className="mb-4">
          <h6 className="text-primary mb-3">
            <i className="bi bi-gear me-2"></i>
            Projekt
          </h6>

          {/* Tageszeit */}
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-start gap-2 mb-2">
                <i className="bi bi-sun text-primary"></i>
                <div className="flex-grow-1">
                  <div className="fw-bold">Tageszeit</div>
                  <small className="text-muted">
                    Beleuchtung im 3D-Viewport
                  </small>
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button
                  className={`btn flex-fill ${dayTime === DayTime.SUNSET ? "btn-info" : "btn-outline-secondary"}`}
                  onClick={() => {
                    setDayTime(DayTime.SUNSET);
                    settings.setDayTime(DayTime.SUNSET);
                  }}
                >
                  <i className="bi bi-sun me-1"></i>
                  Tag
                </button>
                <button
                  className={`btn flex-fill ${dayTime === DayTime.NOON ? "btn-info" : "btn-outline-secondary"}`}
                  onClick={() => {
                    setDayTime(DayTime.NOON);
                    settings.setDayTime(DayTime.NOON);
                  }}
                >
                  <i className="bi bi-sunset me-1"></i>
                  Dämmerung
                </button>
                <button
                  className={`btn flex-fill ${dayTime === DayTime.NIGHT ? "btn-info" : "btn-outline-secondary"}`}
                  onClick={() => {
                    setDayTime(DayTime.NIGHT);
                    settings.setDayTime(DayTime.NIGHT);
                  }}
                >
                  <i className="bi bi-moon-stars me-1"></i>
                  Nacht
                </button>
              </div>
            </Card.Body>
          </Card>

          {/* Sicherheitsabstand */}
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-start gap-2 mb-2">
                <i className="bi bi-shield-check text-primary"></i>
                <div className="flex-grow-1">
                  <div className="fw-bold">Sicherheitsabstand</div>
                  <small className="text-muted">
                    Mindestabstand zwischen Drohnen
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 mt-3">
                <input
                  type="number"
                  className="form-control"
                  value={collisionRadius}
                  min="0.1"
                  step="0.1"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setCollisionRadius(value);
                    settings.setDroneDistance(value);
                  }}
                />
                <span className="text-muted">Meter</span>
              </div>
            </Card.Body>
          </Card>

          {/* Endzeit */}
          <Card>
            <Card.Body>
              <div className="d-flex align-items-start gap-2 mb-2">
                <i className="bi bi-clock text-primary"></i>
                <div className="flex-grow-1">
                  <div className="fw-bold">Endzeit</div>
                  <small className="text-muted">
                    Gesamtdauer der Animation
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 mt-3">
                <input
                  type="number"
                  className="form-control"
                  value={endTime}
                  min="1"
                  step="1"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setEndTime(value);
                    settings.setEndTime(value);
                  }}
                />
                <span className="text-muted">Sekunden</span>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Export Section */}
        <div className="mb-4">
          <h6 className="text-primary mb-3">
            <i className="bi bi-download me-2"></i>
            Export
          </h6>

          {/* Video Export */}
          <Card className="mb-3">
            <Card.Body className="d-flex align-items-start gap-3">
              <i className="bi bi-camera-video text-primary fs-4"></i>
              <div className="flex-grow-1">
                <div className="fw-bold mb-1">Als Video exportieren</div>
                <small className="text-muted">
                  Rendert die Show als MP4-Video
                </small>
                <button className="btn btn-outline-primary w-100 mt-2">
                  <i className="bi bi-camera-video me-2"></i>
                  Video exportieren
                </button>
              </div>
            </Card.Body>
          </Card>

          {/* Waypoint Export */}
          <Card>
            <Card.Body className="d-flex align-items-start gap-3">
              <i className="bi bi-file-earmark-text text-primary fs-4"></i>
              <div className="flex-grow-1">
                <div className="fw-bold mb-1">Waypoint-Daten exportieren</div>
                <small className="text-muted">
                  Exportiert Pfade im Waypoint-at-Time Format
                </small>
                <button className="btn btn-outline-primary w-100 mt-2">
                  <i className="bi bi-file-earmark-arrow-down me-2"></i>
                  Waypoints exportieren
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
}

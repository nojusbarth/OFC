import { Container, Row, Col } from "react-bootstrap";
import DroneManagerComponent from "./components/DroneManagerComponent";
import DroneEditorComponent from "./components/DroneEditorComponent";
import TimelineComponent from "./components/TimelineComponent";
import SettingsComponent from "./components/SettingsComponent";
import { IController } from "../../controller/interface/IController";
import { JSX } from "react";
import { DRONE_EDITOR_WIDTH, DRONE_MANAGER_HEIGHT } from "./config";

interface EditorComponentProps {
  // Props
  controller: IController;
  toggleStartpage: () => void;
  viewport: JSX.Element;
}

export default function EditorComponent({
  controller,
  toggleStartpage,
  viewport,
}: EditorComponentProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `1fr ${DRONE_EDITOR_WIDTH}`,
        gridTemplateRows: `auto 1fr ${DRONE_MANAGER_HEIGHT}`,
        gridTemplateAreas: `
          "timeline settings"
          "viewport editor"
          "drones   editor"
        `,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Timeline */}
      <div style={{ gridArea: "timeline", overflow: "hidden" }}>
        <TimelineComponent
          settings={controller.getSettings()}
          timeController={controller.getTimeController()}
        />
      </div>

      {/* Settings */}
      <div style={{ gridArea: "settings", overflow: "hidden" }}>
        <SettingsComponent
          settings={controller.getSettings()}
          timeController={controller.getTimeController()}
          toggleStartpage={toggleStartpage}
        />
      </div>

      {/* Viewport */}
      <div
        style={{
          gridArea: "viewport",
          overflow: "hidden",
        }}
      >
        {viewport}
      </div>

      {/* Drone Manager */}
      <div style={{ gridArea: "drones", overflow: "hidden" }}>
        <DroneManagerComponent controller={controller} />
      </div>

      {/* Drone Editor */}
      <div style={{ gridArea: "editor", overflow: "auto" }}>
        <DroneEditorComponent controller={controller} />
      </div>
    </div>
  );
}

import { Container, Row, Col } from "react-bootstrap";
import DroneManagerComponent from "./components/DroneManagerComponent";
import DroneEditorComponent from "./components/DroneEditorComponent";
import TimelineComponent from "./components/TimelineComponent";
import SettingsComponent from "./components/SettingsComponent";
import { IController } from "../../controller/interface/IController";
import { JSX } from "react";

interface EditorComponentProps {
  // Props
  controller: IController;
  toggleStartpage: () => void;
  viewport: JSX.Element;
}

export default function EditorComponent({
  controller,
  toggleStartpage,
  viewport: Viewport,
}: EditorComponentProps) {
  /* Layout Constants */
  // Breite des DroneEditors und SettingsComponents
  const droneEditorWidth = "400px";
  const droneManagerHeight = "250px";
  const timelineHeight = "60px";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `1fr ${droneEditorWidth}`,
        gridTemplateRows: `${timelineHeight} 1fr ${droneManagerHeight}`,
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
      <div style={{ gridArea: "timeline" }}>
        <TimelineComponent
          settings={controller.getSettings()}
          timeController={controller.getTimeController()}
        />
      </div>

      {/* Settings */}
      <div style={{ gridArea: "settings" }}>
        <SettingsComponent
          settings={controller.getSettings()}
          timeController={controller.getTimeController()}
          toggleStartpage={toggleStartpage}
        />
      </div>

      {/* Viewport */}
      <div
        style={{ gridArea: "viewport", overflow: "hidden" }}
        className="border border-secondary m-2"
      >
        {Viewport}
        {/* Viewport kommt später hier */}
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

import { Container, Row, Col } from "react-bootstrap";
import DroneManagerComponent from "./components/DroneManagerComponent";
import DroneEditorComponent from "./components/DroneEditorComponent";
import TimelineComponent from "./components/TimelineComponent";
import SettingsComponent from "./components/SettingsComponent";
import { IController } from "../../controller/interface/IController";
import { JSX, useState } from "react";
import { DRONE_EDITOR_WIDTH, DRONE_MANAGER_HEIGHT } from "./config";
import SettingsButtonComponent from "./components/SettingsButtonComponent";
import { Settings } from "../../controller/logic/Settings";
import { TimeController } from "../../controller/logic/TimeController";

interface EditorComponentProps {
  controller: IController;
  toggleStartpage: () => void;
  viewport: JSX.Element;
}

export default function EditorComponent({
  controller,
  toggleStartpage,
  viewport,
}: EditorComponentProps) {
  // State Hooks
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const toggleSettingsMenu = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `1fr ${DRONE_EDITOR_WIDTH}`,
        gridTemplateRows: `auto 1fr ${DRONE_MANAGER_HEIGHT}`,
        // Wechsel zwischen Settings und Editor
        gridTemplateAreas: showSettings
          ? `
          "timeline settingsbutton"
          "viewport settings"
          "drones   settings"
        `
          : `
          "timeline settingsbutton"
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
        <TimelineComponent controller={controller} />
      </div>

      {/* SettingsButton */}
      <div style={{ gridArea: "settingsbutton", overflow: "hidden" }}>
        <SettingsButtonComponent
          showSettings={showSettings}
          toggleSettingsMenu={toggleSettingsMenu}
        />
      </div>

      {/* Viewport */}
      <div style={{ gridArea: "viewport", overflow: "hidden" }}>{viewport}</div>

      {/* Drone Manager */}
      <div style={{ gridArea: "drones", overflow: "hidden" }}>
        <DroneManagerComponent controller={controller} />
      </div>

      {/* Settings */}
      {showSettings && (
        <div style={{ gridArea: "settings", overflow: "hidden" }}>
          <SettingsComponent
            controller={controller}
            toggleStartpage={toggleStartpage}
          />
        </div>
      )}

      {/* Drone Editor */}
      {!showSettings && (
        <div style={{ gridArea: "editor", overflow: "auto" }}>
          <DroneEditorComponent controller={controller} />
        </div>
      )}
    </div>
  );
}

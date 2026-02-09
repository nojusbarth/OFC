import DroneManagerComponent from "./components/DroneManagerComponent";
import DroneEditorComponent from "./components/DroneEditorComponent";
import TimelineComponent from "./components/TimelineComponent";
import SettingsComponent from "./components/SettingsComponent";
import { JSX, useEffect, useState } from "react";
import SettingsButtonComponent from "./components/SettingsButtonComponent";
import { IUndoableController } from "../../controller/interface/IUndoableController";
import { DRONE_EDITOR_WIDTH, DRONE_MANAGER_HEIGHT } from "./config";

interface EditorComponentProps {
    controller: IUndoableController;
    toggleStartpage: () => void;
    viewport: JSX.Element;
}

export default function EditorComponent({
    controller,
    toggleStartpage,
    viewport,
}: EditorComponentProps) {
    /* ---------- Used Controllers ---------- */
    const project = controller.getProject();

    /* ---------- State Hooks ---------- */
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [recording, setRecording] = useState<boolean>(controller.getProject().getRecordingRunning());

    /* ---------- Register Events ---------- */
    useEffect(() => {

        const handleRecordingRunningChange = (isRunning: boolean) => {
            setRecording(isRunning);
        };

        project.getRecordingRunningEvent().register(handleRecordingRunningChange);

        return () => {
            project.getRecordingRunningEvent().remove(handleRecordingRunningChange);
        };
    }, [controller]);

    /* ---------- Click Handlers ---------- */
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
                    "drones   settings"`
                    : `
                    "timeline settingsbutton"
                    "viewport editor"
                    "drones   editor"`,
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            {/* Timeline */}
            <div style={{ gridArea: "timeline", overflow: "hidden" }}>
                <TimelineComponent
                    controller={controller}
                />
            </div>

            {/* SettingsButton */}
            <div style={{ gridArea: "settingsbutton", overflow: "hidden" }}>
                <SettingsButtonComponent
                    showSettings={showSettings}
                    toggleSettingsMenu={toggleSettingsMenu}
                />
            </div>

            {/* Viewport */}
            <div
                className={`${recording ? "border border-danger border-2" : ""}`}
                style={{ gridArea: "viewport", overflow: "hidden" }}
            >
                {viewport}
            </div>

            {/* Drone Manager */}
            <div style={{ gridArea: "drones", overflow: "hidden" }}>
                <DroneManagerComponent controller={controller} />
            </div>

            {/* Settings */}
            {showSettings && (
                <div
                    style={{ gridArea: "settings", overflow: "hidden" }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <SettingsComponent
                        controller={controller}
                        toggleStartpage={toggleStartpage}
                    />
                </div>
            )}

            {/* Drone Editor */}
            {!showSettings && (
                <div
                    style={{ gridArea: "editor", overflow: "auto" }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <DroneEditorComponent controller={controller} />
                </div>
            )}
        </div>
    );
}

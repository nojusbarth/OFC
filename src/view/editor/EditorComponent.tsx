import { DroneManagerComponent } from "./components/DroneManagerComponent";
import { DroneEditorComponent } from "./components/DroneEditorComponent/DroneEditorComponent";
import { TimelineComponent } from "./components/TimelineComponent";
import { SettingsComponent } from "./components/SettingsComponent";
import { JSX, useEffect, useState } from "react";
import { IUndoableController } from "../../controller/interface/IUndoableController";
import { DRONE_EDITOR_WIDTH, DRONE_MANAGER_HEIGHT, toolTipps } from "./config";
import { Card } from "react-bootstrap";

// Die Klasse wurde zu Teilen mit Hilfe von KI generiert
/**
 * Erstellt die vollständige Editor Seite als Editor Komponente und stellt das Haupt-Layout bereit
 * @param props
 * @param props.controller - Stellt den Controller mit Zugriff auf die Logik bereit
 * @param props.toggleStartpage - Funktion zum Wechsel zur Startpage
 * @param props.viewport - JSX-Element für den 3D-Viewport
 * @returns JSX-Element der Editor Seite als Komponente
 */
export function EditorComponent({
    controller,
    toggleStartpage,
    viewport,
}: {
    controller: IUndoableController;
    toggleStartpage: () => void;
    viewport: JSX.Element;
}) {
    /* ---------- Used Controllers ---------- */
    const project = controller.getProject();

    /* ---------- State Hooks ---------- */
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [recording, setRecording] = useState<boolean>(
        controller.getProject().getRecordingRunning(),
    );

    /* ---------- Register Events ---------- */
    useEffect(() => {
        const handleRecordingRunningChange = (isRunning: boolean) => {
            setRecording(isRunning);
        };

        project
            .getRecordingRunningEvent()
            .register(handleRecordingRunningChange);

        return () => {
            project
                .getRecordingRunningEvent()
                .remove(handleRecordingRunningChange);
        };
    }, [controller]);

    /* ---------- Click Handlers ---------- */
    const toggleSettingsMenu = () => {
        setShowSettings(!showSettings);
    };

    const exportProjektToFile = () => {
        project.saveProject()
    }

    const toggleStartPage = () => {
        controller.getProject().saveProjectLocally()
        toggleStartpage()
    }

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
                <TimelineComponent controller={controller} />
            </div>

            {/* SettingsButton */}
            <div style={{ gridArea: "settingsbutton", overflow: "hidden" }}>
                <Card
                    className="d-flex flex-column h-100 w-100 rounded-0 border-2 border-secondary border-top-0 border-end-0"
                >
                    <div className="rounded-0 justify-content-end border-secondary border-0 d-flex flex-row align-items-end gap-4 p-3 w-100">
                        <button
                            className="btn btn-link p-0"
                            title={toolTipps.BACK_HOME}
                            onClick={toggleStartPage}
                        >
                            <i
                                className="bi bi-house fs-2"
                                style={{ color: "black" }}
                            />
                        </button>
                        <button
                            className="btn btn-link p-0"
                            title={toolTipps.PROJECT_SAVE}
                            onClick={exportProjektToFile}
                        >
                            <i
                                className="bi bi-download fs-2"
                                style={{ color: "black" }}
                            />
                        </button>
                        <button
                            className="btn btn-link p-0"
                            title={showSettings ? toolTipps.TO_DRONE_SETTINGS : toolTipps.TO_SETTINGS}
                            onClick={toggleSettingsMenu}
                        >
                            {showSettings ? (
                                <i
                                    className="bi bi-geo fs-2"
                                    style={{ color: "black" }}
                                />
                            ) : (
                                <i className="bi bi-gear fs-2"
                                    style={{ color: "black" }} />
                            )}
                        </button>
                    </div>
                </Card>
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

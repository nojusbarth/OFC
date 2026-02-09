import React, { useState } from "react";
import { ISettings } from "../../../controller/interface/ISettings";
import { DayTime } from "../../../repository/entity/DayTime";
import { Card } from "react-bootstrap";
import { IUndoableController } from "../../../controller/interface/IUndoableController";
import { DayTimeCalculatorModal } from "./DayTimeCalculatorModal";
import { IProject } from "../../../controller/interface/IProject";
import { toolTipps } from "../config";

interface SettingsComponentProps {
    controller: IUndoableController;
    toggleStartpage: () => void;
}

export default function SettingsComponent({
    controller,
    toggleStartpage,
}: SettingsComponentProps) {
    /* ---------- Used Controllers ---------- */
    const settings: ISettings = controller.getSettings();
    const project: IProject = controller.getProject();

    /* ---------- State Hooks ---------- */
    const [dayTime, setDayTime] = useState<DayTime>(settings.getDayTime());
    const [collisionRadius, setCollisionRadius] = useState<number>(
        settings.getCollisionRadius(),
    );
    const [endTime, setEndTime] = useState<number>(settings.getEndTime());

    /* ---------- Click Handlers ---------- */
    const onChangeDayTime = (newDayTime: DayTime) => {
        setDayTime(newDayTime);
        settings.setDayTime(newDayTime);
    };

    const onChangeCollisionRadius = (newRadius: number) => {
        if (isNaN(newRadius) || newRadius < 0) {
            setCollisionRadius(0);
            return;
        }
        setCollisionRadius(newRadius);
    };

    const onChangeEndTime = (newEndTime: number) => {
        if (isNaN(newEndTime) || newEndTime < 0) {
            setEndTime(0);
            return;
        }
        setEndTime(newEndTime);
    };

    const onSaveSettings = () => {
        settings.setDayTime(dayTime);
        settings.setEndTime(endTime);
        settings.setCollisionRadius(collisionRadius);
    };

    return (
        <Card
            className="d-flex flex-column h-100 w-100
      rounded-0 border-2 border-secondary border-end-0 border-top-0 border-bottom-0"
        >
            <Card.Header className="d-flex justify-content-between align-items-center bg-light border-bottom">
                <span className="fw-bold">Einstellungen</span>
                <button
                    title= {toolTipps.PROJECT_SAVE}
                    className="btn btn-primary btn-sm d-flex gap-2"
                    onClick={onSaveSettings}
                >
                    <i className="bi bi-floppy" />
                    Speichern
                </button>
            </Card.Header>

            {/* Content */}
            <Card.Body className="d-flex flex-column flex-grow-1 overflow-y-auto gap-3">
                <GroupComponent title={"Projekt"} iconClass={"bi-globe"}>
                    <AttributeComponent
                        title={"Tageszeit"}
                        description={"Beleuchtung im 3D-Viewport"}
                        iconClass={"bi-sun"}
                    >
                        <DayTimeButtonComponent
                            currentDayTime={dayTime}
                            buttonDayTime={DayTime.NOON}
                            iconClass={"bi-sun"}
                            text={"Tag"}
                            onChangeDayTime={onChangeDayTime}
                        />
                        <DayTimeButtonComponent
                            currentDayTime={dayTime}
                            buttonDayTime={DayTime.SUNSET}
                            iconClass={"bi-sunset"}
                            text={"Dämmerung"}
                            onChangeDayTime={onChangeDayTime}
                        />
                        <DayTimeButtonComponent
                            currentDayTime={dayTime}
                            buttonDayTime={DayTime.NIGHT}
                            iconClass={"bi-moon-stars"}
                            text={"Nacht"}
                            onChangeDayTime={onChangeDayTime}
                        />
                    </AttributeComponent>

                    <AttributeComponent
                        title={"Sicherheitsabstand"}
                        description={"Mindestabstand zwischen Drohnen"}
                        iconClass={"bi-shield-check"}
                    >
                        <input
                            type="number"
                            className="form-control"
                            value={collisionRadius}
                            min="0.1"
                            step="0.1"
                            onChange={(e) => {
                                onChangeCollisionRadius(
                                    parseFloat(e.target.value),
                                );
                            }}
                        />
                        <span className="text-muted">Meter</span>
                    </AttributeComponent>

                    <AttributeComponent
                        title={"Endzeit"}
                        description={"Gesamtdauer der Animation"}
                        iconClass={"bi-clock"}
                    >
                        <input
                            type="number"
                            className="form-control"
                            value={endTime}
                            min="1"
                            step="1"
                            onChange={(e) => {
                                onChangeEndTime(parseInt(e.target.value));
                            }}
                        />
                        <span className="text-muted">Sekunden</span>
                    </AttributeComponent>
                </GroupComponent>

                <GroupComponent title={"Export"} iconClass={"bi-download"}>
                    <AttributeComponent
                        title={"Speichern"}
                        description={"Speichere das aktuelle Projekt"}
                        iconClass={"bi-save"}
                    >
                        <button
                            className="btn btn-outline-success"
                            onClick={() => {
                                project.saveProject();
                            }}
                        >
                            <i className="bi bi-save me-2"></i>
                            Speichern
                        </button>
                    </AttributeComponent>
                    <AttributeComponent
                        title={"Waypoint-Export"}
                        description={"Exportiere als Waypoint-at-Time Format"}
                        iconClass={"bi-file-earmark-text"}
                    >
                        <button
                            className="btn btn-outline-primary w-100 mt-2"
                            title={toolTipps.PROJECT_WAYPOINT_EXPORT}
                            onClick={() => {
                                project.exportWayPointData();
                            }}
                        >
                            <i className="bi bi-file-earmark-arrow-down me-2"></i>
                            Waypoints exportieren
                        </button>
                    </AttributeComponent>
                    <AttributeComponent
                        title={"Startseite anzeigen"}
                        description={"Zurück zur Startseite wechseln"}
                        iconClass={"bi-house-door"}
                    >
                        <button
                            className="btn btn-outline-secondary"
                            onClick={toggleStartpage}
                        >
                            <i className="bi bi-house-door me-2"></i>
                            Zur Startseite
                        </button>
                    </AttributeComponent>
                </GroupComponent>
            </Card.Body>
        </Card>
    );
}

function GroupComponent({
    title,
    iconClass,
    children,
}: {
    title: string;
    iconClass: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h5 className="d-flex align-items-center gap-2 mb-3 text-primary">
                <i className={`bi ${iconClass}`}></i>
                <span className="fw-bold">{title}</span>
            </h5>
            <div className="d-flex flex-column gap-3">{children}</div>
        </div>
    );
}

function AttributeComponent({
    title,
    description,
    iconClass,
    children,
}: {
    title: string;
    description: string;
    iconClass: string;
    children: React.ReactNode;
}) {
    return (
        <Card>
            <Card.Body>
                <div className="d-flex align-items-start gap-2">
                    <i className={`bi ${iconClass} fw-bold`}></i>
                    <div>
                        <div className="fw-bold">{title}</div>
                        <small className="text-muted">{description}</small>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3">
                    {children}
                </div>
            </Card.Body>
        </Card>
    );
}

function DayTimeButtonComponent({
    currentDayTime,
    buttonDayTime,
    iconClass,
    text,
    onChangeDayTime,
}: {
    currentDayTime: DayTime;
    buttonDayTime: DayTime;
    iconClass: string;
    text: string;
    onChangeDayTime: (newDayTime: DayTime) => void;
}) {
    return (
        <button
            className={`btn ${currentDayTime === buttonDayTime ? "btn-info" : "btn-outline-secondary"} d-flex flex-column flex-fill`}
            onClick={() => {
                onChangeDayTime(buttonDayTime);
            }}
        >
            <i className={`bi ${iconClass}`} />
            {text}
        </button>
    );
}

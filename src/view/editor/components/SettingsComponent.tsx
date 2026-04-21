import React, { useState } from "react";
import { ISettings } from "../../../controller/interface/ISettings";
import { DayTime } from "../../../repository/entity/DayTime";
import { Card } from "react-bootstrap";
import { IUndoableController } from "../../../controller/interface/IUndoableController";
import { IProject } from "../../../controller/interface/IProject";
import { toolTipps } from "../config";
import { DayTimeCalculatorModal } from "./DayTimeCalculatorModal";
import { useTranslation } from "react-i18next";

// Die Klasse wurde zu Teilen mit Hilfe von KI generiert
/**
 * Erstellt eine Settings Komponente auf der der Nutzer alle Einstellungen über das Projekt vornehmen kann
 * @param props
 * @param props.controller - Stellt den Controller mit Zugriff auf die Logik bereit
 * @param props.toggleStartpage - Funktion zum Wechsel zur Startpage
 * @returns JSX-Element der Settings Komponente
 */
export function SettingsComponent({
    controller,
    toggleStartpage,
}: {
    controller: IUndoableController;
    toggleStartpage: () => void;
}) {
    const { t } = useTranslation();
    /* ---------- Used Controllers ---------- */
    const settings: ISettings = controller.getSettings();
    const project: IProject = controller.getProject();

    /* ---------- State Hooks ---------- */
    const [dayTime, setDayTime] = useState<DayTime>(settings.getDayTime());
    const [collisionRadius, setCollisionRadius] = useState<number>(
        settings.getCollisionRadius(),
    );
    const [endTime, setEndTime] = useState<number>(settings.getEndTime());
    const [isSunCalculatorOpen, setIsSunCalculatorOpen] =
        useState<boolean>(false);

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
                <span className="fw-bold">{t("editor.settings.title")}</span>
                <button
                    title={t(toolTipps.PROJECT_SAVE)}
                    className="btn btn-primary btn-sm d-flex gap-2"
                    onClick={onSaveSettings}
                >
                    <i className="bi bi-floppy" />
                    {t("common.save")}
                </button>
            </Card.Header>

            {/* Content */}
            <DayTimeCalculatorModal
                show={isSunCalculatorOpen}
                onHide={() => setIsSunCalculatorOpen(false)}
                onResult={onChangeDayTime}
            />
            <Card.Body className="d-flex flex-column flex-grow-1 overflow-y-auto gap-4">
                <GroupComponent title={t("editor.settings.groups.project")} iconClass={"bi-globe"}>
                    <AttributeComponent
                        title={t("editor.settings.daytime.title")}
                        description={t("editor.settings.daytime.description")}
                        iconClass={"bi-sun"}
                    >
                        <div className="d-flex flex-wrap gap-2 w-100">
                            <DayTimeButtonComponent
                                currentDayTime={dayTime}
                                buttonDayTime={DayTime.NOON}
                                iconClass={"bi-sun"}
                                text={t("dayTime.values.noon")}
                                onChangeDayTime={onChangeDayTime}
                            />
                            <DayTimeButtonComponent
                                currentDayTime={dayTime}
                                buttonDayTime={DayTime.SUNSET}
                                iconClass={"bi-sunset"}
                                text={t("dayTime.values.sunset")}
                                onChangeDayTime={onChangeDayTime}
                            />
                            <DayTimeButtonComponent
                                currentDayTime={dayTime}
                                buttonDayTime={DayTime.NIGHT}
                                iconClass={"bi-moon-stars"}
                                text={t("dayTime.values.night")}
                                onChangeDayTime={onChangeDayTime}
                            />

                            <button
                                className={`btn btn-outline-primary d-flex flex-column w-100`}
                                onClick={() => {
                                    setIsSunCalculatorOpen(true);
                                }}
                            >
                                <i className={`bi bi-calculator-fill mb-1`} />
                                {t("editor.settings.daytime.calculate")}
                            </button>
                        </div>
                    </AttributeComponent>

                    <AttributeComponent
                        title={t("editor.settings.safetyDistance.title")}
                        description={t("editor.settings.safetyDistance.description")}
                        iconClass={"bi-shield-check"}
                    >
                        <input
                            id="collision-distance-input"
                            type="number"
                            className="form-control"
                            value={collisionRadius * 2}
                            min="0.1"
                            step="0.1"
                            onChange={(e) => {
                                onChangeCollisionRadius(
                                    parseFloat(e.target.value) / 2,
                                );
                            }}
                        />
                        <span className="text-muted">{t("units.meters")}</span>
                    </AttributeComponent>

                    <AttributeComponent
                        title={t("editor.settings.endTime.title")}
                        description={t("editor.settings.endTime.description")}
                        iconClass={"bi-clock"}
                    >
                        <input
                            id="end-time-input"
                            type="number"
                            className="form-control"
                            value={endTime}
                            min="1"
                            step="1"
                            onChange={(e) => {
                                onChangeEndTime(parseInt(e.target.value));
                            }}
                        />
                        <span className="text-muted">{t("units.seconds")}</span>
                    </AttributeComponent>
                </GroupComponent>

                <GroupComponent title={t("editor.settings.groups.export")} iconClass={"bi-download"}>
                    <AttributeComponent
                        title={t("editor.settings.export.waypointTitle")}
                        description={t("editor.settings.export.waypointDescription")}
                        iconClass={"bi-file-earmark-text"}
                    >
                        <button
                            className="btn btn-outline-primary w-100 mt-2"
                            title={t(toolTipps.PROJECT_WAYPOINT_EXPORT)}
                            onClick={() => {
                                project.exportWayPointData();
                            }}
                        >
                            <i className="bi bi-file-earmark-arrow-down me-2"></i>
                            {t("editor.settings.export.exportWaypoints")}
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

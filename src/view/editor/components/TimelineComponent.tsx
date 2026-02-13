import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";
import { IUndoableController } from "../../../controller/interface/IUndoableController";
import { SPEED_VALUES, toolTipps } from "../config";
import { IProject } from "../../../controller/interface/IProject";

// Die Klasse wurde zu Teilen mit Hilfe von KI generiert
/**
 * Erstellt eine Timeline Komponente auf der der Nutzer alle Änderungen an der Zeit und ähnlichem vornehmen kann.
 * @param controller Stellt den Controller mit Zugriff auf die Logik bereit
 * @returns JSX-Element der Timeline Komponente
 */
export default function TimelineComponent({
    controller,
}: {
    controller: IUndoableController;
}) {
    /* ---------- Used Controllers ---------- */
    const settings: ISettings = controller.getSettings();
    const project: IProject = controller.getProject();
    const timeController: ITimeController = controller.getTimeController();

    /* ---------- State Hooks ---------- */
    const [time, setTime] = useState<number>(timeController.getTime());
    const [endTime, setEndTime] = useState<number>(settings.getEndTime());
    const [animationSpeed, setAnimationSpeed] = useState<number>(
        timeController.getAnimationSpeed(),
    );
    const [playing, setPlaying] = useState<boolean>(false);
    const [recording, setRecording] = useState<boolean>(
        project.getRecordingRunning(),
    );

    /* ---------- Register Events ---------- */
    useEffect(() => {
        const onRecordingRunningChanged = (isRunning: boolean) => {
            setRecording(isRunning);
        };

        const onAnimationSpeedChanged = (newSpeed: number) => {
            setAnimationSpeed(newSpeed);
        };

        const onPlayingChanged = (isPlaying: boolean) => {
            setPlaying(isPlaying);
        };

        const onTimeChanged = (newTime: number) => {
            setTime(newTime);
        };

        const onEndTimeChanged = (newEndTime: number) => {
            setEndTime(newEndTime);
        };

        project.getRecordingRunningEvent().register(onRecordingRunningChanged);
        timeController
            .getAnimationSpeedChangedEvent()
            .register(onAnimationSpeedChanged);
        timeController.getAnimationRunningEvent().register(onPlayingChanged);
        timeController.getTimeChangedEvent().register(onTimeChanged);
        settings.getEndTimeChangedEvent().register(onEndTimeChanged);

        return () => {
            project
                .getRecordingRunningEvent()
                .remove(onRecordingRunningChanged);
            timeController
                .getAnimationSpeedChangedEvent()
                .remove(onAnimationSpeedChanged);
            timeController.getAnimationRunningEvent().remove(onPlayingChanged);
            timeController.getTimeChangedEvent().remove(onTimeChanged);
            settings.getEndTimeChangedEvent().remove(onEndTimeChanged);
        };
    }, [timeController]);

    /* ---------- Click Handlers ---------- */
    const handleRecordingClick = () => {
        if (project.getRecordingRunning()) {
            project.stopRecording();
        } else {
            project.startRecording();
        }
    };

    const handlePlayPauseClick = () => {
        if (timeController.getAnimationRunning()) {
            timeController.stopAnimation();
        } else {
            timeController.startAnimation();
        }
    };

    const handleSpeedChangeClick = () => {
        const currentIndex = SPEED_VALUES.indexOf(animationSpeed);
        const nextIndex = (currentIndex + 1) % SPEED_VALUES.length;
        const newSpeed = SPEED_VALUES[nextIndex];

        timeController.setAnimationSpeed(newSpeed);
    };

    const handleSliderChange = (newTime: number) => {
        timeController.setTime(newTime);
    };

    return (
        <Card className="rounded-0 border-2 border-secondary border-start-0 border-top-0 border-end-0 d-flex flex-row align-items-center gap-4 p-3">
            {/* Record Button */}
            <button
                className="btn btn-link p-0 text-danger"
                onClick={handleRecordingClick}
            >
                <i
                    title={
                        recording
                            ? toolTipps.RECORD_STOP
                            : toolTipps.RECORD_START
                    }
                    className={
                        `bi ${recording ? "bi-stop-fill" : "bi-record-fill"}` +
                        " fs-2"
                    }
                />
            </button>

            {/* Play Button */}
            <button className="btn btn-link p-0" onClick={handlePlayPauseClick}>
                <i
                    title={
                        playing
                            ? toolTipps.ANIMATION_STOP
                            : toolTipps.ANIMATION_START
                    }
                    className={
                        `bi ${playing ? "bi-pause-fill" : "bi-play-fill"}` +
                        " fs-2"
                    }
                    style={{ color: "black" }}
                />
            </button>

            {/* Speed */}
            <div className="d-flex align-items-center gap-3">
                {/* Speed Button */}
                <button
                    className="btn btn-link p-0"
                    onClick={handleSpeedChangeClick}
                >
                    <i
                        title="Geschwindigkeit ändern"
                        className="bi bi-speedometer2 fs-3"
                        style={{ color: "black" }}
                    />
                </button>
                {/* Speed Text */}
                <span
                    className="fw-bold text-start"
                    style={{ minWidth: "45px" }}
                >
                    {animationSpeed}x
                </span>
            </div>

            {/* Time */}
            <div className="d-flex align-items-center gap-3 flex-grow-1">
                {/* Time Display */}
                <span className="text-nowrap">
                    {formatTime(time)} / {formatTime(endTime)}
                </span>

                {/* Slider */}
                <input
                    title={toolTipps.TIME_SET}
                    type="range"
                    className="form-range flex-grow-1"
                    min={0}
                    max={endTime * 100}
                    step={1}
                    value={time * 100}
                    onChange={(e) =>
                        handleSliderChange(Number(e.target.value) / 100)
                    }
                    disabled={playing}
                />
            </div>
        </Card>
    );
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";

import { SPEED_VALUES } from "../config";

interface TimelineComponentProps {
  // Props
  settings: ISettings;
  timeController: ITimeController;
}

export default function TimelineComponent({
  settings,
  timeController,
}: TimelineComponentProps) {
  // State Hooks
  const [time, setTime] = useState<number>(timeController.getTime());
  const [endTime, setEndTime] = useState<number>(settings.getEndTime());
  const [animationSpeed, setAnimationSpeed] = useState<number>(
    timeController.getAnimationSpeed(),
  );
  const [playing, setPlaying] = useState<boolean>(false);

  // Register Event Handlers
  useEffect(() => {
    // Define Functions
    const onPlayingChanged = (isPlaying: boolean) => {
      setPlaying(isPlaying);
    };

    const onTimeChanged = (newTime: number) => {
      setTime(newTime);
    };

    // Register Events
    timeController.getAnimationRunningEvent().register(onPlayingChanged);
    timeController.getTimeChangedEvent().register(onTimeChanged);

    return () => {
      // Remove Events
      timeController.getAnimationRunningEvent().remove(onPlayingChanged);
      timeController.getTimeChangedEvent().remove(onTimeChanged);
    };
  }, [timeController]);

  const handlePlayPause = () => {
    if (playing) {
      timeController.stopAnimation();
    } else {
      timeController.startAnimation();
    }
    setPlaying(!playing);
  };

  const handleSpeedChange = () => {
    const currentIndex = SPEED_VALUES.indexOf(animationSpeed);
    const nextIndex = (currentIndex + 1) % SPEED_VALUES.length;
    changeSpeed(SPEED_VALUES[nextIndex]);
  };

  const changeSpeed = (number: number) => {
    timeController.setAnimationSpeed(number);
    setAnimationSpeed(number);
  };

  const handleSliderChange = (newTime: number) => {
    setTime(newTime);
    timeController.setTime(newTime);
  };

  return (
    <Card className="rounded-0 border-2 border-secondary border-start-0 border-top-0 border-end-0 d-flex flex-row align-items-center gap-4 p-3">
      {/* Play Button */}
      <button className="btn btn-link p-0" onClick={handlePlayPause}>
        <i
          className={
            `bi ${playing ? "bi-pause-fill" : "bi-play-fill"}` + " fs-2"
          }
          style={{ color: "black" }}
          title="Play/Pause"
        />
      </button>

      {/* Speed */}
      <div className="d-flex align-items-center gap-3">
        {/* Speed Button */}
        <button className="btn btn-link p-0" onClick={handleSpeedChange}>
          <i
            className="bi bi-speedometer2 fs-3"
            style={{ color: "black" }}
            title="Change Speed"
          />
        </button>
        {/* Speed Text */}
        <span className="fw-bold text-start" style={{ minWidth: "45px" }}>
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
          type="range"
          className="form-range flex-grow-1"
          min={0}
          max={endTime * 60}
          step={1}
          value={time * 60}
          onChange={(e) => handleSliderChange(Number(e.target.value) / 60)}
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

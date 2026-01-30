import { useState } from "react";
import { Card } from "react-bootstrap";

import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";

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

  const handlePlayPause = () => {
    if (playing) {
      timeController.stopAnimation();
    } else {
      timeController.startAnimation();
    }
    setPlaying(!playing);
  };

  timeController.getTimeChangedEvent().register((newTime: number) => {
    setTime(newTime);
  });

  const handleSpeedChange = () => {
    switch (animationSpeed) {
      case 0.25:
        changeSpeed(0.5);
        break;
      case 0.5:
        changeSpeed(0.75);
        break;
      case 0.75:
        changeSpeed(1);
        break;
      case 1:
        changeSpeed(1.5);
        break;
      case 1.5:
        changeSpeed(2);
        break;
      case 2:
        changeSpeed(3);
        break;
      case 3:
        changeSpeed(0.25);
        break;
      default:
        changeSpeed(1);
    }
  };

  const changeSpeed = (number: number) => {
    timeController.setAnimationSpeed(number);
    setAnimationSpeed(number);
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
          max={100}
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

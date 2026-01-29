import { useState } from "react";
import { Card } from "react-bootstrap";
<<<<<<< HEAD
import { ISettings } from "../../../controller/interface/ISettings";
import { ITimeController } from "../../../controller/interface/ITimeController";
=======
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64

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
<<<<<<< HEAD
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

=======
    setPlaying(!playing);
  };

>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
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
<<<<<<< HEAD
    timeController.setAnimationSpeed(number);
=======
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
    setAnimationSpeed(number);
  };

  return (
    <Card className="rounded-0 border-secondary border-2 d-flex flex-row align-items-center gap-4 p-3">
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
<<<<<<< HEAD
        <span className="fw-bold text-start" style={{ minWidth: "45px" }}>
          {animationSpeed}x
        </span>
=======
        <span className="fw-bold">{animationSpeed}x</span>
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
      </div>

      {/* Time */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        {/* Time Display */}
<<<<<<< HEAD
        <span className="text-nowrap">
          {formatTime(time)} / {formatTime(endTime)}
        </span>
=======
        <span className="text-nowrap">00:00 / 01:00</span>
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64

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
<<<<<<< HEAD
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
=======
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
}

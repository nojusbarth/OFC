import { useState } from "react";
import { Card } from "react-bootstrap";

interface TimelineComponentProps {
  // Props
  // TODO
}

export default function TimelineComponent({}: TimelineComponentProps) {
  // State Hooks
  const [time, setTime] = useState<number>(0); // TODO
  const [endTime, setEndTime] = useState<number>(60);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const [playing, setPlaying] = useState<boolean>(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

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
        <span className="fw-bold">{animationSpeed}x</span>
      </div>

      {/* Time */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        {/* Time Display */}
        <span className="text-nowrap">00:00 / 01:00</span>

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

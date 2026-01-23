import { useState } from "react";

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

  return <div>Timeline Component</div>;
}

import { DayTime } from "../../repository/entity/DayTime";

export interface ISimulationView {
  notifyFrameChange(): void;
  setEditorTime(time: number): void;
  setSimulationTime(time: DayTime): void;
  selectDrones(ids: number[]): void;
  notifyCollisionChange(newCollision: Array<number>): void;

  setCanvasForRecording(canvas: HTMLCanvasElement): void;
  startRecording(): void;
  stopRecording(): void;
}

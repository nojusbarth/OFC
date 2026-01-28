import { DayTime } from "../../repository/entity/DayTime";

export interface ISimulationView {
  notifyFrameChange(): void;
  setEditorTime(time: number): void;
  setSimulationTime(time: DayTime): void;
  selectDrone(id: number): void;
  unselectDrone(id: number): void;
  notifyCollisionChange(newCollision: Array<number>): void;
}

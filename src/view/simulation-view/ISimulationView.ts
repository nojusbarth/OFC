export interface ISimulationView {
  notifyFrameChange(): void;
  setEditorTime(time: number): void;
  setSimulationTime(time: number): void;
  selectDrone(id: number): void;
  unselectDrone(id: number): void;
  notifyCollisionChange(newCollision: Array<number>): void;
}

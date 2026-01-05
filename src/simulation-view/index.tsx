import { FC } from "react";
import { DroneStateStore } from "./state/DroneStateStore";
import { PathStateStore } from "./state/PathStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { ISimulation } from "./ISimulation";
import { SceneRenderer } from "./graphics/SceneRenderer";



//  EXECUTE ONLY ONCE
export function initSimulation() {
  const droneStore = new DroneStateStore();
  const pathStore = new PathStateStore();
  const lightStore = new LightStateStore();

  const simulation = new ISimulation(
    droneStore,
    pathStore,
    lightStore
  );

  const Scene: FC = () => (
    < SceneRenderer
      droneStore={droneStore}
      pathStore={pathStore}
      lightStore={lightStore}
    />
  );

  return {
    simulation,
    Scene,
  };
}

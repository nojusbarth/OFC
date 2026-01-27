import { FC } from "react";
import { DroneStateStore } from "./state/DroneStateStore";
import { PathStateStore } from "./state/PathStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { SimulationView } from "./SimulationView";
import { SceneRenderer } from "./graphics/SceneRenderer";


/**
 * Initialisiert das simulation-view Paket. NUR EINMAL AUSFÜHREN
 * @returns simulation-view interface und scene React Komponente
 */
export function initSimulation() {
  const droneStore = new DroneStateStore();
  const pathStore = new PathStateStore();
  const lightStore = new LightStateStore();

  const simulation = new SimulationView(
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

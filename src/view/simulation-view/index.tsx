import { FC } from "react";
import { DroneStateStore } from "./state/DroneStateStore";
import { PathStateStore } from "./state/PathStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { SimulationView } from "./SimulationView";
import { SceneRenderer } from "./graphics/SceneRenderer";
import { IController } from "../../controller/interface/IController";


/**
 * Initialisiert das simulation-view Paket. NUR EINMAL AUSFÜHREN
 * @returns simulation-view interface und scene React Komponente
 */
export function initSimulation(controller : IController) {
  const droneStore = new DroneStateStore();
  const pathStore = new PathStateStore();
  const lightStore = new LightStateStore();

  const simulation = new SimulationView(
    droneStore,
    pathStore,
    lightStore,
    controller
  );


  // Registriere Controller Events

  controller.getDronesEvent().register((drones) => {
    simulation.notifyFrameChange();
  });

  controller.getTimeController().getTimeChangedEvent().register((time) => {
    simulation.setEditorTime(time);
  });

  controller.getCollisionEvent().register((collision) => {
    
    let drones = Array.from(collision.keys());

    simulation.notifyCollisionChange(drones);
  });

  controller.getDroneSelectEvent().register((selectedDrones) => {
    //TODO
  });


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

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

  // Registriere Controller Events

  controller.getDronesEvent().register((drones) => {
    console.log("Drones changed event ", drones);  
  
    simulation.notifyFrameChange();
  });

  controller.getTimeController().getTimeChangedEvent().register((time) => {
    console.log("Time changed event ", time);  

    simulation.setEditorTime(time);
  });

  controller.getCollisionEvent().register((collision) => {
    console.log("Collision changed event ", collision);  
    
    let drones = Array.from(collision.keys());

    simulation.notifyCollisionChange(drones);
  });

  controller.getDroneSelectEvent().register((selectedDrones) => {
    console.log("Drone selection changed event ", selectedDrones);  
    simulation.selectDrones(selectedDrones);
  });

  controller.getDroneChangedEvent().register((drone) => {
    console.log("Drone changed event ", drone);  
    simulation.notifyFrameChange();
  });

  controller.getSettings().getDayTimeChangedEvent().register((daytime) => {
    console.log("Daytime changed event ", daytime);  
    simulation.setSimulationTime(daytime);
  });



  const droneStore = new DroneStateStore();
  const pathStore = new PathStateStore();
  const lightStore = new LightStateStore();

  const simulation = new SimulationView(
    droneStore,
    pathStore,
    lightStore,
    controller
  );



  const Scene: FC = () => (
    < SceneRenderer
      droneStore={droneStore}
      pathStore={pathStore}
      lightStore={lightStore}
      onReady={() => simulation.notifyFrameChange()}
    />
  );

  return {
    simulation,
    Scene,
  };
}

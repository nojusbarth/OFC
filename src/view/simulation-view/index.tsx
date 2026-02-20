import { FC } from "react";
import { DroneStateStore } from "./state/DroneStateStore";
import { PathStateStore } from "./state/PathStateStore";
import { LightStateStore } from "./state/LightStateStore";
import { SimulationView } from "./SimulationView";
import { SceneRenderer } from "./graphics/SceneRenderer";
import { IController } from "../../controller/interface/IController";
import * as THREE from "three";


/**
 * Initialisiert das simulation-view Paket. NUR EINMAL AUSFÜHREN
 * @returns simulation-view interface und scene React Komponente
 */
export function initSimulation(controller : IController) {

  // Registriere Controller Events

  controller.getProject().getProjectLoadedEvent().register(() => {
      console.log("Project loaded event ");

      simulation = new SimulationView(
        droneStore,
        pathStore,
        lightStore,
        controller
      );

      simulation.notifyCollisionChange(Array.from(controller.getCollisions().keys()));
      simulation.setSimulationTime(controller.getSettings().getDayTime());
  
  });

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

  controller.getProject().getRecordingRunningEvent().register((recording) => {
    console.log("Recording running event ", recording);  

    if (recording) {
      simulation.startRecording();
    } else {
      simulation.stopRecording();
    }
  });



  const droneStore = new DroneStateStore();
  const pathStore = new PathStateStore();
  const lightStore = new LightStateStore();

  var simulation = new SimulationView(
    droneStore,
    pathStore,
    lightStore,
    controller
  );



  const Scene: FC = () => (
    <SceneRenderer
      droneStore={droneStore}
      pathStore={pathStore}
      lightStore={lightStore}
      onReady={(gl: THREE.WebGLRenderer) => {
        simulation.setCanvasForRecording(gl.domElement);
        
        simulation.notifyFrameChange();
      }}
    />
  );

  return {
    Scene,
  };
}

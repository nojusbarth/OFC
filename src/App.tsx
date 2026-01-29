import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useMemo, useState } from "react";
import EditorComponent from "./view/editor/EditorComponent";
import StartpageComponent from "./view/startpage/StartpageComponent";
import { Controller } from "./controller/logic/Controller";
import { ProjectRepository } from "./repository/ProjectRepository";
import { Settings } from "./controller/logic/Settings";
import { PositionKeyFrame } from "./repository/entity/PositionKeyFrame";
import { Vector3, Color } from "three";
import { ColorKeyFrame } from "./repository/entity/ColorKeyFrame";

function App() {
  // State Hooks
  const [showStartpage, setShowStartpage] = useState<boolean>(false); //TODO true

  //create controller with some test data
  const controller = useMemo(() => {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    const ctrl = new Controller(settings, repository);

    // Configure settings
    ctrl.getSettings().setEndTime(30);
    ctrl.getSettings().setDroneDistance(2);

    // Add drones with position keyframes
    const drone1 = ctrl.addDrone();
    ctrl.addPositionKeyFrame(
      drone1,
      new PositionKeyFrame(new Vector3(0, 0, 0), 0),
    );
    ctrl.getTimeController().setTime(10);
    ctrl.addPositionKeyFrame(
      drone1,
      new PositionKeyFrame(new Vector3(10, 5, 0), 10),
    );
    ctrl.getTimeController().setTime(20);
    ctrl.addPositionKeyFrame(
      drone1,
      new PositionKeyFrame(new Vector3(20, 0, 0), 20),
    );

    const drone2 = ctrl.addDrone();
    ctrl.getTimeController().setTime(0);
    ctrl.addPositionKeyFrame(
      drone2,
      new PositionKeyFrame(new Vector3(0, 10, 0), 0),
    );
    ctrl.getTimeController().setTime(10);
    ctrl.addPositionKeyFrame(
      drone2,
      new PositionKeyFrame(new Vector3(10, 15, 0), 10),
    );
    ctrl.getTimeController().setTime(20);
    ctrl.addPositionKeyFrame(
      drone2,
      new PositionKeyFrame(new Vector3(20, 10, 0), 20),
    );

    const drone3 = ctrl.addDrone();
    ctrl.getTimeController().setTime(0);
    ctrl.addPositionKeyFrame(
      drone3,
      new PositionKeyFrame(new Vector3(5, 5, 5), 0),
    );
    ctrl.getTimeController().setTime(15);
    ctrl.addPositionKeyFrame(
      drone3,
      new PositionKeyFrame(new Vector3(15, 10, 5), 15),
    );

    // Add color keyframes
    ctrl.getTimeController().setTime(0);
    ctrl.addColorKeyFrame(drone1, new ColorKeyFrame(new Color(1, 0, 0), 0)); // Red
    ctrl.addColorKeyFrame(drone2, new ColorKeyFrame(new Color(0, 1, 0), 0)); // Green
    ctrl.addColorKeyFrame(drone3, new ColorKeyFrame(new Color(0, 0, 1), 0)); // Blue

    ctrl.getTimeController().setTime(10);
    ctrl.addColorKeyFrame(drone1, new ColorKeyFrame(new Color(1, 1, 0), 10)); // Yellow

    // Reset time to 0
    ctrl.getTimeController().setTime(0);

    return ctrl;
  }, []);

  let inhalt: React.ReactNode;
  if (showStartpage) {
    inhalt = <StartpageComponent
        controller={controller}
        toggleStartpage={() => setShowStartpage(true)}
    />;
  } else {
    inhalt = (
      <EditorComponent
        controller={controller}
        toggleStartpage={() => setShowStartpage(true)}
      />
    );
  }

  return inhalt;
}

export default App;

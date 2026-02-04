import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { initSimulation } from './view/simulation-view';
import { Controller } from './controller/logic/Controller';
import { ProjectRepository } from './repository/ProjectRepository';
import { Settings } from './controller/logic/Settings';
import { Color, Vector3 } from 'three';
import { DayTime } from './repository/entity/DayTime';
import { PositionKeyFrame } from './repository/entity/PositionKeyFrame';
import { ColorKeyFrame } from './repository/entity/ColorKeyFrame';
import EditorComponent from './view/editor/EditorComponent';
import StartpageComponent from './view/startpage/StartpageComponent';
import { Canvas } from '@react-three/fiber';
import { UndoableController } from './controller/logic/UndoableController';
import { UndoRepository } from './repository/UndoRepository';
import { KeyboardShortcuts } from './view/KeyboardShortcuts';


function App() {
  // State Hooks
  const [showStartpage, setShowStartpage] = useState<boolean>(false); //TODO true

  // create controller with some test data
  const controller = useMemo(() => {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    const ctrl = new Controller(settings, repository);

    // Configure settings
    ctrl.getSettings().setEndTime(30);
    ctrl.getSettings().setCollisionDistance(2);

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

    return new UndoableController(ctrl, new UndoRepository(), new UndoRepository());
  }, []);

  const tolleSache = useMemo(() => [
    ["Setup: End Time 30s, Night Mode", () => {
      controller.getSettings().setEndTime(30);
      controller.getSettings().setDayTime(DayTime.NIGHT);
    }],
    ["Add Drone 0", () => controller.addDrone()],
    ["Add Color Keyframe (Red) for Drone 0", () => controller.addColorKeyFrameNow(0, new Color(1, 0, 0))],
    ["Select Drone 0", () => controller.selectDrone(0)],
    ["Add Position Keyframe for Drone 0", () => controller.addPositionKeyFrameNow(0, new Vector3(1, 1, 0))],
    ["Add Drone 1", () => controller.addDrone()],
    ["Select Drone 1, Unselect Drone 0", () => { controller.selectDrone(1); controller.unselectDrone(0) }],
    ["Add Position Keyframe for Drone 1", () => controller.addPositionKeyFrameNow(1, new Vector3(0, 11, 0))],
    ["Set Time to 10s", () => controller.getTimeController().setTime(10)],
    ["Add Position Keyframe for Drone 1", () => controller.addPositionKeyFrameNow(1, new Vector3(1, 1, 0))],
    ["Animate", () => controller.getTimeController().startAnimation()],
  ] as Array<[string, () => void]>, [controller]);

  useEffect(() => {
    // keypress listener
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 't') {
        const action = tolleSache.shift();
        if (action) {
          const [msg, fn] = action;
          console.log('Aktion:', msg);
          fn();
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [tolleSache]);

  // initSimulation liefert die Simulation-Fassade und die Scene-Komponente
  const { simulation, Scene } = useMemo(() => initSimulation(controller), [controller]);

  let inhalt: React.ReactNode;
  if (showStartpage) {
    inhalt = <StartpageComponent
        controller={controller}
        toggleStartpage={() => setShowStartpage(false)}
    />;
  } else {
    inhalt = (
      <>
        <EditorComponent
          viewport={<Canvas><Scene /></Canvas>}
          controller={controller}
          toggleStartpage={() => setShowStartpage(true)}
        />
        <KeyboardShortcuts controller={controller} />
      </>
    );
  }

  return inhalt;
}

export default App;

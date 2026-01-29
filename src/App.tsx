import './App.css';
import { Canvas } from '@react-three/fiber';
import { use, useEffect } from 'react';

import { useMemo } from 'react';
import { initSimulation } from './view/simulation-view';
import { Controller } from './controller/logic/Controller';
import { ProjectRepository } from './repository/ProjectRepository';
import { Settings } from './controller/logic/Settings';
import { IController } from './controller/interface/IController';
import { Color, Vector3 } from 'three';
import { DayTime } from './repository/entity/DayTime';



function App() {


  const controller : IController = useMemo(() => { 
    const repo = new ProjectRepository();
    const settings = new Settings(repo)
    const controller = new Controller(settings, repo);
    return controller;
   }, []);

   const tolleSache = useMemo(() => [
    ["Setup: End Time 30s, Night Mode", () => { controller.getSettings().setEndTime(30); 
     controller.getSettings().setDayTime(DayTime.NIGHT); }],
    ["Add Drone 0", () => controller.addDrone()],
    ["Add Color Keyframe (Red) for Drone 0", () => controller.addColorKeyFrameNow(0, new Color(1, 0, 0))],
    ["Select Drone 0", () => controller.selectDrone(0)],
    ["Add Position Keyframe for Drone 0", () => controller.addPositionKeyFrameNow(0, new Vector3(1, 1, 0))],
    ["Add Drone 1", () => controller.addDrone()],
    ["Select Drone 1, Unselect Drone 0", () => {controller.selectDrone(1); controller.unselectDrone(0)}],
    ["Add Position Keyframe for Drone 1", () => controller.addPositionKeyFrameNow(1, new Vector3(0, 11, 0))],
    ["Set Time to 10s", () => controller.getTimeController().setTime(10)],
    ["Add Position Keyframe for Drone 1", () => controller.addPositionKeyFrameNow(1, new Vector3(1, 1, 0))],
    ["Animate", () => controller.getTimeController().startAnimation()],
   ] as Array<[string, () => void]>, []);

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
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  // initSimulation liefert die Simulation-Fassade und die Scene-Komponente
  const { simulation, Scene } = useMemo(() => initSimulation(controller), []);

    /*
    // Bootstrap test
    <div className="container mt-5">
      <div className="alert alert-success" role="alert">
        ✅ Bootstrap funktioniert!
      </div>

      <button className="btn btn-primary me-2">Primary</button>
      <button className="btn btn-danger">Danger</button>
    </div>
    */
  return (
    <Canvas shadows style={{ height: "100vh", width: "100vw" }}>
      <Scene />
    </Canvas>
  );
}

export default App;

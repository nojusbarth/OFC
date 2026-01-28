import './App.css';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

import { useMemo } from 'react';
import { initSimulation } from './view/simulation-view';
import { Controller } from './controller/logic/Controller';
import { ProjectRepository } from './repository/ProjectRepository';
import { Settings } from './controller/logic/Settings';
import { IController } from './controller/interface/IController';
import { Vector3 } from 'three';



function App() {


  const controller : IController = useMemo(() => { 
    const repo = new ProjectRepository();
    const settings = new Settings(repo)
    return new Controller(settings, repo);
   }, []);

   const tolleSache = useMemo(() => [
    () => controller.getSettings().setEndTime(30),
    () => controller.addDrone(),
    () => controller.selectDrone(0),
    () => controller.addPositionKeyFrameNow(0, new Vector3(10, 0, 0)),
    () => controller.addDrone(),
    () => {controller.selectDrone(1); controller.unselectDrone(0)},
    () => controller.addPositionKeyFrameNow(1, new Vector3(0, 0, 0)),
    () => controller.getTimeController().setTime(10),
    () => controller.addPositionKeyFrameNow(1, new Vector3(10, 10, 0)),
    () => controller.addDrone(),
   ], []);

  useEffect(() => {
    // keypress listener
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 't') {
        console.log('Tolle Sache drücken!');
        const action = tolleSache.shift();
        if (action) {
          action();
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [tolleSache]);

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

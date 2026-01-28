import './App.css';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

import { useMemo } from 'react';
import { initSimulation } from './view/simulation-view';
import { Controller } from './controller/logic/Controller';
import { ProjectRepository } from './repository/ProjectRepository';
import { Settings } from './controller/logic/Settings';
import { IController } from './controller/interface/IController';



function App() {


  const controller : IController = useMemo(() => { 
    const repo = new ProjectRepository();
    const settings = new Settings(repo)
    return new Controller(settings, repo);
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

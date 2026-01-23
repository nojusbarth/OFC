import './App.css';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

import { useMemo } from 'react';
import { initSimulation } from './simulation-view';



function App() {
  // initSimulation liefert die Simulation-Fassade und die Scene-Komponente
  const { simulation, Scene } = useMemo(() => initSimulation(), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          simulation.setEditorTime(0);
          break;
        case "s":
          simulation.selectDrone(1);
          break;
        case "a":
          simulation.unselectDrone(1);
          break;
        case "h":
          simulation.setSimulationTime(7.0);
          break;
        case "j":
          simulation.setSimulationTime(13);
          break;
        case "k":
          simulation.setSimulationTime(19);
          break;
        case "l":
          simulation.setSimulationTime(1);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [simulation]);


  return (
    <Canvas shadows style={{ height: "100vh", width: "100vw" }}>
      <Scene />
    </Canvas>
  );
}

export default App;

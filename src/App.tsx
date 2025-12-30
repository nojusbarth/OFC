import './App.css';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';

import { useMemo } from 'react';
import { initSimulation } from './simulation';



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
          simulation.setEditorTime(1);
          break;
        case "a":
          simulation.setEditorTime(2);
          break;
        case "d":
          simulation.setEditorTime(3);
          break;
        case "r":
          simulation.setEditorTime(4);
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

import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { initSimulation } from './view/simulation-view';
import { Controller } from './controller/logic/Controller';
import { ProjectRepository } from './repository/ProjectRepository';
import { Settings } from './controller/logic/Settings';
import { helloKitShow } from './shows/hello_kit';
import EditorComponent from './view/editor/EditorComponent';
import StartpageComponent from './view/startpage/StartpageComponent';
import { Canvas } from '@react-three/fiber';
import { DayTime } from './repository/entity/DayTime';
import { runnerShow } from './shows/runner';


function App() {
  // State Hooks
  const [showStartpage, setShowStartpage] = useState<boolean>(false); //TODO true

  // create controller with some test data
  const controller = useMemo(() => {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    let ctrl = new Controller(settings, repository);

    runnerShow(ctrl);
    console.log("App: Controller mit Testdaten initialisiert");
    console.log(ctrl.getDrones().length);
    return ctrl;
  }, []);

  const tolleSache = useMemo(() => [
    ["time night", () => controller.getSettings().setDayTime(DayTime.NIGHT)],
    ["Record start", () => simulation.startRecording()],
    ["Record stop", () => simulation.stopRecording()],
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
    inhalt = <StartpageComponent />;
  } else {
    inhalt = (
      <>
      <EditorComponent
        viewport={<Canvas><Scene /></Canvas>}
        controller={controller}
        toggleStartpage={() => setShowStartpage(true)}
      />
      </>
    );
  }

  return inhalt;
}

export default App;

import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { initSimulation } from './view/simulation-view';
import { Controller } from './controller/logic/Controller';
import { ProjectRepository } from './repository/ProjectRepository';
import { Settings } from './controller/logic/Settings';
import { EditorComponent } from './view/editor/EditorComponent';
import { StartpageComponent } from './view/startpage/StartpageComponent';
import { Canvas } from '@react-three/fiber';
import { UndoableController } from './controller/logic/UndoableController';
import { UndoRepository } from './repository/UndoRepository';
import { KeyboardShortcuts } from './view/KeyboardShortcuts';

/**
 * Hauptkomponente der Anwendung
 * Verwaltet den globalen Zustand zwischen Startpage und Editor
 * @returns JSX-Element der Anwendung
 */
export function App() {
  // State Hooks
  const [showStartpage, setShowStartpage] = useState<boolean>(true);
  const controller = useMemo(() => {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    const ctrl = new Controller(settings, repository);
    return new UndoableController(ctrl, repository, new UndoRepository(), new UndoRepository());
  }, []);

  // initSimulation liefert die Simulation-Fassade und die Scene-Komponente
  const { Scene } = useMemo(() => initSimulation(controller), [controller]);

  useEffect(() => {
    if (showStartpage) {
      return;
    }
    const handleUnload = () => {
      controller.getProject().saveProjectLocally();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [showStartpage, controller]);

  if (showStartpage) {
    return <StartpageComponent
      controller={controller}
      toggleStartpage={() => setShowStartpage(false)}
    />;
  } else {
    return (
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
}


import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { initSimulation } from "./view/simulation-view";
import { Controller } from "./controller/logic/Controller";
import { ProjectRepository } from "./repository/ProjectRepository";
import { Settings } from "./controller/logic/Settings";
import { Color, Vector3 } from "three";
import { DayTime } from "./repository/entity/DayTime";
import { PositionKeyFrame } from "./repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "./repository/entity/ColorKeyFrame";
import EditorComponent from "./view/editor/EditorComponent";
import StartpageComponent from "./view/startpage/StartpageComponent";
import { Canvas } from "@react-three/fiber";
import { UndoableController } from "./controller/logic/UndoableController";
import { UndoRepository } from "./repository/UndoRepository";
import { KeyboardShortcuts } from "./view/KeyboardShortcuts";
import { rocketShow } from "./shows/rocket";
import { runnerShow } from "./shows/runner";
import { helloKitShow } from "./shows/hello_kit";

function App() {
    // State Hooks
    const [showStartpage, setShowStartpage] = useState<boolean>(false); //TODO true

    // create controller with some test data
    const controller = useMemo(() => {
        const repository = new ProjectRepository();
        const settings = new Settings(repository);
        const ctrl = new Controller(settings, repository);
        const ctrl2 = new UndoableController(
            ctrl,
            new UndoRepository(),
            new UndoRepository(),
        );

        //helloKitShow(ctrl2);
        rocketShow(ctrl2);
        //runnerShow(ctrl2);

        // Reset time to 0
        ctrl2.getTimeController().setTime(0);

        return ctrl2;
    }, []);

    const tolleSache = useMemo(
        () =>
            [
                ["Record start", () => simulation.startRecording()],
                ["Record stop", () => simulation.stopRecording()],
            ] as Array<[string, () => void]>,
        [controller],
    );

    useEffect(() => {
        // keypress listener
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "t") {
                const action = tolleSache.shift();
                if (action) {
                    const [msg, fn] = action;
                    console.log("Aktion:", msg);
                    fn();
                }
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [tolleSache]);

    // initSimulation liefert die Simulation-Fassade und die Scene-Komponente
    const { simulation, Scene } = useMemo(
        () => initSimulation(controller),
        [controller],
    );

    let inhalt: React.ReactNode;
    if (showStartpage) {
        inhalt = <StartpageComponent />;
    } else {
        inhalt = (
            <>
                <EditorComponent
                    viewport={
                        <Canvas>
                            <Scene />
                        </Canvas>
                    }
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

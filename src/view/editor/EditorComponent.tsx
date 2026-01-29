import { Container, Row, Col } from "react-bootstrap";
import DroneManagerComponent from "./components/DroneManagerComponent";
import DroneEditorComponent from "./components/DroneEditorComponent";
import TimelineComponent from "./components/TimelineComponent";
import SettingsComponent from "./components/SettingsComponent";
import { IController } from "../../controller/interface/IController";

interface EditorComponentProps {
  // Props
<<<<<<< HEAD
  controller: IController;
=======
  // controller: IController; TODO
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
  toggleStartpage: () => void;
}

export default function EditorComponent({
<<<<<<< HEAD
  controller,
=======
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
  toggleStartpage,
}: EditorComponentProps) {
  /* Layout Constants */
  // Breite des DroneEditors und SettingsComponents
  const droneEditorWidth = "400px";

  return (
    <Container fluid className="vh-100 d-flex flex-column bg-light p-0">
      {/* Timeline + Settings - oben */}
      <Row className="g-0">
        <Col>
<<<<<<< HEAD
          <TimelineComponent
            settings={controller.getSettings()}
            timeController={controller.getTimeController()}
          />
        </Col>
        <Col xs="auto" style={{ width: droneEditorWidth }}>
          <SettingsComponent
            settings={controller.getSettings()}
            timeController={controller.getTimeController()}
            toggleStartpage={toggleStartpage}
          />
=======
          <TimelineComponent />
        </Col>
        <Col xs="auto" style={{ width: droneEditorWidth }}>
          <SettingsComponent toggleStartpage={toggleStartpage} />
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
        </Col>
      </Row>

      {/* Hauptbereich */}
      <Row className="flex-grow-1 g-0">
        {/* Links: Viewport + DroneManager */}
        <Col className="d-flex flex-column">
          <div className="flex-grow-1 border border-secondary m-2">
            {/* Viewport kommt später hier */}
          </div>
<<<<<<< HEAD
          <DroneManagerComponent controller={controller} />
=======
          <DroneManagerComponent />
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
        </Col>

        {/* Rechts: DroneEditor */}
        <Col xs="auto" style={{ width: droneEditorWidth }}>
<<<<<<< HEAD
          <DroneEditorComponent controller={controller} />
=======
          <DroneEditorComponent />
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
        </Col>
      </Row>
    </Container>
  );
}

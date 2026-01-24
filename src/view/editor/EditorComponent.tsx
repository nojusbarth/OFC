import { Container, Row, Col } from "react-bootstrap";
import DroneManagerComponent from "./components/DroneManagerComponent";
import DroneEditorComponent from "./components/DroneEditorComponent";
import TimelineComponent from "./components/TimelineComponent";
import SettingsComponent from "./components/SettingsComponent";
import { IController } from "../../controller/interface/IController";

interface EditorComponentProps {
  // Props
  // controller: IController; TODO
  toggleStartpage: () => void;
}

export default function EditorComponent({
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
          <TimelineComponent />
        </Col>
        <Col xs="auto" style={{ width: droneEditorWidth }}>
          <SettingsComponent toggleStartpage={toggleStartpage} />
        </Col>
      </Row>

      {/* Hauptbereich */}
      <Row className="flex-grow-1 g-0">
        {/* Links: Viewport + DroneManager */}
        <Col className="d-flex flex-column">
          <div className="flex-grow-1 border border-secondary m-2">
            {/* Viewport kommt später hier */}
          </div>
          <DroneManagerComponent />
        </Col>

        {/* Rechts: DroneEditor */}
        <Col xs="auto" style={{ width: droneEditorWidth }}>
          <DroneEditorComponent />
        </Col>
      </Row>
    </Container>
  );
}

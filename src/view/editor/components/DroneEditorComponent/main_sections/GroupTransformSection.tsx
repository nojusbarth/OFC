import { Card, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import { OffsetSection } from "../group_sections/OffsetSection";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { RotationSection } from "../group_sections/RotationSection";
import { FormatSection } from "../group_sections/FormatSection";

// Dieser Abschnitt ist teilweise KI generiert

export function GroupTransformSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [activeKey, setActiveKey] = useState<string>("offset");

  return (
    <Card>
      <Card.Header className="bg-light">
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k || "offset")}
          className="mb-0"
          justify
        >
          <Tab eventKey="offset" title="Offset" />
          <Tab eventKey="rotation" title="Rotation" />
          <Tab eventKey="format" title="Format" />
        </Tabs>
      </Card.Header>

      <Card.Body className="d-flex flex-column gap-3">
        {activeKey === "offset" && (
          <OffsetSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {activeKey === "rotation" && (
          <RotationSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {activeKey === "format" && (
          <FormatSection selectedDrones={selectedDrones} controller={controller} />
        )}
      </Card.Body>
    </Card>
  );
}

import { Card, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import { GroupOffsetSection } from "../group_sections/GroupOffsetSection";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { GroupRotationSection } from "../group_sections/GroupRotationSection";
import { GroupFormatSection } from "../group_sections/GroupFormatSection";

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
          <GroupOffsetSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {activeKey === "rotation" && (
          <GroupRotationSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {activeKey === "format" && (
          <GroupFormatSection selectedDrones={selectedDrones} controller={controller} />
        )}
      </Card.Body>
    </Card>
  );
}

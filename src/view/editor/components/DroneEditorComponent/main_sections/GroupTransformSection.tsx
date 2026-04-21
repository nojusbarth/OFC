import { Card, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import { OffsetSection } from "../group_sections/OffsetSection";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { RotationSection } from "../group_sections/RotationSection";
import { FormatSection } from "../group_sections/FormatSection";
import { useTranslation } from "react-i18next";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Diese Komponente bündelt Gruppen-Transformationen in Tabs für Offset,
 * Rotation und Formatierung.
 * @param selectedDrones - IDs der aktuell ausgewählten Drohnen.
 * @param controller - Controller mit Zugriff auf Transformationsoperationen.
 * @returns JSX-Karte mit tabbasierter Gruppenbearbeitung.
 */
export function GroupTransformSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const { t } = useTranslation();
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
          <Tab eventKey="offset" title={t("editor.group.tabs.offset")} />
          <Tab eventKey="rotation" title={t("editor.group.tabs.rotation")} />
          <Tab eventKey="format" title={t("editor.group.tabs.format")} />
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

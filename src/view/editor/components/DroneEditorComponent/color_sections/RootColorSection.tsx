import { Card, Tabs, Tab } from "react-bootstrap";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useState } from "react";
import { PlainColorSection } from "./PlainColorSection";
import { RandomColorSection } from "./RandomColorSection";
import { FlickerColorSection } from "./FlickerColorSection";
import { GradientColorSection } from "./GradientColorSection";
import { WaveColorSection } from "./WaveColorSection";


/**
 * Diese Komponente bündelt Farb-Transformationen in Tabs für Offset,
 * Rotation und Formatierung.
 * @param selectedDrones - IDs der aktuell ausgewählten Drohnen.
 * @param controller - Controller mit Zugriff auf Transformationsoperationen.
 * @returns JSX-Karte mit tabbasierter Gruppenbearbeitung.
 */
export function RootColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const [activeKey, setActiveKey] = useState<string>("plain");

  return (
    <Card>
      <Card.Header className="bg-light">
        <div style={{overflowX: "auto", overflowY: "hidden"}}>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k || "plain")}
          className="mb-0 flex-nowrap"
        >
          <Tab eventKey="plain" title="Plain" tabClassName="text-nowrap"/>
          <Tab eventKey="random" title="Random" tabClassName="text-nowrap"/>
          <Tab eventKey="flicker" title="Flicker" tabClassName="text-nowrap"/>
          <Tab eventKey="gradient" title="Gradient" tabClassName="text-nowrap"/>
          <Tab eventKey="wave" title="Wave" tabClassName="text-nowrap"/>
        </Tabs>
      </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column gap-3">
        {activeKey === "plain" && (
          <PlainColorSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {activeKey === "random" && (
          <RandomColorSection
            selectedDrones={selectedDrones}
            controller={controller}
          />
        )}

        {activeKey === "flicker" && (
          <FlickerColorSection selectedDrones={selectedDrones} controller={controller} />
        )}

        { activeKey === "gradient" && (
          <GradientColorSection selectedDrones={selectedDrones} controller={controller} />
        )}

        { activeKey === "wave" && (
          <WaveColorSection selectedDrones={selectedDrones} controller={controller} />
        )}

      </Card.Body>
    </Card>
  );
}
import { useEffect, useState } from "react";
import { Color } from "three";
import { IController } from "../../../controller/interface/IController";
import { Button, Card } from "react-bootstrap";

interface DroneManagerComponentProps {
  // Props
  controller: IController;
}

export default function DroneManagerComponent({
  controller,
}: DroneManagerComponentProps) {
  // State Hooks
  const [allDrones, setAllDrones] = useState<Array<number>>(
    controller.getDrones(),
  );
  const [selectedDrones, setSelectedDrones] = useState<Array<number>>(
    controller.getSelectedDrones(),
  );
  const [collidingDrones, setCollidingDrones] = useState<Array<number>>([]);
  const [colors, setColors] = useState<Map<number, Color>>(getColors());

<<<<<<< HEAD
  // Register Event Handlers
  useEffect(() => {
    controller.getDronesEvent().register(() => {
      setAllDrones(controller.getDrones());
      setColors(getColors());
    });

    controller
      .getCollisionEvent()
      .register((droneIds: Map<number, Map<number, number>>) => {
        setCollidingDrones(Array.from(droneIds.keys()));
      });

    controller
      .getDroneSelectEvent()
      .register((selectedDroneIds: Array<number>) => {
        setSelectedDrones(selectedDroneIds);
      });
  }, [controller]);

  // Helper functions
  function getColors() {
    const colorMap = new Map<number, Color>();
    controller.getDrones().forEach((droneId) => {
      const color = controller.getColor(droneId);
      colorMap.set(droneId, color);
    });
    return colorMap;
  }

  // click handlers
  const onAddDrone = () => {
    controller.addDrone();
    setAllDrones(controller.getDrones());
  };

  const onDroneSelectionChange = (droneId: number) => {
    if (selectedDrones.includes(droneId)) {
      controller.unselectDrone(droneId);
    } else {
      controller.selectDrone(droneId);
    }
    setSelectedDrones(controller.getSelectedDrones());
  };

  return (
    <Card className="rounded-0 border-secondary border-2 border-bottom-0 border-start-0 p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Drohnen ({allDrones.length})</span>
        <Button variant="primary" size="sm" onClick={onAddDrone}>
          <i className="bi bi-plus me-1" />
          Hinzufügen
        </Button>
      </div>

      {/* Drone List */}
      <div className="d-flex gap-3 overflow-auto">
        {allDrones.map((droneId) => (
          <Card
            key={droneId}
            className={`p-3 text-center rounded-3 ${selectedDrones.includes(droneId) ? "border-primary border-2" : "border-secondary border-1"}`}
            style={{ minWidth: "120px", minHeight: "120px", cursor: "pointer" }}
            onClick={() => {
              console.log("Clicked drone with ID:", droneId);
              onDroneSelectionChange(droneId);
            }}
          >
            {/* Color Circle */}
            <div
              className="rounded-circle mx-auto mb-2"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: `#${colors.get(droneId)?.getHexString()}`,
              }}
            />
            {/* ID */}
            <div className="text-muted small">ID: {droneId}</div>
          </Card>
        ))}
      </div>
    </Card>
=======
  return (
    <div
      className="bg-secondary text-light p-3 border-top border-dark"
      style={{ height: "150px" }}
    >
      DroneManager
    </div>
>>>>>>> 98e7e3fcee713862e6a8cf81187be69d34cbab64
  );
}

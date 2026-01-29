import { useEffect, useState } from "react";
import { Color } from "three";
import { IController } from "../../../controller/interface/IController";
import { Button, Card } from "react-bootstrap";

import "./DroneManagerComponent.css";

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

  // Register Event Handlers
  useEffect(() => {
    const onDronesChanged = () => {
      setAllDrones(controller.getDrones());
      setColors(getColors());
    };

    const onCollision = (droneIds: Map<number, Map<number, number>>) => {
      setCollidingDrones(Array.from(droneIds.keys()));
    };

    const onDroneSelected = (selectedDroneIds: Array<number>) => {
      setSelectedDrones(selectedDroneIds);
    };

    controller.getDronesEvent().register(onDronesChanged);
    controller.getCollisionEvent().register(onCollision);
    controller.getDroneSelectEvent().register(onDroneSelected);
  }, []);

  // Helper functions
  function getColors() {
    const colorMap = new Map<number, Color>();
    controller.getDrones().forEach((droneId) => {
      const color = controller.getColor(droneId);
      colorMap.set(droneId, color);
    });
    return colorMap;
  }

  // Click handlers
  const onAddDrone = () => {
    controller.addDrone();
    setAllDrones(controller.getDrones());
  };

  const onRemoveDrone = (droneId: number) => {
    controller.removeDrone(droneId);
  };

  const onDroneSelectionChange = (droneId: number) => {
    if (selectedDrones.includes(droneId)) {
      controller.unselectDrone(droneId);
    } else {
      controller.selectDrone(droneId);
    }
  };

  return (
    <Card
      className="rounded-0 border-2 border-secondary border-start-0 border-end-0 border-bottom-0 d-flex flex-column"
      style={{ height: "100%" }}
    >
      {/* Heading */}
      <Card.Header className="d-flex justify-content-between align-items-center bg-light border-bottom flex-shrink-0">
        <span className="fw-bold">Drohnen ({allDrones.length})</span>
        <Button variant="primary" size="sm" onClick={onAddDrone}>
          <i className="bi bi-plus me-1" />
          Hinzufügen
        </Button>
      </Card.Header>

      {/* Drone List */}
      <Card.Body
        className="p-3 flex-grow-1"
        style={{
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        <div className="row row-cols-auto justify-content-start g-3">
          {allDrones.map((droneId) => {
            const isSelected = selectedDrones.includes(droneId);
            const isColliding = collidingDrones.includes(droneId);
            const color = colors.get(droneId);
            console.log("TEST", droneId, isSelected, isColliding, color); //TODO

            return (
              <div key={droneId} className="drone-manager drone-card col">
                <Card
                  onClick={() => onDroneSelectionChange(droneId)}
                  className={`h-100 text-center ${
                    isSelected
                      ? "border-primary border-2 bg-primary bg-opacity-10"
                      : "border-secondary"
                  } ${isColliding ? "border-danger" : ""}`}
                  style={{
                    cursor: "pointer",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <Card.Body className="d-flex flex-column align-items-center gap-2 p-3">
                    {/* Drone Color */}
                    <div
                      className="rounded-circle border border-secondary"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: color
                          ? `#${color.getHexString()}`
                          : "#888888",
                      }}
                    />

                    {/* Drone ID */}
                    <div className="small fw-medium">ID: {droneId}</div>
                  </Card.Body>

                  {/* Remove Button */}
                  <button
                    className="drone-manager drone-card delete position-absolute top-0 end-0 m-0 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveDrone(droneId);
                    }}
                  >
                    <i className="bi bi-trash" />
                  </button>
                </Card>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

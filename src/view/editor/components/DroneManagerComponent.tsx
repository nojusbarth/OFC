import { useEffect, useState } from "react";
import { Color } from "three";
import { Card } from "react-bootstrap";
import { ITimeController } from "../../../controller/interface/ITimeController";
import { IUndoableController } from "../../../controller/interface/IUndoableController";

import "./DroneManagerComponent.css";

interface DroneManagerComponentProps {
  controller: IUndoableController;
}

export default function DroneManagerComponent({
  controller,
}: DroneManagerComponentProps) {
  /* ---------- Used Controllers ---------- */
  const timerController: ITimeController = controller.getTimeController();

  /* ---------- State Hooks ---------- */
  const [allDrones, setAllDrones] = useState<Array<number>>(
    controller.getDrones(),
  );
  const [selectedDrones, setSelectedDrones] = useState<Array<number>>(
    controller.getSelectedDrones(),
  );
  const [collidingDrones, setCollidingDrones] = useState<Array<number>>([]);
  const [colors, setColors] = useState<Map<number, Color>>(
    new Map(allDrones.map((id) => [id, controller.getColor(id)])),
  );

  /* ---------- Register Events ---------- */
  useEffect(() => {
    const onDronesChanged = (drones: Array<number>) => {
      setAllDrones(drones);
      updateColors();
    };

    const onCollision = (droneIds: Map<number, Map<number, number>>) => {
      setCollidingDrones(Array.from(droneIds.keys()));
    };

    const onDroneSelected = (selectedDroneIds: Array<number>) => {
      setSelectedDrones(selectedDroneIds);
    };

    const onTimeChanged = (newTime: number) => {
      updateColors();
    };

    controller.getDronesEvent().register(onDronesChanged);
    controller.getCollisionEvent().register(onCollision);
    controller.getDroneSelectEvent().register(onDroneSelected);
    timerController.getTimeChangedEvent().register(onTimeChanged);

    return () => {
      controller.getDronesEvent().remove(onDronesChanged);
      controller.getCollisionEvent().remove(onCollision);
      controller.getDroneSelectEvent().remove(onDroneSelected);
      timerController.getTimeChangedEvent().remove(onTimeChanged);
    };
  }, [controller]);

  /* ---------- Helper Functions ---------- */

  const updateColors = () => {
    const newColors = new Map(
      allDrones.map((id) => [id, controller.getColor(id)]),
    );
    setColors(newColors);
  };

  /* ---------- Click Handlers ---------- */
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
      className="d-flex flex-column h-100 w-100 
      rounded-0 border-2 border-secondary border-start-0 border-end-0 border-bottom-0"
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-light border-bottom">
        <span className="fw-bold">Drohnen ({allDrones.length})</span>
        <button
          className="btn btn-primary btn-sm d-flex gap-2"
          onClick={onAddDrone}
        >
          <i className="bi bi-plus" />
          Hinzufügen
        </button>
      </Card.Header>

      <Card.Body className="d-flex flex-column overflow-y-auto p-3">
        {/* Drone List */}
        <div className="row row-cols-auto justify-content-start g-4">
          {allDrones.map((droneId) => {
            const isSelected = selectedDrones.includes(droneId);
            const isColliding = collidingDrones.includes(droneId);
            const color = colors.get(droneId);

            return (
              <>
                {/* Drone Component */}
                <div key={droneId} className="col drone-manager drone-card">
                  <Card
                    onClick={() => onDroneSelectionChange(droneId)}
                    className={` text-center ${
                      isSelected
                        ? "border-primary border-2 bg-primary bg-opacity-10"
                        : "border-secondary"
                    } 
                      ${isColliding ? "border-danger" : ""}`}
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
              </>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

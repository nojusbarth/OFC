import { useEffect, useRef, useState } from "react";
import { Color } from "three";
import { Card } from "react-bootstrap";
import { IUndoableController } from "../../../controller/interface/IUndoableController";

import "./DroneManagerComponent.css";
import { toolTipps } from "../config";
import { IController } from "../../../controller/interface/IController";

/**
 * Erstellt eine Drone Manager Komponente auf der der Nutzer eine Übersicht
 * über die aktuellen Drohnen hat und diese manipulieren kann
 * @param props
 * @param props.controller - Stellt den Controller mit Zugriff auf die Logik bereit
 * @returns JSX-Element der Drone Manager Komponente
 */
export function DroneManagerComponent({
    controller,
}: {
    controller: IUndoableController;
}) {
    /* ---------- State Hooks ---------- */
    const [allDrones, setAllDrones] = useState<Array<number>>(
        controller.getDrones(),
    );
    const [selectedDrones, setSelectedDrones] = useState<Array<number>>(
        controller.getSelectedDrones(),
    );
    const [collidingDrones, setCollidingDrones] = useState<Array<number>>(
        Array.from(controller.getCollisions().keys()),
    );

    /* ---------- Register Events ---------- */
    useEffect(() => {
        const onDronesChanged = (drones: Array<number>) => {
            setAllDrones(drones);
        };

        const onCollisionChanged = (
            droneIds: Map<number, Map<number, number>>,
        ) => {
            setCollidingDrones(Array.from(droneIds.keys()));
        };

        const onDroneSelectedChange = (selectedDroneIds: Array<number>) => {
            setSelectedDrones(selectedDroneIds);
        };

        controller.getDronesEvent().register(onDronesChanged);
        controller.getCollisionEvent().register(onCollisionChanged);
        controller.getDroneSelectEvent().register(onDroneSelectedChange);

        return () => {
            controller.getDronesEvent().remove(onDronesChanged);
            controller.getCollisionEvent().remove(onCollisionChanged);
            controller.getDroneSelectEvent().remove(onDroneSelectedChange);
        };
    }, [controller]);

    /* ---------- Click Handlers ---------- */
    const onAddDrone = () => {
        controller.addDrone();
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
            <Card.Header className="d-flex justify-content-between align-items-center border-bottom">
                <span className="fw-bold">Drohnen ({allDrones.length})</span>
                <button
                    className="btn btn-primary btn-sm d-flex gap-2"
                    title={toolTipps.DRONE_ADD}
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
                        return (
                            <DroneCard
                                key={droneId}
                                droneId={droneId}
                                isSelected={selectedDrones.includes(droneId)}
                                onDroneSelectionChange={onDroneSelectionChange}
                                isColliding={collidingDrones.includes(droneId)}
                                onRemoveDrone={onRemoveDrone}
                                controller={controller}
                            />
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );
}

function DroneCard({
    droneId,
    isSelected,
    onDroneSelectionChange,
    isColliding,
    onRemoveDrone,
    controller,
}: {
    droneId: number;
    isSelected: boolean;
    onDroneSelectionChange: (droneId: number) => void;
    isColliding: boolean;
    onRemoveDrone: (droneId: number) => void;
    controller: IController;
}) {
    const [isVisible, setIsVisible] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const [color, setColor] = useState<Color | null>(null);

    useEffect(() => {
        // only update color if the card is visible to optimize performance
        if (!isVisible) return;
        const updateColor = () => {
            const newColor = controller.getColor(droneId);
            if (!color || !newColor.equals(color)) {
                setColor(newColor);
            }
        };

        updateColor();

        controller
            .getTimeController()
            .getTimeChangedEvent()
            .register(updateColor);
        controller.getDroneChangedEvent().register(updateColor);

        return () => {
            controller
                .getTimeController()
                .getTimeChangedEvent()
                .remove(updateColor);
            controller.getDroneChangedEvent().remove(updateColor);
        };
    }, [controller, droneId, isVisible]);

    return (
        <>
            {/* Drone Component */}
            <div
                ref={ref}
                className="col drone-manager drone-card"
                title={
                    isSelected
                        ? toolTipps.DRONE_UNSELECT
                        : toolTipps.DRONE_SELECT
                }
            >
                <Card
                    onClick={() => onDroneSelectionChange(droneId)}
                    className={` text-center 
                                            ${isSelected
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
                        <div className="small fw-medium font-monospace">{droneId}</div>
                    </Card.Body>

                    {/* Remove Button */}
                    <button
                        className="drone-manager drone-card delete position-absolute t-1 end-0 m-0 p-1"
                        title={toolTipps.DRONE_DELETE}
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
}

import { useEffect, useRef, useState, memo } from "react";
import { Color } from "three";
import { Card } from "react-bootstrap";

import "./DroneManagerComponent.css";
import { toolTipps } from "../config";
import { IController } from "../../../controller/interface/IController";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Stellt eine einzelne Drohnenkarte dar, inklusive Auswahl, Gruppenanzeige,
 * Drag-Handle und Löschaktion.
 * @param droneId - Eindeutige ID der dargestellten Drohne.
 * @param controller - Controller mit Zugriff auf Drohnenzustand und Aktionen.
 * @param onDroneClick - Callback für Klick/Mehrfachauswahl auf die Karte.
 * @param dragListeners - DnD-Listener für den Drag-Handle.
 * @returns JSX-Element einer interaktiven Drohnenkarte.
 */
export function DroneCard({
  droneId,
  controller,
  onDroneClick,
  dragListeners,
}: {
  droneId: number;
  controller: IController;
  onDroneClick: (droneId: number, isShift: boolean) => void;
  dragListeners?: any;
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
  const [groupId, setGroupId] = useState<number | undefined>(undefined);
  const [isColliding, setIsColliding] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  //Gruppenfarbe in Abhängigkeit von groupId
  const groupColor = groupId
    ? `hsl(${(groupId * 137) % 360}, 65%, 75%)`
    : undefined;

  useEffect(() => {
    // only update color if the card is visible to optimize performance
    if (!isVisible) return;
    const updateColor = () => {
      const newColor = controller.getColor(droneId);
      if (!color || !newColor.equals(color)) {
        setColor(newColor);
      }
    };

    const updateGroup = () => {
      const newGroupId = controller.getGroupManager().getDroneGroupId(droneId);
      setGroupId(newGroupId);
    };

    const updateCollisions = (
      collidingDrones: Map<number, Map<number, number>>,
    ) => {
      const isColliding = collidingDrones.has(droneId);
      setIsColliding(isColliding);
    };

    const updateSelection = (selectedDroneIds: number[]) => {
      setIsSelected(selectedDroneIds.includes(droneId));
    };

    updateColor();
    updateGroup();
    updateCollisions(controller.getCollisions());
    updateSelection(controller.getSelectedDrones());

    controller.getTimeController().getTimeChangedEvent().register(updateColor);
    controller.getDroneChangedEvent().register(updateColor);
    controller.getGroupManager().getGroupEvent().register(updateGroup);
    controller.getCollisionEvent().register(updateCollisions);
    controller.getDroneSelectEvent().register(updateSelection);

    return () => {
      controller.getTimeController().getTimeChangedEvent().remove(updateColor);
      controller.getDroneChangedEvent().remove(updateColor);
      controller.getGroupManager().getGroupEvent().remove(updateGroup);
      controller.getCollisionEvent().remove(updateCollisions);
      controller.getDroneSelectEvent().remove(updateSelection);
    };
  }, [controller, droneId, isVisible]);

  return (
    <>
      {/* Drone Component */}
      <div
        ref={ref}
        className="col drone-manager drone-card"
        style={{
          backgroundColor: groupColor,
          borderRadius: "12px",
          padding: "4px",
        }}
        title={isSelected ? toolTipps.DRONE_UNSELECT : toolTipps.DRONE_SELECT}
      >
        <Card
          onClick={(e) => onDroneClick(droneId, e.shiftKey)}
          onDoubleClick={(e) => {
            e.stopPropagation();
            controller.selectGroupOfDrone(droneId);
          }}
          className={`text-center position-relative
    ${
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
          {/* Drag Handle – oben links absolut */}
          <div
            {...dragListeners}
            style={{
              cursor: "grab",
              position: "absolute",
              top: "4px",
              left: "6px",
              zIndex: 2,
            }}
          >
            <i className="bi bi-grip-vertical" />
          </div>

          <Card.Body className="d-flex flex-column justify-content-center align-items-center gap-2 p-3 h-100">
            {/* Drone Color */}
            <div
              className="rounded-circle border border-secondary"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: color ? `#${color.getHexString()}` : "#888888",
              }}
            />

            {/* Drone ID */}
            <div className="small fw-medium font-monospace">{droneId}</div>
          </Card.Body>

          {/* Remove Button */}
          <button
            className="drone-manager drone-card delete position-absolute top-0 end-0 m-1 p-1"
            title={toolTipps.DRONE_DELETE}
            onClick={(e) => {
              e.stopPropagation();
              controller.removeDrone(droneId);
            }}
          >
            <i className="bi bi-trash" />
          </button>
        </Card>
      </div>
    </>
  );
}
const MemoizedDroneCard = memo(DroneCard);

//Drag and Drop Card
/**
 * Umhüllt `DroneCard` mit Sortierverhalten aus `@dnd-kit`.
 * @param props - Props der zugrunde liegenden Drohnenkarte.
 * @returns JSX-Wrapper mit DnD-Attributen für Sortierung.
 */
export function SortableDroneCard(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.droneId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <MemoizedDroneCard {...props} dragListeners={listeners} />
    </div>
  );
}

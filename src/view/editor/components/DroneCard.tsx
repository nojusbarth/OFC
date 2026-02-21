import { useEffect, useRef, useState, memo } from "react";
import { Color } from "three";
import { Card } from "react-bootstrap";

import "./DroneManagerComponent.css";
import { toolTipps } from "../config";
import { IController } from "../../../controller/interface/IController";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function DroneCard({
  droneId,
  isSelected,
  onDroneSelectionChange,
  isColliding,
  onRemoveDrone,
  controller,
  dragListeners,
  groupId,
}: {
  droneId: number;
  isSelected: boolean;
  onDroneSelectionChange: (droneId: number) => void;
  isColliding: boolean;
  onRemoveDrone: (droneId: number) => void;
  controller: IController;
  dragListeners?: any;
  groupId?: number;
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

    updateColor();

    controller.getTimeController().getTimeChangedEvent().register(updateColor);
    controller.getDroneChangedEvent().register(updateColor);

    return () => {
      controller.getTimeController().getTimeChangedEvent().remove(updateColor);
      controller.getDroneChangedEvent().remove(updateColor);
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
          onClick={() => onDroneSelectionChange(droneId)}
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

//Drag and Drop Card
export function _SortableDroneCard(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.droneId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <DroneCard {...props} dragListeners={listeners} />
    </div>
  );
}
export const SortableDroneCard = memo(_SortableDroneCard);

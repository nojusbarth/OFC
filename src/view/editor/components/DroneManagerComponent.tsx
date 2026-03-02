import { useEffect, useRef, useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  MeasuringStrategy,
} from "@dnd-kit/core";

import { Card } from "react-bootstrap";
import { IUndoableController } from "../../../controller/interface/IUndoableController";

import "./DroneManagerComponent.css";
import { toolTipps } from "../config";
import { SortableDroneCard } from "./DroneCard";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

// Dieser Abschnitt ist teilweise KI generiert

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

  //Shif select für Mehrfachauswahl
  const [lastClickedDrone, setLastClickedDrone] = useState<number | null>(null);

  //Drag und Drop
  const [orderedDrones, setOrderedDrones] = useState<number[]>([]);

  //Drag Optimierung
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  /* ---------- Register Events ---------- */
  useEffect(() => {
    controller.getDronesEvent().register(setAllDrones);

    return () => {
      controller.getDronesEvent().remove(setAllDrones);
    };
  }, [controller]);

  // Update Drag und Drop Reihenfolge, wenn sich die Drohnenliste ändert
  useEffect(() => {
    setOrderedDrones(allDrones);
  }, [allDrones]);

  /* ---------- Click Handlers ---------- */
  const onAddDrone = useCallback(() => {
    controller.addDrone();
  }, [controller]);

  //Neue Gruppe erstellen
  const onGroupCreate = useCallback(() => {
    const selectedDroneIds = controller.getSelectedDrones(); // aus State
    if (selectedDroneIds.length === 0) return;

    controller.clearSelection(); // Auswahl zurücksetzen, da Drohnen jetzt in Gruppe sind

    const groupId = controller.getGroupManager().createGroup();
    controller.getGroupManager().addDronesToGroup(selectedDroneIds, groupId);
  }, [controller]);

  //Drohnen aus Gruppe entfernen
  const onGroupRemove = useCallback(() => {
    const selectedDroneIds = controller.getSelectedDrones(); // aus State

    if (selectedDroneIds.length === 0) return;

    controller.clearSelection(); // Auswahl zurücksetzen, da Drohnen jetzt nicht in Gruppe sind

    controller.getGroupManager().removeDronesFromGroup(selectedDroneIds);
  }, [controller]);

  const onDroneSelectionChange = useCallback(
    (droneId: number, isShift: boolean) => {
      // SHIFT + es gibt eine Referenz-Drohne
      if (isShift && lastClickedDrone !== null) {
        const startIndex = orderedDrones.indexOf(lastClickedDrone);
        const endIndex = orderedDrones.indexOf(droneId);

        if (startIndex === -1 || endIndex === -1) return;

        const [from, to] =
          startIndex < endIndex
            ? [startIndex, endIndex]
            : [endIndex, startIndex];

        const range = orderedDrones.slice(from, to + 1);
        controller.clearSelection();
        range.forEach((id) => {
          controller.selectDrone(id);
        });

        return;
      }
      const selectedDrones = controller.getSelectedDrones();

      // Normaler Toggle
      if (selectedDrones.includes(droneId)) {
        controller.unselectDrone(droneId);
      } else {
        controller.selectDrone(droneId);
      }

      setLastClickedDrone(droneId);
    },
    [controller, orderedDrones, lastClickedDrone],
  );

  /* ---------- Drag Handler ---------- */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setOrderedDrones((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over.id as number);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Card
      className="d-flex flex-column h-100 w-100 
    rounded-0 border-2 border-secondary border-start-0 border-end-0 border-bottom-0"
    >
      <Card.Header className="d-flex align-items-center border-bottom">
        <span className="fw-bold">Drohnen ({allDrones.length})</span>
        <div className="d-flex gap-2 ms-auto">
          <button
            className="btn btn-primary btn-sm d-flex gap-2"
            title={toolTipps.DRONE_ADD}
            onClick={onAddDrone}
          >
            <i className="bi bi-plus" />
            Hinzufügen
          </button>

          <button className="btn btn-sm btn-secondary" onClick={onGroupCreate}>
            Gruppieren
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={onGroupRemove}
          >
            Gruppe auflösen
          </button>
        </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column overflow-y-auto p-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.WhileDragging,
            },
          }}
        >
          <SortableContext items={orderedDrones} strategy={rectSortingStrategy}>
            <div className="row row-cols-auto justify-content-start g-4">
              {orderedDrones.map((droneId) => (
                <SortableDroneCard
                  key={droneId}
                  droneId={droneId}
                  controller={controller}
                  onDroneClick={onDroneSelectionChange}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card.Body>
    </Card>
  );
}

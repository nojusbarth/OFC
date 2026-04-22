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

import { Card, Dropdown } from "react-bootstrap";
import { IUndoableController } from "../../../controller/interface/IUndoableController";

import "./DroneManagerComponent.css";
import { toolTipps } from "../config";
import { SortableDroneCard } from "./DroneCard";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { clearAndSelectDrones, clearSelected } from "../../../controller/interface/ControllerUtils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  /* ---------- State Hooks ---------- */
  const [allDrones, setAllDrones] = useState<Array<number>>(
    controller.getDrones(),
  );
  const [droneAddCountInput, setDroneAddCountInput] = useState<string>("1");

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
    setOrderedDrones((previousOrder) => {
      const incomingIds = new Set(allDrones);

      // Behalte die bestehende DnD-Reihenfolge für weiterhin vorhandene Drohnen.
      const keptOrder = previousOrder.filter((id) => incomingIds.has(id));
      const keptIds = new Set(keptOrder);

      // Hänge neu hinzugekommene Drohnen hinten an.
      const appendedIds = allDrones.filter((id) => !keptIds.has(id));

      return [...keptOrder, ...appendedIds];
    });
  }, [allDrones]);

  /* ---------- Click Handlers ---------- */
  const onAddDrone = useCallback(() => {
    controller.addDrone();
  }, [controller]);

  const onAddMultipleDrones = useCallback(() => {
    const count = Math.max(1, Math.floor(Number(droneAddCountInput) || 1));
    for (let i = 0; i < count; i++) {
      controller.addDrone();
    }
  }, [controller, droneAddCountInput]);

  //Neue Gruppe erstellen
  const onGroupCreate = useCallback(() => {
    const selectedDroneIds = controller.getSelectedDrones(); // aus State
    if (selectedDroneIds.length === 0) return;

    clearSelected(controller);

    const groupId = controller.getGroupManager().createGroup();
    controller.getGroupManager().addDronesToGroup(selectedDroneIds, groupId);
  }, [controller]);

  //Drohnen aus Gruppe entfernen
  const onGroupRemove = useCallback(() => {
    const selectedDroneIds = controller.getSelectedDrones(); // aus State

    if (selectedDroneIds.length === 0) return;

    clearSelected(controller);

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
        clearAndSelectDrones(controller, range);

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
        <span className="fw-bold">{t("editor.droneManager.title", { count: allDrones.length })}</span>
        <div className="d-flex gap-2 ms-auto">
          <div className="btn-group">
            <button
              className="btn btn-primary btn-sm d-flex gap-2 align-items-center"
              title={t(toolTipps.DRONE_ADD)}
              onClick={onAddDrone}
            >
              <i className="bi bi-plus" />
              {t("editor.droneManager.add")}
            </button>
            <Dropdown align="end">
              <Dropdown.Toggle
                split
                variant="primary"
                size="sm"
                id="drone-add-options"
                title={t("editor.droneManager.openAddOptions")}
              >
                <span className="visually-hidden">{t("editor.droneManager.openAddOptions")}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="p-3" style={{ minWidth: "220px" }}>
                <label className="form-label small mb-1" htmlFor="drone-add-count-input">
                  {t("editor.droneManager.amountLabel")}
                </label>
                <input
                  id="drone-add-count-input"
                  type="number"
                  min={1}
                  step={1}
                  className="form-control form-control-sm mb-2"
                  value={droneAddCountInput}
                  onChange={(e) => setDroneAddCountInput(e.target.value)}
                />
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={onAddMultipleDrones}
                >
                  {t("editor.droneManager.addMultiple", {
                    count: Math.max(1, Math.floor(Number(droneAddCountInput) || 1)),
                  })}
                </button>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <button className="btn btn-sm btn-secondary" onClick={onGroupCreate}>
            {t("editor.droneManager.group")}
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={onGroupRemove}
          >
            {t("editor.droneManager.ungroup")}
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

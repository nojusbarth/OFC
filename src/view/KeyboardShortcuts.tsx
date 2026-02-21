import { useEffect } from "react";
import { IUndoableController } from "../controller/interface/IUndoableController";

/**
 * Verwaltet Tastaturkürzel für den gegebenen Controller und reagiert auf Benutzer-Eingaben
 * @param props
 * @param props.controller - Der Controller auf dem die Aktionen ausgeführt werden sollen
 * @returns
 */
export function KeyboardShortcuts({
  controller,
}: {
  controller: IUndoableController;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        controller.getProject().saveProject();
        return;
      }
      if (event.ctrlKey && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) {
          controller.redo();
        } else {
          controller.undo();
        }
        return;
      }
      if (event.ctrlKey && event.shiftKey && event.key === "n") {
        event.preventDefault();
        controller.addDrone();
        return;
      }
      if (event.ctrlKey && event.key === "a") {
        event.preventDefault();
        controller
          .getDrones()
          .forEach((drone) => controller.selectDrone(drone));
        return;
      }
      if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        controller.getProject().exportWayPointData();
        return;
      }
      if (event.ctrlKey && event.key === "r") {
        event.preventDefault();
        if (controller.getProject().getRecordingRunning()) {
          controller.getProject().stopRecording();
        } else {
          controller.getProject().startRecording();
        }
        return;
      }

      let newTime;
      switch (event.key) {
        case "Delete":
          controller
            .getSelectedDrones()
            .forEach((drone) => controller.removeDrone(drone));
          break;
        case "Escape":
          controller
            .getSelectedDrones()
            .forEach((drone) => controller.unselectDrone(drone));
          break;
        case "j":
        case "ArrowLeft":
          newTime = controller.getTimeController().getTime() - 1;
          newTime = Math.round(newTime);
          controller.getTimeController().setTime(newTime);
          break;
        case "l":
        case "ArrowRight":
          newTime = controller.getTimeController().getTime() + 0.6;
          newTime = Math.round(newTime);
          controller.getTimeController().setTime(newTime);
          break;
        case "k":
        case " ":
          if (controller.getTimeController().getAnimationRunning()) {
            controller.getTimeController().stopAnimation();
          } else {
            controller.getTimeController().startAnimation();
          }
          break;
        case "i":
          controller.getTimeController().stopAnimation();
          controller.getTimeController().setTime(0);
          break;
        default:
          return;
      }
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [controller]);
  return <></>;
}

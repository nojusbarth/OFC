import { useEffect } from "react";
import { IUndoableController } from "../controller/interface/IUndoableController";

export function KeyboardShortcuts({ controller }: { controller: IUndoableController }) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                controller.getProject().saveProject();
            }
            if (event.ctrlKey && event.key.toLowerCase() === 'z') {
                event.preventDefault();
                if (event.shiftKey) {
                    controller.redo();
                } else {
                    controller.undo();
                }
            }
            if (event.ctrlKey && event.key === 'n') {
                event.preventDefault();
                controller.addDrone();
            }
            // console.log(event.key);
            let newTime;
            switch (event.key) {
                case 'Delete':
                case 'Backspace':
                    controller.getSelectedDrones().forEach(id => controller.removeDrone(id));
                    break;
                case 'j':
                case 'ArrowLeft':
                    newTime = controller.getTimeController().getTime() - 1;
                    newTime = Math.round(newTime);
                    controller.getTimeController().setTime(newTime);
                    break;
                case 'l':
                case 'ArrowRight':
                    newTime = controller.getTimeController().getTime() + 0.6;
                    newTime = Math.round(newTime);
                    controller.getTimeController().setTime(newTime);
                    break;
                case 'k':
                case ' ':
                    if (controller.getTimeController().getAnimationRunning()) {
                        controller.getTimeController().stopAnimation();
                    } else {
                        controller.getTimeController().startAnimation();
                    }
                    break;
                case 'i':
                    controller.getTimeController().stopAnimation();
                    controller.getTimeController().setTime(0);
                    break;
                default:
                    return;
            }
            event.preventDefault();
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [controller]);
    return (<></>);
}
import type { IController } from "./IController";

/**
 * Erweiterte Controller-Schnittstelle mit Rückgängig-/Wiederherstellen-Funktionalität.
 * Ermöglicht das Rückgängigmachen und erneute Anwenden von Änderungen am Projektzustand.
 */
export interface IUndoableController extends IController {
    /**
     * Macht die letzte Aktion rückgängig.
     */
    undo(): void;
    
    /**
     * Stellt die letzte rückgängig gemachte Aktion wieder her.
     */
    redo(): void;
}
import {IAction} from "./entity/IAction";

/**
 * Das Undo-Repository kümmert sich um das speichern und laden von Nutzerinteraktionen.
 */
export interface IUndoRepository {

    /**
     * Gibt die letzte Action aus und löscht diese aus dem Stack
     * @return die letzte `Action` falls vorhanden, ansonsten `null`
     */
    popAction(): IAction | null

    /**
     * Fügt eine Aktion hinzu.
     * @param action Die Aktion
     */
    addAction(action: IAction): void
}
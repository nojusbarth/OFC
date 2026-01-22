import {IAction} from "../entity/Action";
import {IUndoRepository} from "./IUndoRepository";

class UndoRepository implements IUndoRepository {
    private actions: IAction[] = [];

    popAction(): IAction | null {
        return this.actions.pop()!
    }

    addAction(action: IAction): void {
        this.actions.push(action)
    }
}
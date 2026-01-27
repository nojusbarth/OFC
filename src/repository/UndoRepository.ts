import {IAction} from "./entity/IAction";
import {IUndoRepository} from "./IUndoRepository";

export class UndoRepository implements IUndoRepository {
    private actions: IAction[] = [];

    popAction(): IAction | null {
        return this.actions.pop()!
    }

    addAction(action: IAction): void {
        this.actions.push(action)
    }
}
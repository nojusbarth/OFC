import {IAction} from "../entity/Action";

export interface IUndoRepository {
    popAction(): IAction | null
    addAction(action: IAction): void
}

class UndoRepository implements IUndoRepository {
    private actions: IAction[] = [];

    popAction(): IAction | null {
        return this.actions.pop()!
    }

    addAction(action: IAction): void {
        this.actions.push(action)
    }

}
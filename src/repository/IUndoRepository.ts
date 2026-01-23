import {IAction} from "./entity/IAction";

export interface IUndoRepository {
    popAction(): IAction | null
    addAction(action: IAction): void
}
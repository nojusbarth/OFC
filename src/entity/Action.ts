import {ActionType} from "./ActionType";
import {IAction} from "./IAction";

class Action implements IAction {
    private readonly data: any
    private readonly time: number
    private readonly type: ActionType

    constructor(data: any, time: number, type: ActionType) {
        this.data = data
        this.time = time
        this.type = type
    }

    getData(): any {
        return this.data
    }

    getTime(): number {
        return this.time
    }

    getType(): ActionType {
        return this.type;
    }
}
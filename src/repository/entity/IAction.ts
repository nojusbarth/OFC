import {ActionType} from "./ActionType";

export interface IAction {
    getData(): any
    getTime(): number
    getType(): ActionType
}
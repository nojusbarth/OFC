export interface IAction {
    getType(): ActionType;
    getData(): any;
    getTime(): number;
}

export class Action implements IAction {
    private type: ActionType;
    private data: any;
    private time: number;

    constructor(type: ActionType, data: any, time: number) {
        this.type = type;
        this.data = data;
        this.time = time;
    }

    getType(): ActionType {
        return this.type;
    }

    getData(): any {
        return this.data;
    }

    getTime(): number {
        return this.time;
    }
}

export enum ActionType {
    ADD_DRONE = 'ADD_DRONE',
    REMOVE_DRONE = 'REMOVE_DRONE',
    ADD_POSITION_KEYFRAME = 'ADD_POSITION_KEYFRAME',
    REMOVE_POSITION_KEYFRAME = 'REMOVE_POSITION_KEYFRAME',
    ADD_COLOR_KEYFRAME = 'ADD_COLOR_KEYFRAME',
    REMOVE_COLOR_KEYFRAME = 'REMOVE_COLOR_KEYFRAME',
    SELECT_DRONE = 'SELECT_DRONE',
    UNSELECT_DRONE = 'UNSELECT_DRONE',
}
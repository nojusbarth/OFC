export interface IAction {
    getData(): any
    getTime(): number
    getType(): ActionType
}

class Action implements IAction {
    private data: any
    private time!: number
    private type!: ActionType

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

const enum ActionType {
    ADD_DRONE = 'ADD_DRONE',
    REMOVE_DRONE = 'REMOVE_DRONE',
    ADD_POSITION_KEYFRAME = 'ADD_POSITION_KEYFRAME',
    REMOVE_POSITION_KEYFRAME = 'REMOVE_POSITION_KEYFRAME',
    ADD_COLOR_KEYFRAME = 'ADD_COLOR_KEYFRAME',
    REMOVE_COLOR_KEYFRAME = 'REMOVE_COLOR_KEYFRAME',
    SELECT_DRONE = 'SELECT_DRONE',
    UNSELECT_DRONE = 'UNSELECT_DRONE',
}
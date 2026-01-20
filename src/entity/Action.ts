export interface IAction {

}

class Action implements IAction {
    data: any
    time!: number
    type!: ActionType
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
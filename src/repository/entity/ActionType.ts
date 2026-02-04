/**
 * Beschreibt eine Aktion in `Action` und ordnet es einem eindeutigen Typ zu.
 */
export const enum ActionType {
    /**
     * Eine Drohne wird hinzugefügt.
     */
    ADD_DRONE = 'ADD_DRONE',
    /**
     * Eine Drohne wird entfernt.
     */
    REMOVE_DRONE = 'REMOVE_DRONE',
    /**
     * Ein `PositionKeyFrame` wird hinzugefügt
     */
    ADD_POSITION_KEYFRAME = 'ADD_POSITION_KEYFRAME',
    /**
     * Ein `PositionKeyFrame` wird entfernt.
     */
    REMOVE_POSITION_KEYFRAME = 'REMOVE_POSITION_KEYFRAME',
    /**
     * Ein `ColorKeyFrame` wird hinzugefügt
     */
    ADD_COLOR_KEYFRAME = 'ADD_COLOR_KEYFRAME',
    /**
     * Ein `ColorKeyFrame` wird hinzugefügt
     */
    REMOVE_COLOR_KEYFRAME = 'REMOVE_COLOR_KEYFRAME',
    /**
     * Eine Drohne wird ausgewählt.
     */
    SELECT_DRONE = 'SELECT_DRONE',
    /**
     * Eine Drohne wird nicht mehr ausgewählt.
     */
    UNSELECT_DRONE = 'UNSELECT_DRONE',
}
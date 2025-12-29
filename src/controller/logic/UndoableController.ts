import type { Vector3, Color } from "three";
import type { Collision } from "../interface/Collision";
import type { ColorKeyFrame } from "../interface/ColorKeyFrame";
import type { IController } from "../interface/IController";
import type { IProject } from "../interface/IProject";
import type { ISettings } from "../interface/ISettings";
import type { ITimeController } from "../interface/ITimeController";
import type { OFCEvent } from "../interface/OFCEvent";
import type { PositionKeyFrame } from "../interface/PositionKeyFrame";

export class UndoableController implements IController {
    private controller: IController;
    private undoStack: Action[] = [];
    private redoStack: Action[] = [];
    private idRemapping: Map<number, number> = new Map();
    private undoFlag: boolean = false; // indicates if we are currently performing an undo
    private redoFlag: boolean = false; // indicates if we are currently performing a redo

    constructor(controller: IController) {
        this.controller = controller;
    }

    undo(): void {
        const action = this.undoStack.pop();
        if (!action) return;

        this.undoFlag = true;
        this._reverseAction(action);
        this.undoFlag = false;
    }

    redo(): void {
        const action = this.redoStack.pop();
        if (!action) return;

        this.redoFlag = true;
        this._reverseAction(action);
        this.redoFlag = false;
    }

    private _getRemappedId(id: number): number {
        while (this.idRemapping.has(id)) {
            id = this.idRemapping.get(id)!;
        }
        return id;
    }

    private _reverseAction(action: Action): void {
        this.controller.getTimeController().setTime(action.time);

        switch (action.type) {
            case ActionType.AddDrone: {
                const droneId = action.data.droneId;
                this.removeDrone(droneId);
                break;
            }

            case ActionType.RemoveDrone: {
                const droneData = action.data;
                const newId = this.addDrone();
                this.idRemapping.set(droneData.id, newId);
                for (const pkf of droneData.positionKeyFrames) {
                    this.controller.addPositionKeyFrame(newId, pkf.getPos());
                }
                for (const ckf of droneData.colorKeyFrames) {
                    this.controller.addColorKeyFrame(newId, ckf.getColor());
                }
                break;
            }

            case ActionType.AddPositionKeyFrame: {
                const id = this._getRemappedId(action.data.id);
                const previousPosition = action.data.previousPosition;
                if (previousPosition !== undefined) {
                    this.addPositionKeyFrame(id, previousPosition);
                } else {
                    const keyFrame = this._findKeyFrameAtTime(
                        this.controller.getPositionKeyFrames(id),
                        action.time);
                    if (keyFrame) {
                        this.removePositionKeyFrame(id, keyFrame);
                    }
                }
                break;
            }

            case ActionType.RemovePositionKeyFrame: {
                const id = this._getRemappedId(action.data.id);
                const keyFrame: PositionKeyFrame = action.data.keyFrame;
                this.addPositionKeyFrame(id, keyFrame.getPos());
                break;
            }

            case ActionType.AddColorKeyFrame: {
                const id = this._getRemappedId(action.data.id);
                const previousColor = action.data.previousColor;
                if (previousColor !== undefined) {
                    this.addColorKeyFrame(id, previousColor);
                } else {
                    const keyFrame = this._findKeyFrameAtTime(
                        this.controller.getColorKeyFrames(id),
                        action.time);
                    if (keyFrame) {
                        this.removeColorKeyFrame(id, keyFrame);
                    }
                }
                break;
            }
            
            case ActionType.RemoveColorKeyFrame: {
                const id = this._getRemappedId(action.data.id);
                const keyFrame: ColorKeyFrame = action.data.keyFrame;
                this.addColorKeyFrame(id, keyFrame.getColor());
                break;
            }

            case ActionType.selectedDrone: {
                const previous = action.data.previous;
                this.selectDrone(previous);
                break;
            }
        }
    }

    private _pushAction(type: ActionType, data: any): void {
        const action = new Action(type, data, this._currentTime());
        if (this.undoFlag) {
            this.redoStack.push(action);
            return;
        }

        this.undoStack.push(action);
        if (!this.redoFlag) {
            this.redoStack = [];
        }
    }

    private _currentTime(): number {
        return this.controller.getTimeController().getTime();
    }

    private _findKeyFrameAtTime<KeyFrame extends PositionKeyFrame | ColorKeyFrame>(keyFrames: KeyFrame[], time: number): KeyFrame | null {
        for (const keyFrame of keyFrames) {
            if (keyFrame.getTime() === time) {
                return keyFrame;
            }
        }
        return null;
    }

    getSettings(): ISettings {
        return this.controller.getSettings();
    }
    
    getTimeController(): ITimeController {
        return this.controller.getTimeController();
    }
    
    getProject(): IProject {
        return this.controller.getProject();
    }
    
    addDrone(): number {
        const droneId = this.controller.addDrone();
        this._pushAction(ActionType.AddDrone, { droneId });
        return droneId;
    }
    
    removeDrone(id: number): void {
        const droneData = {
            id: id,
            positionKeyFrames: this.controller.getPositionKeyFrames(id),
            colorKeyFrames: this.controller.getColorKeyFrames(id)
        };
        this._pushAction(ActionType.RemoveDrone, droneData);
        this.controller.removeDrone(id);
    }
    
    getDrones(): number[] {
        return this.controller.getDrones();
    }
    
    selectDrone(id: number): void {
        const previous = this.controller.getSelectedDrone();
        this.controller.selectDrone(id);
        this._pushAction(ActionType.selectedDrone, { previous });
    }
    
    getSelectedDrone(): number {
        return this.controller.getSelectedDrone();
    }
    
    getPositionKeyFrames(id: number): PositionKeyFrame[] {
        return this.controller.getPositionKeyFrames(id);
    }
    
    getPosition(id: number): Vector3 {
        return this.controller.getPosition(id);
    }
    
    getPositionAt(id: number, time: number): Vector3 {
        return this.controller.getPositionAt(id, time);
    }
    
    addPositionKeyFrame(id: number, position: Vector3): void {
        const keyFrames = this.controller.getPositionKeyFrames(id);
        const previousPosition = this._findKeyFrameAtTime(keyFrames, this._currentTime())?.getPos();

        this._pushAction(ActionType.AddPositionKeyFrame, { id, previousPosition });
        this.controller.addPositionKeyFrame(id, position);
    }
    
    removePositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
        if (this._findKeyFrameAtTime(this.controller.getPositionKeyFrames(id), keyFrame.getTime()) !== null) {
            // only undo if keyframe existed
            this._pushAction(ActionType.RemovePositionKeyFrame, { id, keyFrame });
        }
        this.controller.removePositionKeyFrame(id, keyFrame);
    }

    
    getColorKeyFrames(id: number): ColorKeyFrame[] {
        return this.controller.getColorKeyFrames(id);
    }
    
    getColor(id: number): Color {
        return this.controller.getColor(id);
    }
    
    getColorAt(id: number, time: number): Color {
        return this.controller.getColorAt(id, time);
    }
    
    addColorKeyFrame(id: number, color: Color): void {
        const keyFrames = this.controller.getColorKeyFrames(id);
        const previousColor = this._findKeyFrameAtTime(keyFrames, this._currentTime())?.getColor();
        
        this._pushAction(ActionType.AddColorKeyFrame, { id, previousColor });
        this.controller.addColorKeyFrame(id, color);
    }
    
    removeColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
        if (this._findKeyFrameAtTime(this.controller.getColorKeyFrames(id), keyFrame.getTime()) !== null) {
            // only undo if keyframe existed
            this._pushAction(ActionType.RemoveColorKeyFrame, { id, keyFrame });
        }
        this.controller.removeColorKeyFrame(id, keyFrame);
    }
    
    getDroneEvent(id: number): OFCEvent<number> {
        return this.controller.getDroneEvent(id);
    }
    
    getDronesEvent(): OFCEvent<number[]> {
        return this.controller.getDronesEvent();
    }
    
    getCollisionEvent(): OFCEvent<Collision> {
        return this.controller.getCollisionEvent();
    }
    
    getDroneSelectEvent(): OFCEvent<number> {
        return this.controller.getDroneSelectEvent();
    }
}

class Action {
    type: ActionType;
    data: any;
    time: number;

    constructor(type: ActionType, data: any, time: number) {
        this.type = type;
        this.data = data;
        this.time = time;
    }
}

enum ActionType {
    AddDrone,
    RemoveDrone,
    AddPositionKeyFrame,
    RemovePositionKeyFrame,
    AddColorKeyFrame,
    RemoveColorKeyFrame,
    selectedDrone
}
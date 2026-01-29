import type { Vector3, Color } from "three";
import { ColorKeyFrame } from "../../repository/entity/ColorKeyFrame";
import type { IController } from "../interface/IController";
import type { IProject } from "../interface/IProject";
import type { ISettings } from "../interface/ISettings";
import type { ITimeController } from "../interface/ITimeController";
import type { OFCEvent } from "../interface/OFCEvent";
import { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";
import { IUndoableController } from "../interface/IUndoableController";
import type { IUndoRepository } from "../../repository/IUndoRepository";
import { ActionType } from "../../repository/entity/ActionType";
import { Action } from "../../repository/entity/Action";
import { IAction } from "../../repository/entity/IAction";

export class UndoableController implements IUndoableController {
    private controller: IController;
    private undoStack: IUndoRepository;
    private redoStack: IUndoRepository;
    private idRemapping: Map<number, number> = new Map();
    private undoFlag: boolean = false; // indicates if we are currently performing an undo
    private redoFlag: boolean = false; // indicates if we are currently performing a redo

    constructor(controller: IController, undoStack: IUndoRepository, redoStack: IUndoRepository) {
        this.controller = controller;
        this.undoStack = undoStack;
        this.redoStack = redoStack;
    }

    undo(): void {
        const action = this.undoStack.popAction();
        if (!action) return;

        this.undoFlag = true;
        this._reverseAction(action);
        this.undoFlag = false;
    }

    redo(): void {
        const action = this.redoStack.popAction();
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

    private _reverseAction(action: IAction): void {

        switch (action.getType()) {
            case ActionType.ADD_DRONE: {
                const droneId = action.getData().droneId;
                this.removeDrone(droneId);
                break;
            }

            case ActionType.REMOVE_DRONE: {
                const droneData = action.getData();
                const newId = this.addDrone();
                this.idRemapping.set(droneData.id, newId);
                for (const pkf of droneData.positionKeyFrames) {
                    this.controller.addPositionKeyFrame(newId, pkf);
                }
                for (const ckf of droneData.colorKeyFrames) {
                    this.controller.addColorKeyFrame(newId, ckf);
                }
                break;
            }

            case ActionType.ADD_POSITION_KEYFRAME: {
                const id = this._getRemappedId(action.getData().id);
                const previousKeyFrame = action.getData().previousKeyFrame;
                if (previousKeyFrame) {
                    this.addPositionKeyFrame(id, previousKeyFrame);
                } else {
                    const keyFrame = this._findKeyFrameAtTime(
                        this.controller.getPositionKeyFrames(id),
                        action.getTime());
                    if (keyFrame) {
                        this.removePositionKeyFrame(id, keyFrame);
                    }
                }
                break;
            }

            case ActionType.REMOVE_POSITION_KEYFRAME: {
                const id = this._getRemappedId(action.getData().id);
                const keyFrame: PositionKeyFrame = action.getData().keyFrame;
                this.addPositionKeyFrame(id, keyFrame);
                break;
            }

            case ActionType.ADD_COLOR_KEYFRAME: {
                const id = this._getRemappedId(action.getData().id);
                const previousKeyFrame = action.getData().previousKeyFrame;
                if (previousKeyFrame) {
                    this.addColorKeyFrame(id, previousKeyFrame);
                } else {
                    const keyFrame = this._findKeyFrameAtTime(
                        this.controller.getColorKeyFrames(id),
                        action.getTime());
                    if (keyFrame) {
                        this.removeColorKeyFrame(id, keyFrame);
                    }
                }
                break;
            }
            
            case ActionType.REMOVE_COLOR_KEYFRAME: {
                const id = this._getRemappedId(action.getData().id);
                const keyFrame: ColorKeyFrame = action.getData().keyFrame;
                this.addColorKeyFrame(id, keyFrame);
                break;
            }
    
            case ActionType.SELECT_DRONE: {
                const id = action.getData().id;
                this.unselectDrone(id);
                break;
            }

            case ActionType.UNSELECT_DRONE: {
                const id = action.getData().id;
                this.selectDrone(id);
                break;
            }
        }
        this.controller.getTimeController().setTime(action.getTime());
    }

    private _pushAction(type: ActionType, data: any): void {
        const action = new Action(data, this._currentTime(), type);
        if (this.undoFlag) {
            this.redoStack.addAction(action);
            return;
        }

        this.undoStack.addAction(action);
        if (!this.redoFlag) {
            while (this.redoStack.popAction()) {}
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
        this._pushAction(ActionType.ADD_DRONE, { droneId });
        return droneId;
    }
    
    removeDrone(id: number): void {
        const droneData = {
            id: id,
            positionKeyFrames: this.controller.getPositionKeyFrames(id),
            colorKeyFrames: this.controller.getColorKeyFrames(id)
        };
        this._pushAction(ActionType.REMOVE_DRONE, droneData);
        this.controller.removeDrone(id);
    }
    
    getDrones(): number[] {
        return this.controller.getDrones();
    }
    
    selectDrone(id: number): void {
        const previousSize = this.controller.getSelectedDrones().length;
        this.controller.selectDrone(id);
        const newSize = this.controller.getSelectedDrones().length;
        if (previousSize !== newSize) {
            this._pushAction(ActionType.SELECT_DRONE, { id });
        }
    }

    unselectDrone(id: number): void {
        const previousSize = this.controller.getSelectedDrones().length;
        this.controller.unselectDrone(id);
        const newSize = this.controller.getSelectedDrones().length;
        if (previousSize !== newSize) {
            this._pushAction(ActionType.UNSELECT_DRONE, { id });
        }
    }        
    getSelectedDrones(): number[] {
        return this.controller.getSelectedDrones();
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
    
    addPositionKeyFrameNow(id: number, position: Vector3): void {
        this.addPositionKeyFrame(id, new PositionKeyFrame(position, this.controller.getTimeController().getTime()));
    }

    addPositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
        const keyFrames = this.controller.getPositionKeyFrames(id);
        const previousKeyFrame = this._findKeyFrameAtTime(keyFrames, keyFrame.getTime());

        this._pushAction(ActionType.ADD_POSITION_KEYFRAME, { id, previousKeyFrame });
        this.controller.addPositionKeyFrame(id, keyFrame);
    }
    
    removePositionKeyFrame(id: number, keyFrame: PositionKeyFrame): void {
        if (this._findKeyFrameAtTime(this.controller.getPositionKeyFrames(id), keyFrame.getTime()) !== null) {
            // only undo if keyframe existed
            this._pushAction(ActionType.REMOVE_POSITION_KEYFRAME, { id, keyFrame });
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

    addColorKeyFrameNow(id: number, color: Color): void {
        this.addColorKeyFrame(id, new ColorKeyFrame(color, this.controller.getTimeController().getTime()));
    }
    
    addColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
        const keyFrames = this.controller.getColorKeyFrames(id);
        const previousKeyFrame = this._findKeyFrameAtTime(keyFrames, this._currentTime());
        
        this._pushAction(ActionType.ADD_COLOR_KEYFRAME, { id, previousKeyFrame });
        this.controller.addColorKeyFrame(id, keyFrame);
    }
    
    removeColorKeyFrame(id: number, keyFrame: ColorKeyFrame): void {
        if (this._findKeyFrameAtTime(this.controller.getColorKeyFrames(id), keyFrame.getTime()) !== null) {
            // only undo if keyframe existed
            this._pushAction(ActionType.REMOVE_COLOR_KEYFRAME, { id, keyFrame });
        }
        this.controller.removeColorKeyFrame(id, keyFrame);
    }
    
    getDroneChangedEvent(): OFCEvent<number> {
        return this.controller.getDroneChangedEvent();
    }
    
    getDronesEvent(): OFCEvent<number[]> {
        return this.controller.getDronesEvent();
    }
    
    getCollisionEvent(): OFCEvent<Map<number, Map<number, number>>> {
        return this.controller.getCollisionEvent();
    }
    
    getDroneSelectEvent(): OFCEvent<number[]> {
        return this.controller.getDroneSelectEvent();
    }
}
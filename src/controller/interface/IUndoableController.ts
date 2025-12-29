import type { IController } from "./IController";

export interface IUndoableController extends IController {
    undo(): void;
    redo(): void;
}
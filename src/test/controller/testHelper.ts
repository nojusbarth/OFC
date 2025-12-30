import { IController } from "../../controller/interface/IController";
import { IUndoableController } from "../../controller/interface/IUndoableController";
import { Controller } from "../../controller/logic/Controller";
import { Settings } from "../../controller/logic/Settings";
import { UndoableController } from "../../controller/logic/UndoableController";
import { IProjectDataRepository } from "../../repository/IProjectDataRepository";
import { ProjectDataRepository } from "../../repository/ProjectDataRepository";

export function makeBasicController(): [IController, IProjectDataRepository] {
    const repository = new ProjectDataRepository();
    const settings = new Settings(repository);
    return [new Controller(settings, repository), repository] ;
}

export function makeUndoableController(): [IUndoableController, IProjectDataRepository] {
    const [controller, repository] = makeBasicController();
    return [new UndoableController(controller), repository];
}

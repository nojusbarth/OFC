import { IController } from "../../controller/interface/IController";
import { IUndoableController } from "../../controller/interface/IUndoableController";
import { Controller } from "../../controller/logic/Controller";
import { Settings } from "../../controller/logic/Settings";
import { UndoableController } from "../../controller/logic/UndoableController";
import { IProjectRepository } from "../../repository/IProjectRepository";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { UndoRepository } from "../../repository/UndoRepository";


export function makeBasicController(): [IController, IProjectRepository] {
    const repository = new ProjectRepository();
    const settings = new Settings(repository);
    return [new Controller(settings, repository), repository] ;
}

export function makeUndoableController(): [IUndoableController, IProjectRepository] {
    const [controller, repository] = makeBasicController();
    return [new UndoableController(controller, new UndoRepository(), new UndoRepository()), repository];
}

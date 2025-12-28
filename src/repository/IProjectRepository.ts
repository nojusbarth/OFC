import type { IProject } from "../controller/interface/IProject";

export interface IProjectRepository {
    getAllProjects(): IProject[];
    getProjectByName(name: string): IProject | null;
    addProject(project: IProject): boolean;
    removeProject(name: string): boolean;
}

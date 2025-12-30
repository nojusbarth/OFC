import type { IProjectRepository } from "./IProjectRepository";
import type { IProject } from "../controller/interface/IProject";

export class ProjectRepository implements IProjectRepository {
    projects: IProject[] = [];

    getAllProjects(): IProject[] {
        return this.projects;
    }

    getProjectByName(name: string): IProject | null {
        const p = this.projects.find(p => (p as any)?.name === name);
        return p ?? null;
    }

    addProject(project: IProject): boolean {
        const name = (project as any)?.name;
        if (typeof name === "string" && this.getProjectByName(name) == null) {
            this.projects.push(project);
            return true;
        }
        return false;
    }

    removeProject(name: string): boolean {
        const idx = this.projects.findIndex(p => (p as any)?.name === name);
        if (idx >= 0) {
            this.projects.splice(idx, 1);
            return true;
        }
        return false;
    }
}

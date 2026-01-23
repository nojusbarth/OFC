export interface IProject {
    exportVideo(): void
    exportWayPointData(): void
    saveProject(): void
    loadProject(data: string): void
}
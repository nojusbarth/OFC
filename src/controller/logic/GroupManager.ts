import { DroneGroup } from "../../repository/grouping/DroneGroup";
import { OFCEvent } from "../interface/OFCEvent";

export class DroneGroupManager {
  private groups: Map<number, DroneGroup> = new Map();
  private droneToGroup: Map<number, number> = new Map(); // droneId -> groupId
  private nextGroupId: number = 1;
  groupEvent = new OFCEvent<DroneGroup[]>();

  /* ---------- Group Creation ---------- */

  public createGroup(): number {
    const groupId = this.nextGroupId++;

    const group: DroneGroup = {
      id: groupId,
      droneIds: new Set<number>(),
    };

    this.groups.set(groupId, group);

    return groupId;
  }

  /* ---------- Add Multiple Drones To Group ---------- */

  public addDronesToGroup(droneIds: number[], groupId: number): void {
    const group = this.groups.get(groupId);
    if (!group) {
      throw new Error(`Group ${groupId} does not exist.`);
    }

    for (const droneId of droneIds) {
      // Falls Drohne bereits in einer anderen Gruppe ist → entfernen
      const existingGroupId = this.droneToGroup.get(droneId);

      if (existingGroupId !== undefined) {
        const existingGroup = this.groups.get(existingGroupId);
        existingGroup?.droneIds.delete(droneId);
      }

      // In neue Gruppe einfügen
      group.droneIds.add(droneId);
      this.droneToGroup.set(droneId, groupId);
    }
    this.groupEvent.notify(this.getAllGroups());
  }

  /* ---------- Remove Multiple Drones From Their Groups ---------- */

  public removeDronesFromGroup(droneIds: number[]): void {
    for (const droneId of droneIds) {
      const groupId = this.droneToGroup.get(droneId);
      if (groupId === undefined) continue;

      const group = this.groups.get(groupId);
      group?.droneIds.delete(droneId);

      this.droneToGroup.delete(droneId);

      // Wenn Gruppe leer → löschen
      if (group && group.droneIds.size === 0) {
        this.groups.delete(groupId);
      }
    }
    this.groupEvent.notify(this.getAllGroups());
  }

  /* ---------- Queries ---------- */

  public getGroup(groupId: number): DroneGroup | undefined {
    return this.groups.get(groupId);
  }

  public getAllGroups(): DroneGroup[] {
    return Array.from(this.groups.values());
  }

  public getDroneGroupId(droneId: number): number | undefined {
    return this.droneToGroup.get(droneId);
  }

  public getDronesInGroup(groupId: number): number[] {
    const group = this.groups.get(groupId);
    if (!group) return [];
    return Array.from(group.droneIds);
  }

  public getGroupEvent(): OFCEvent<DroneGroup[]> {
    return this.groupEvent;
  }
}

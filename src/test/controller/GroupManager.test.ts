import { DroneGroupManager } from "../../controller/logic/GroupManager";

it("GroupManager - creates groups with incremental IDs", () => {
	const manager = new DroneGroupManager();

	const firstId = manager.createGroup();
	const secondId = manager.createGroup();

	expect(firstId).not.toBe(secondId);
	expect(manager.getGroup(firstId)?.droneIds.size).toBe(0);
	expect(manager.getGroup(secondId)?.droneIds.size).toBe(0);
});

it("GroupManager - addDronesToGroup throws for unknown group", () => {
	const manager = new DroneGroupManager();

	expect(() => manager.addDronesToGroup([1, 2], 999)).toThrowError("Group 999 does not exist.");
});

it("GroupManager - adds drones to a group and exposes query APIs", () => {
	const manager = new DroneGroupManager();
	const groupId = manager.createGroup();

	manager.addDronesToGroup([10, 11], groupId);

	expect(manager.getDroneGroupId(10)).toBe(groupId);
	expect(manager.getDroneGroupId(11)).toBe(groupId);
	expect(manager.getDronesInGroup(groupId).sort((a, b) => a - b)).toEqual([10, 11]);
	expect(manager.getAllGroups().map((group) => group.id)).toEqual([groupId]);
});

it("GroupManager - reassigns drone from old group to new group", () => {
	const manager = new DroneGroupManager();
	const groupA = manager.createGroup();
	const groupB = manager.createGroup();

	manager.addDronesToGroup([42], groupA);
	manager.addDronesToGroup([42], groupB);

	expect(manager.getDroneGroupId(42)).toBe(groupB);
	expect(manager.getDronesInGroup(groupA)).toEqual([]);
	expect(manager.getDronesInGroup(groupB)).toEqual([42]);
});

it("GroupManager - removeDronesFromGroup removes mapping and deletes empty group", () => {
	const manager = new DroneGroupManager();
	const groupId = manager.createGroup();

	manager.addDronesToGroup([1, 2], groupId);
	manager.removeDronesFromGroup([1]);

	expect(manager.getDroneGroupId(1)).toBeUndefined();
	expect(manager.getDronesInGroup(groupId)).toEqual([2]);

	manager.removeDronesFromGroup([2]);

	expect(manager.getGroup(groupId)).toBeUndefined();
	expect(manager.getDroneGroupId(2)).toBeUndefined();
});

it("GroupManager - removeDronesFromGroup ignores unknown drone IDs", () => {
	const manager = new DroneGroupManager();
	const groupId = manager.createGroup();

	manager.addDronesToGroup([5], groupId);
	manager.removeDronesFromGroup([999, 5]);

	expect(manager.getGroup(groupId)).toBeUndefined();
});

it("GroupManager - getDronesInGroup returns empty array for unknown group", () => {
	const manager = new DroneGroupManager();

	expect(manager.getDronesInGroup(12345)).toEqual([]);
});

it("GroupManager - emits group event on add, remove and clear", () => {
	const manager = new DroneGroupManager();
	const eventSnapshots: Array<Array<{ id: number; droneIds: number[] }>> = [];
	const handler = jest.fn((groups: Array<{ id: number; droneIds: Set<number> }>) => {
		eventSnapshots.push(
			groups.map((group) => ({
				id: group.id,
				droneIds: Array.from(group.droneIds).sort((a, b) => a - b),
			}))
		);
	});
	manager.getGroupEvent().register(handler);
	const groupId = manager.createGroup();

	manager.addDronesToGroup([7, 8], groupId);
	manager.removeDronesFromGroup([8]);
	manager.clearGroups();

	expect(handler).toHaveBeenCalledTimes(3);
	expect(eventSnapshots[0]).toEqual([{ id: groupId, droneIds: [7, 8] }]);
	expect(eventSnapshots[1]).toEqual([{ id: groupId, droneIds: [7] }]);
	expect(eventSnapshots[2]).toEqual([]);
});

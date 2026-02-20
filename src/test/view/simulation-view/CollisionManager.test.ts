import { CollisionManager } from "../../../view/simulation-view/subsystems/CollisionManager";
import { DroneFrame } from "../../../view/simulation-view/state/DroneFrame";
import { PathFrame } from "../../../view/simulation-view/state/PathFrame";
import { Vector3 } from "three";

it("Setting collisions should visualize colliding drones", () => {
  var collisionManager = new CollisionManager();

  collisionManager.notifyCollisionChange([1, 2, 3]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#000000", "#000000"]);
  droneFrame.outlineColors.set(2, ["#000000", "#000000"]);
  droneFrame.outlineColors.set(3, ["#000000", "#000000"]);

  var updatedDroneFrame = collisionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#ff0000",
    "#880000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#ff0000",
    "#880000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(3)).toEqual([
    "#ff0000",
    "#880000",
  ]);
});

it("Setting collisions should visualize colliding paths", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([1, 2, 3]);

  var allPaths = new PathFrame();
  allPaths.pathColors.set(1, "#000000");
  allPaths.pathColors.set(2, "#000000");
  allPaths.pathColors.set(3, "#000000");
  allPaths.pathPositions.set(1, [new Vector3(0, 0, 0)]);
  allPaths.pathPositions.set(2, [new Vector3(0, 0, 0)]);
  allPaths.pathPositions.set(3, [new Vector3(0, 0, 0)]);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = collisionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathColors.get(1)).toEqual("#ff0000");
  expect(updatedPathFrame.pathColors.get(2)).toEqual("#ff0000");
  expect(updatedPathFrame.pathColors.get(3)).toEqual("#ff0000");
});

it("Setting collisions should not change non-colliding drones and paths", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([1, 2]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#000000", "#000000"]);
  droneFrame.outlineColors.set(2, ["#000000", "#000000"]);
  droneFrame.outlineColors.set(3, ["#0000ff", "#0000ff"]);

  var updatedDroneFrame = collisionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#ff0000",
    "#880000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#ff0000",
    "#880000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(3)).toEqual([
    "#0000ff",
    "#0000ff",
  ]);

  var allPaths = new PathFrame();
  allPaths.pathColors.set(1, "#000000");
  allPaths.pathColors.set(2, "#000000");
  allPaths.pathColors.set(3, "#0000ff");
  allPaths.pathPositions.set(1, [new Vector3(1, 1, 1)]);
  allPaths.pathPositions.set(2, [new Vector3(2, 2, 2)]);
  allPaths.pathPositions.set(3, [new Vector3(3, 3, 3)]);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = collisionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathColors.get(1)).toEqual("#ff0000");
  expect(updatedPathFrame.pathColors.get(2)).toEqual("#ff0000");
  expect(updatedPathFrame.pathColors.get(3)).toBeUndefined();
});

it("Empty collision list should not change any drones", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#000000", "#000000"]);
  droneFrame.outlineColors.set(2, ["#0000ff", "#0000ff"]);

  var updatedDroneFrame = collisionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#000000",
    "#000000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#0000ff",
    "#0000ff",
  ]);
});

it("Empty collision list should not change any paths", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([]);

  var allPaths = new PathFrame();
  allPaths.pathColors.set(1, "#000000");
  allPaths.pathColors.set(2, "#0000ff");
  allPaths.pathPositions.set(1, [new Vector3(0, 0, 0)]);
  allPaths.pathPositions.set(2, [new Vector3(1, 1, 1)]);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = collisionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathColors.get(1)).toBeUndefined();
  expect(updatedPathFrame.pathColors.get(2)).toBeUndefined();
});

it("Updating collision list should change visualized collisions", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([1, 2]);

  var droneFrame1 = new DroneFrame();
  droneFrame1.outlineColors.set(1, ["#000000", "#000000"]);
  droneFrame1.outlineColors.set(2, ["#000000", "#000000"]);
  droneFrame1.outlineColors.set(3, ["#000000", "#000000"]);

  var updatedDroneFrame1 = collisionManager.applyDroneChanges(droneFrame1);

  expect(updatedDroneFrame1.outlineColors.get(1)).toEqual([
    "#ff0000",
    "#880000",
  ]);
  expect(updatedDroneFrame1.outlineColors.get(2)).toEqual([
    "#ff0000",
    "#880000",
  ]);
  expect(updatedDroneFrame1.outlineColors.get(3)).toEqual([
    "#000000",
    "#000000",
  ]);

  collisionManager.notifyCollisionChange([3]);

  var droneFrame2 = new DroneFrame();
  droneFrame2.outlineColors.set(1, ["#000000", "#000000"]);
  droneFrame2.outlineColors.set(2, ["#000000", "#000000"]);
  droneFrame2.outlineColors.set(3, ["#000000", "#000000"]);

  var updatedDroneFrame2 = collisionManager.applyDroneChanges(droneFrame2);

  expect(updatedDroneFrame2.outlineColors.get(1)).toEqual([
    "#000000",
    "#000000",
  ]);
  expect(updatedDroneFrame2.outlineColors.get(2)).toEqual([
    "#000000",
    "#000000",
  ]);
  expect(updatedDroneFrame2.outlineColors.get(3)).toEqual([
    "#ff0000",
    "#880000",
  ]);
});

it("Single drone collision should be visualized correctly", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([5]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(5, ["#00ff00", "#00ff00"]);

  var updatedDroneFrame = collisionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(5)).toEqual([
    "#ff0000",
    "#880000",
  ]);
});

it("Path positions should be correctly set for colliding paths", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([1]);

  var allPaths = new PathFrame();
  const expectedPositions = [
    new Vector3(0, 0, 0),
    new Vector3(1, 2, 3),
    new Vector3(4, 5, 6),
  ];
  allPaths.pathColors.set(1, "#00ff00");
  allPaths.pathPositions.set(1, expectedPositions);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = collisionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathPositions.get(1)).toEqual(expectedPositions);
  expect(updatedPathFrame.pathColors.get(1)).toEqual("#ff0000");
});

it("Missing path positions should log error", () => {
  var collisionManager = new CollisionManager();
  collisionManager.notifyCollisionChange([99]);

  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

  var allPaths = new PathFrame();
  var currentPathFrame = new PathFrame();

  collisionManager.applyPathChanges(currentPathFrame, allPaths);

  expect(consoleErrorSpy).toHaveBeenCalledWith("KeyFrame 99 not found");

  consoleErrorSpy.mockRestore();
});

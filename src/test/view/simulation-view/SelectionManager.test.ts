import { SelectionManager } from "../../../view/simulation-view/subsystems/SelectionManager";
import { DroneFrame } from "../../../view/simulation-view/state/DroneFrame";
import { PathFrame } from "../../../view/simulation-view/state/PathFrame";
import { Vector3 } from "three";

//KI GENERIERT

it("Selecting drones should visualize selected drones", () => {
  var selectionManager = new SelectionManager();

  selectionManager.selectDrone([1, 2, 3]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#ff0000", "#ff0000"]);
  droneFrame.outlineColors.set(2, ["#ff0000", "#ff0000"]);
  droneFrame.outlineColors.set(3, ["#ff0000", "#ff0000"]);

  var updatedDroneFrame = selectionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#000000",
    "#ffffff",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#000000",
    "#ffffff",
  ]);
  expect(updatedDroneFrame.outlineColors.get(3)).toEqual([
    "#000000",
    "#ffffff",
  ]);
});

it("Selecting drones should visualize selected paths", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([1, 2, 3]);

  var allPaths = new PathFrame();
  allPaths.pathColors.set(1, "#ff0000");
  allPaths.pathColors.set(2, "#ff0000");
  allPaths.pathColors.set(3, "#ff0000");
  allPaths.pathPositions.set(1, [new Vector3(0, 0, 0)]);
  allPaths.pathPositions.set(2, [new Vector3(0, 0, 0)]);
  allPaths.pathPositions.set(3, [new Vector3(0, 0, 0)]);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = selectionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathColors.get(1)).toEqual("#00ff00");
  expect(updatedPathFrame.pathColors.get(2)).toEqual("#00ff00");
  expect(updatedPathFrame.pathColors.get(3)).toEqual("#00ff00");
});

it("Selecting drones should not change non-selected drones and paths", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([1, 2]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#ff0000", "#ff0000"]);
  droneFrame.outlineColors.set(2, ["#ff0000", "#ff0000"]);
  droneFrame.outlineColors.set(3, ["#0000ff", "#0000ff"]);

  var updatedDroneFrame = selectionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#000000",
    "#ffffff",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#000000",
    "#ffffff",
  ]);
  expect(updatedDroneFrame.outlineColors.get(3)).toEqual([
    "#0000ff",
    "#0000ff",
  ]);

  var allPaths = new PathFrame();
  allPaths.pathColors.set(1, "#ff0000");
  allPaths.pathColors.set(2, "#ff0000");
  allPaths.pathColors.set(3, "#0000ff");
  allPaths.pathPositions.set(1, [new Vector3(1, 1, 1)]);
  allPaths.pathPositions.set(2, [new Vector3(2, 2, 2)]);
  allPaths.pathPositions.set(3, [new Vector3(3, 3, 3)]);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = selectionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathColors.get(1)).toEqual("#00ff00");
  expect(updatedPathFrame.pathColors.get(2)).toEqual("#00ff00");
  expect(updatedPathFrame.pathColors.get(3)).toBeUndefined();
});

it("Empty selection list should not change any drones", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#ff0000", "#ff0000"]);
  droneFrame.outlineColors.set(2, ["#0000ff", "#0000ff"]);

  var updatedDroneFrame = selectionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#ff0000",
    "#ff0000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#0000ff",
    "#0000ff",
  ]);
});

it("Empty selection list should not change any paths", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([]);

  var allPaths = new PathFrame();
  allPaths.pathColors.set(1, "#ff0000");
  allPaths.pathColors.set(2, "#0000ff");
  allPaths.pathPositions.set(1, [new Vector3(0, 0, 0)]);
  allPaths.pathPositions.set(2, [new Vector3(1, 1, 1)]);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = selectionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathColors.get(1)).toBeUndefined();
  expect(updatedPathFrame.pathColors.get(2)).toBeUndefined();
});

it("Updating selection list should change visualized selection", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([1, 2]);

  var droneFrame1 = new DroneFrame();
  droneFrame1.outlineColors.set(1, ["#ff0000", "#ff0000"]);
  droneFrame1.outlineColors.set(2, ["#ff0000", "#ff0000"]);
  droneFrame1.outlineColors.set(3, ["#ff0000", "#ff0000"]);

  var updatedDroneFrame1 = selectionManager.applyDroneChanges(droneFrame1);

  expect(updatedDroneFrame1.outlineColors.get(1)).toEqual([
    "#000000",
    "#ffffff",
  ]);
  expect(updatedDroneFrame1.outlineColors.get(2)).toEqual([
    "#000000",
    "#ffffff",
  ]);
  expect(updatedDroneFrame1.outlineColors.get(3)).toEqual([
    "#ff0000",
    "#ff0000",
  ]);

  selectionManager.selectDrone([3]);

  var droneFrame2 = new DroneFrame();
  droneFrame2.outlineColors.set(1, ["#ff0000", "#ff0000"]);
  droneFrame2.outlineColors.set(2, ["#ff0000", "#ff0000"]);
  droneFrame2.outlineColors.set(3, ["#ff0000", "#ff0000"]);

  var updatedDroneFrame2 = selectionManager.applyDroneChanges(droneFrame2);

  expect(updatedDroneFrame2.outlineColors.get(1)).toEqual([
    "#ff0000",
    "#ff0000",
  ]);
  expect(updatedDroneFrame2.outlineColors.get(2)).toEqual([
    "#ff0000",
    "#ff0000",
  ]);
  expect(updatedDroneFrame2.outlineColors.get(3)).toEqual([
    "#000000",
    "#ffffff",
  ]);
});

it("Single drone selection should be visualized correctly", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([5]);

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(5, ["#00ff00", "#00ff00"]);

  var updatedDroneFrame = selectionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(5)).toEqual([
    "#000000",
    "#ffffff",
  ]);
});

it("Path positions should be correctly set for selected paths", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([1]);

  var allPaths = new PathFrame();
  const expectedPositions = [
    new Vector3(0, 0, 0),
    new Vector3(1, 2, 3),
    new Vector3(4, 5, 6),
  ];
  allPaths.pathColors.set(1, "#ff0000");
  allPaths.pathPositions.set(1, expectedPositions);

  var currentPathFrame = new PathFrame();

  var updatedPathFrame = selectionManager.applyPathChanges(
    currentPathFrame,
    allPaths,
  );

  expect(updatedPathFrame.pathPositions.get(1)).toEqual(expectedPositions);
  expect(updatedPathFrame.pathColors.get(1)).toEqual("#00ff00");
});

it("Missing path positions should log error", () => {
  var selectionManager = new SelectionManager();
  selectionManager.selectDrone([99]);

  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

  var allPaths = new PathFrame();
  var currentPathFrame = new PathFrame();

  selectionManager.applyPathChanges(currentPathFrame, allPaths);

  expect(consoleErrorSpy).toHaveBeenCalledWith("KeyFrame 99 not found");

  consoleErrorSpy.mockRestore();
});

it("Initial state should have no drones selected", () => {
  var selectionManager = new SelectionManager();

  var droneFrame = new DroneFrame();
  droneFrame.outlineColors.set(1, ["#ff0000", "#ff0000"]);
  droneFrame.outlineColors.set(2, ["#0000ff", "#0000ff"]);

  var updatedDroneFrame = selectionManager.applyDroneChanges(droneFrame);

  expect(updatedDroneFrame.outlineColors.get(1)).toEqual([
    "#ff0000",
    "#ff0000",
  ]);
  expect(updatedDroneFrame.outlineColors.get(2)).toEqual([
    "#0000ff",
    "#0000ff",
  ]);
});

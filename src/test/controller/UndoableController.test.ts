import { Color, Vector3 } from "three";
import { makeUndoableController } from "./testHelper";

it("UndoableController: drone addition and removal", () => {
    const [undoableController, repository] = makeUndoableController();

    const drone1Id = undoableController.addDrone();

    const drone2Id = undoableController.addDrone();
    expect(undoableController.getDrones()).toContain(drone1Id);
    expect(undoableController.getDrones()).toContain(drone2Id);
    expect(repository.getAllDrones().length).toBe(2);
    // should remove drone2 again
    undoableController.undo();
    expect(undoableController.getDrones()).toContain(drone1Id);
    expect(undoableController.getDrones()).not.toContain(drone2Id);
    expect(repository.getAllDrones().length).toBe(1);

    undoableController.redo();
    expect(undoableController.getDrones()).toContain(drone1Id);
    expect(undoableController.getDrones().length).toBe(2);
    const newDrone2Id = undoableController.getDrones().find(id => id !== drone1Id);
    expect(newDrone2Id).toBeDefined();

    undoableController.addColorKeyFrameNow(drone1Id, new Color(1, 0, 0));
    expect(undoableController.getColorKeyFrames(drone1Id).length).toBe(1);
    undoableController.removeDrone(drone1Id);
    expect(undoableController.getDrones().length).toBe(1);

    undoableController.undo();
    expect(undoableController.getDrones().length).toBe(2);
    const newDrone1Id = undoableController.getDrones().find(id => id !== newDrone2Id);
    expect(newDrone1Id).toBeDefined();
    expect(undoableController.getColorKeyFrames(newDrone1Id!).length).toBe(1);
    expect(undoableController.getColorAt(newDrone1Id!, 0).equals(new Color(1, 0, 0))).toBe(true);

    undoableController.redo();
    expect(undoableController.getDrones().length).toBe(1);
});

it("UndoableController: select drone, multi undo/redo", () => {
    const [undoableController, _repository] = makeUndoableController();

    const drone1Id = undoableController.addDrone();
    const drone2Id = undoableController.addDrone();
    undoableController.selectDrone(-1);
    expect(undoableController.getSelectedDrone()).toBe(-1);
    undoableController.selectDrone(drone1Id);
    expect(undoableController.getSelectedDrone()).toBe(drone1Id);
    undoableController.selectDrone(drone2Id);
    expect(undoableController.getSelectedDrone()).toBe(drone2Id);
    
    undoableController.undo();
    expect(undoableController.getSelectedDrone()).toBe(drone1Id);
    undoableController.undo();
    expect(undoableController.getSelectedDrone()).toBe(-1);

    undoableController.redo();
    expect(undoableController.getSelectedDrone()).toBe(drone1Id);
    undoableController.redo();
    expect(undoableController.getSelectedDrone()).toBe(drone2Id);
});


it("UndoableController: add/remove position keyframe", () => {
    const [undoableController, _repository] = makeUndoableController();

    const droneId = undoableController.addDrone();
    // test add 
    undoableController.addPositionKeyFrameNow(droneId, new Vector3(1, 2, 3));
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(1);
    expect(undoableController.getPositionAt(droneId, 0).equals(new Vector3(1, 2, 3))).toBe(true);
    
    undoableController.undo();
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(0);

    undoableController.redo();
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(1);
    expect(undoableController.getPositionAt(droneId, 0).equals(new Vector3(1, 2, 3))).toBe(true);

    // test replace (same time keyframe)
    undoableController.addPositionKeyFrameNow(droneId, new Vector3(4, 5, 6));
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(1);
    expect(undoableController.getPositionAt(droneId, 0).equals(new Vector3(4, 5, 6))).toBe(true);

    undoableController.undo();
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(1);
    expect(undoableController.getPositionAt(droneId, 0).equals(new Vector3(1, 2, 3))).toBe(true);
    undoableController.redo();
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(1);
    expect(undoableController.getPositionAt(droneId, 0).equals(new Vector3(4, 5, 6))).toBe(true);

    // test remove
    const keyFrame = undoableController.getPositionKeyFrames(droneId)[0];
    undoableController.removePositionKeyFrame(droneId, keyFrame);
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(0);

    undoableController.undo();
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(1);
    expect(undoableController.getPositionAt(droneId, 0).equals(new Vector3(4, 5, 6))).toBe(true);
    undoableController.redo();
    expect(undoableController.getPositionKeyFrames(droneId).length).toBe(0);
});
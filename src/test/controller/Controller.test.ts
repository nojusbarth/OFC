import { Vector3 } from "three";
import { makeBasicController } from "./testHelper";

it("Controller - add/remove drone", () => {
    const [controller, repository] = makeBasicController();

    const droneId = controller.addDrone();
    expect(controller.getDrones()).toContain(droneId);
    expect(repository.getAllDrones().length).toBe(1);

    controller.removeDrone(droneId);
    expect(controller.getDrones()).not.toContain(droneId);
    expect(repository.getAllDrones().length).toBe(0);
});

it("Controller - remove drone invalid id", () => {
    const [controller, _repository] = makeBasicController();

    expect(() => controller.removeDrone(999)).toThrowError();
});

it("Controller - test collision detection on add", () => {
    const [controller, repository] = makeBasicController();
    controller.getSettings().setCollisionRadius(5);

    const drone1Id = controller.addDrone();
    const drone2Id = controller.addDrone();

    controller.addPositionKeyFrameNow(drone1Id, new Vector3(0, 0, 0));

    let collisionDetected: boolean = false;
    controller.getCollisionEvent().register((collision) => {
        collisionDetected = true;
        expect(collision.get(drone2Id)?.size).toEqual(1);
        expect(collision.get(drone2Id)?.keys().next().value).toEqual(drone1Id);
        expect(collision.get(drone1Id)?.size).toEqual(1);
        expect(collision.get(drone1Id)?.keys().next().value).toEqual(drone2Id);
    });

    controller.addPositionKeyFrameNow(drone2Id, new Vector3(3, 0, 0));
    expect(collisionDetected).toBe(true);
});

it("Controller - collision detection on remove", () => {
    const [controller, repository] = makeBasicController();
    repository.setCollisionRadius(2);
    repository.setMaxTime(10);

    const drone1Id = controller.addDrone();
    const drone2Id = controller.addDrone();


    let collisionDetected: boolean = false;
    controller.getCollisionEvent().register((collision) => {
        collisionDetected = collision.size > 0;
    });

    controller.addPositionKeyFrameNow(drone1Id, new Vector3(0, 0, 0));
    controller.addPositionKeyFrameNow(drone2Id, new Vector3(10, 0, 0));
    expect(collisionDetected).toBe(false);

    controller.getTimeController().setTime(10);
    controller.addPositionKeyFrameNow(drone1Id, new Vector3(0, 10, 0));
    controller.addPositionKeyFrameNow(drone2Id, new Vector3(10, 10, 0));
    expect(collisionDetected).toBe(false);


    controller.getTimeController().setTime(5);
    controller.addPositionKeyFrameNow(drone2Id, controller.getPosition(drone1Id));
    expect(collisionDetected).toBe(true);

    // reset for removal test
    controller.removePositionKeyFrame(drone2Id, controller.getPositionKeyFrames(drone2Id)[1]);

    expect(collisionDetected).toBe(false);
});
import { Vector3 } from "three";
import { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";
import { checkCollisions } from "../../controller/logic/CollisionHandler";
import { Drone } from "../../controller/logic/Drone";

it("CollisionHandler static collision", () => {
    const drone1 = new Drone(1);
    const drone2 = new Drone(2);

    drone1.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(0, 0, 0), 0));
    drone2.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(1, 0, 0), 0));

    const collisions = checkCollisions(drone1, [drone1, drone2], 5);
    expect(collisions.size).toBe(1);
    expect(collisions.keys()).toContain(2);
});

it("CollisionHandler no collision", () => {
    const drone1 = new Drone(1);
    const drone2 = new Drone(2);

    drone1.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(0, 0, 0), 0));
    drone2.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(10, 0, 0), 0));

    const collisions = checkCollisions(drone1, [drone1, drone2], 4.5);
    expect(collisions.size).toBe(0);
});

it("CollisionHandler moving collision", () => {
    const drone1 = new Drone(1);
    const drone2 = new Drone(2);

    drone1.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(0, 0, 0), 0));
    drone1.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(10, 10, 0), 10));

    drone2.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(10, 0, 0), 0));
    drone2.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(0, 10, 0), 10));

    const collisions = checkCollisions(drone1, [drone1, drone2], 1);
    expect(collisions.size).toBe(1);
    expect(collisions.keys()).toContain(2);
    expect(collisions.get(2)).toBeGreaterThan(3);
    expect(collisions.get(2)).toBeLessThan(7);
});
import { Color, Vector3 } from "three";
import { Drone } from "../../controller/logic/Drone";
import { PositionKeyFrame } from "../../repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "../../repository/entity/ColorKeyFrame";

it("Drone - basic", () => {
    const drone = new Drone(1);
    expect(drone.getId()).toBe(1);
});

it("Drone - position key frames", () => {
    const drone = new Drone(1);
    expect(drone.getPositionKeyFrames().length).toBe(0);

    const keyFrame1 = new PositionKeyFrame(new Vector3(1, 1, 1), 1);
    drone.insertPositionKeyFrame(keyFrame1);
    expect(drone.getPositionKeyFrames().length).toBe(1);
    expect(drone.getPositionKeyFrames()[0]).toBe(keyFrame1);

    const keyFrame2 = new PositionKeyFrame(new Vector3(4, 5, 6), 11);
    drone.insertPositionKeyFrame(keyFrame2);
    expect(drone.getPositionKeyFrames().length).toBe(2);
    expect(drone.getPositionKeyFrames()[1]).toBe(keyFrame2);
    // insert in between
    const keyFrame3 = new PositionKeyFrame(new Vector3(7, 8, 9), 5);
    drone.insertPositionKeyFrame(keyFrame3);
    expect(drone.getPositionKeyFrames().length).toBe(3);
    expect(drone.getPositionKeyFrames()[1]).toBe(keyFrame3);
    // test removal
    drone.removePositionKeyFrame(keyFrame3);
    expect(drone.getPositionKeyFrames().length).toBe(2);
    expect(drone.getPositionKeyFrames()[1]).toBe(keyFrame2);
    // replace existing time keyframe
    const keyFrame4 = new PositionKeyFrame(new Vector3(3, 3, 3), 11);
    drone.insertPositionKeyFrame(keyFrame4);
    expect(drone.getPositionKeyFrames().length).toBe(2);
    expect(drone.getPositionKeyFrames()[1]).toBe(keyFrame4);
    // test interpolation
    expect(drone.getPositonAtTime(6).equals(new Vector3(2, 2, 2))).toBe(true);
    drone.insertPositionKeyFrame(new PositionKeyFrame(new Vector3(99, 0, 0), 0));
    // test before first keyframe
    expect(drone.getPositonAtTime(-1).equals(new Vector3(99, 0, 0))).toBe(true);
    expect(drone.getPositonAtTime(0).equals(new Vector3(99, 0, 0))).toBe(true);
    // test after last keyframe
    expect(drone.getPositonAtTime(20).equals(new Vector3(3, 3, 3))).toBe(true);
    // test interpolation select correct keys
    expect(drone.getPositonAtTime(6).equals(new Vector3(2, 2, 2))).toBe(true);
});

it("Drone - color key frames", () => {
    const drone = new Drone(1);
    expect(drone.getColorKeyFrames().length).toBe(0);

    const keyFrame1 = new ColorKeyFrame(new Color(1, 1, 1), 1);
    drone.insertColorKeyFrame(keyFrame1);
    expect(drone.getColorKeyFrames().length).toBe(1);
    expect(drone.getColorKeyFrames()[0]).toBe(keyFrame1);

    const keyFrame2 = new ColorKeyFrame(new Color(4, 5, 6), 11);
    drone.insertColorKeyFrame(keyFrame2);
    expect(drone.getColorKeyFrames().length).toBe(2);
    expect(drone.getColorKeyFrames()[1]).toBe(keyFrame2);
    // insert in between
    const keyFrame3 = new ColorKeyFrame(new Color(7, 8, 9), 5);
    drone.insertColorKeyFrame(keyFrame3);
    expect(drone.getColorKeyFrames().length).toBe(3);
    expect(drone.getColorKeyFrames()[1]).toBe(keyFrame3);
    // test removal
    drone.removeColorKeyFrame(keyFrame3);
    expect(drone.getColorKeyFrames().length).toBe(2);
    expect(drone.getColorKeyFrames()[1]).toBe(keyFrame2);
    // replace existing time keyframe
    const keyFrame4 = new ColorKeyFrame(new Color(3, 3, 3), 11);
    drone.insertColorKeyFrame(keyFrame4);
    expect(drone.getColorKeyFrames().length).toBe(2);
    expect(drone.getColorKeyFrames()[1]).toBe(keyFrame4);
    // test interpolation
    expect(drone.getColorAtTime(6).equals(new Color(1, 1, 1))).toBe(true);
    drone.insertColorKeyFrame(new ColorKeyFrame(new Color(99, 0, 0), 0));
    // test before first keyframe
    expect(drone.getColorAtTime(-1).equals(new Color(99, 0, 0))).toBe(true);
    expect(drone.getColorAtTime(0).equals(new Color(99, 0, 0))).toBe(true);
    // test after last keyframe
    expect(drone.getColorAtTime(20).equals(new Color(3, 3, 3))).toBe(true);
    // test interpolation select correct keys
    expect(drone.getColorAtTime(6).equals(new Color(1, 1, 1))).toBe(true);
});
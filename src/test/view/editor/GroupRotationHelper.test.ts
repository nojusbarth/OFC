import { Vector3 } from "three";
import { RotationHelper } from "../../../view/editor/components/DroneEditorComponent/group_sections/RotationHelper";

// Dieser Abschnitt ist teilweise KI generiert

describe("RotationHelper", () => {
  describe("calculateCenter", () => {
    it("calculates arithmetic mean center for multiple positions", () => {
      const positions = [
        new Vector3(0, 0, 0),
        new Vector3(2, 2, 2),
        new Vector3(4, 4, 4),
      ];

      const center = RotationHelper.calculateCenter(positions);

      expect(center.x).toBeCloseTo(2);
      expect(center.y).toBeCloseTo(2);
      expect(center.z).toBeCloseTo(2);
    });

    it("handles negative coordinates correctly", () => {
      const positions = [new Vector3(-2, -4, 6), new Vector3(2, 0, -2)];

      const center = RotationHelper.calculateCenter(positions);

      expect(center.x).toBeCloseTo(0);
      expect(center.y).toBeCloseTo(-2);
      expect(center.z).toBeCloseTo(2);
    });
  });

  describe("rotatePositions", () => {
    it("returns empty array for empty input", () => {
      const rotated = RotationHelper.rotatePositions([], new Vector3(90, 0, 0));
      expect(rotated).toEqual([]);
    });

    it("keeps positions unchanged for zero-degree rotation", () => {
      const positions = [new Vector3(1, 2, 3), new Vector3(-4, 0.5, 8)];

      const rotated = RotationHelper.rotatePositions(
        positions,
        new Vector3(0, 0, 0),
      );

      expect(rotated[0].x).toBeCloseTo(1);
      expect(rotated[0].y).toBeCloseTo(2);
      expect(rotated[0].z).toBeCloseTo(3);
      expect(rotated[1].x).toBeCloseTo(-4);
      expect(rotated[1].y).toBeCloseTo(0.5);
      expect(rotated[1].z).toBeCloseTo(8);
    });

    it("rotates points around shared center for 90° Z rotation", () => {
      const positions = [new Vector3(1, 0, 0), new Vector3(0, 1, 0)];

      const rotated = RotationHelper.rotatePositions(
        positions,
        new Vector3(0, 0, 90),
      );

      expect(rotated[0].x).toBeCloseTo(1);
      expect(rotated[0].y).toBeCloseTo(1);
      expect(rotated[0].z).toBeCloseTo(0);

      expect(rotated[1].x).toBeCloseTo(0);
      expect(rotated[1].y).toBeCloseTo(0);
      expect(rotated[1].z).toBeCloseTo(0);
    });

    it("preserves distance of each point to center under rotation", () => {
      const positions = [
        new Vector3(3, 1, 2),
        new Vector3(-2, 5, -1),
        new Vector3(4, -3, 0),
      ];

      const centerBefore = RotationHelper.calculateCenter(positions);
      const distancesBefore = positions.map((p) => p.distanceTo(centerBefore));

      const rotated = RotationHelper.rotatePositions(
        positions,
        new Vector3(33, -77, 145),
      );

      const centerAfter = RotationHelper.calculateCenter(rotated);
      const distancesAfter = rotated.map((p) => p.distanceTo(centerAfter));

      distancesAfter.forEach((distance, index) => {
        expect(distance).toBeCloseTo(distancesBefore[index], 10);
      });
    });

    it("does not mutate input vectors", () => {
      const positions = [new Vector3(1, 0, 0), new Vector3(0, 1, 0)];
      const original = positions.map((p) => p.clone());

      RotationHelper.rotatePositions(positions, new Vector3(0, 0, 90));

      expect(positions[0].x).toBeCloseTo(original[0].x);
      expect(positions[0].y).toBeCloseTo(original[0].y);
      expect(positions[0].z).toBeCloseTo(original[0].z);
      expect(positions[1].x).toBeCloseTo(original[1].x);
      expect(positions[1].y).toBeCloseTo(original[1].y);
      expect(positions[1].z).toBeCloseTo(original[1].z);
    });
  });
});

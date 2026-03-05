import {
  calculateValidPixelCount,
  clampResolution,
  generateDroneFormation,
  IgnoreColor,
} from "../../../view/editor/components/DroneEditorComponent/image_import/ImageAnalysis";
import { PixelData } from "../../../view/editor/components/DroneEditorComponent/image_import/ImageLoader";
import { IUndoableController } from "../../../controller/interface/IUndoableController";
import { PositionKeyFrame } from "../../../repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "../../../repository/entity/ColorKeyFrame";
import { start } from "repl";

// Dieser Abschnitt ist teilweise KI generiert

function createPixelData(
  width: number,
  height: number,
  pixels: Array<[number, number, number, number]>,
): PixelData {
  const data = new Uint8ClampedArray(width * height * 4);
  pixels.forEach(([r, g, b, a], index) => {
    const base = index * 4;
    data[base] = r;
    data[base + 1] = g;
    data[base + 2] = b;
    data[base + 3] = a;
  });

  return { width, height, data };
}

function createControllerMock(existingDrones: number[] = []) {
  let nextDroneId = 100;

  const addPositionKeyFrame = jest.fn<void, [number, PositionKeyFrame]>();
  const addColorKeyFrame = jest.fn<void, [number, ColorKeyFrame]>();
  const addDrone = jest.fn<number, []>(() => nextDroneId++);
  const createGroup = jest.fn<number, []>(() => 42);
  const addDronesToGroup = jest.fn<void, [number[], number]>();

  const controller = {
    getTimeController: () => ({ getTime: () => 12 }),
    getDrones: () => existingDrones,
    addDrone,
    addPositionKeyFrame,
    addColorKeyFrame,
    getGroupManager: () => ({
      createGroup,
      addDronesToGroup,
    }),
    startBatching: jest.fn(),
    endBatching: jest.fn(),
  } as unknown as IUndoableController;

  return {
    controller,
    addDrone,
    addPositionKeyFrame,
    addColorKeyFrame,
    createGroup,
    addDronesToGroup,
  };
}

describe("ImageAnalysis", () => {
  describe("calculateValidPixelCount", () => {
    it("counts non-white pixels when ignoreColor is white", () => {
      const image = createPixelData(2, 2, [
        [255, 255, 255, 255],
        [249, 249, 249, 255],
        [0, 0, 0, 255],
        [128, 64, 32, 255],
      ]);

      expect(calculateValidPixelCount(image, "white")).toBe(3);
    });

    it("counts non-black pixels when ignoreColor is black", () => {
      const image = createPixelData(2, 2, [
        [0, 0, 0, 255],
        [4, 4, 4, 255],
        [5, 5, 5, 255],
        [10, 10, 10, 255],
      ]);

      expect(calculateValidPixelCount(image, "black")).toBe(2);
    });

    it("counts non-transparent pixels when ignoreColor is transparent", () => {
      const image = createPixelData(2, 2, [
        [255, 0, 0, 0],
        [0, 255, 0, 9],
        [0, 0, 255, 10],
        [255, 255, 255, 255],
      ]);

      expect(calculateValidPixelCount(image, "transparent")).toBe(2);
    });
  });

  describe("clampResolution", () => {
    it("normalizes non-integer and sub-1 values", () => {
      expect(clampResolution(0.7, 9.9)).toEqual({ width: 1, height: 9 });
    });

    it("returns unchanged values when under pixel limit", () => {
      expect(clampResolution(50, 50)).toEqual({ width: 50, height: 50 });
    });

    it("scales down values when exceeding max total pixels", () => {
      const result = clampResolution(100, 100);

      expect(result.width * result.height).toBeLessThanOrEqual(2500);
      expect(result).toEqual({ width: 50, height: 50 });
    });
  });

  describe("generateDroneFormation", () => {
    it("throws when image contains more than 3000 pixels", () => {
      const image = createPixelData(
        61,
        50,
        new Array(61 * 50).fill([1, 2, 3, 255]),
      );
      const { controller } = createControllerMock();

      expect(() =>
        generateDroneFormation(controller, image, 1, 1, "transparent"),
      ).toThrow("Maximale Drohnenanzahl von 3000 überschritten.");
    });

    it("throws when valid pixels plus existing drones reach limit", () => {
      const image = createPixelData(2, 2, [
        [255, 0, 0, 255],
        [0, 255, 0, 255],
        [0, 0, 255, 255],
        [255, 255, 0, 255],
      ]);
      const { controller } = createControllerMock(new Array(2996).fill(0));

      expect(() =>
        generateDroneFormation(controller, image, 1, 1, "transparent"),
      ).toThrow("Maximale Drohnenanzahl von 3000 überschritten.");
    });

    it("creates drones, keyframes and group for valid pixels", () => {
      const image = createPixelData(2, 2, [
        [255, 0, 0, 255],
        [0, 255, 0, 255],
        [0, 0, 255, 0],
        [255, 255, 0, 255],
      ]);
      const {
        controller,
        addDrone,
        addPositionKeyFrame,
        addColorKeyFrame,
        createGroup,
        addDronesToGroup,
      } = createControllerMock();

      generateDroneFormation(controller, image, 2, 3, "transparent");

      expect(addDrone).toHaveBeenCalledTimes(3);
      expect(addPositionKeyFrame).toHaveBeenCalledTimes(3);
      expect(addColorKeyFrame).toHaveBeenCalledTimes(3);
      expect(createGroup).toHaveBeenCalledTimes(1);
      expect(addDronesToGroup).toHaveBeenCalledWith([100, 101, 102], 42);

      const firstPosFrame = addPositionKeyFrame.mock.calls[0][1];
      expect(firstPosFrame.getTime()).toBe(12);
      expect(firstPosFrame.getPos().x).toBe(-1);
      expect(firstPosFrame.getPos().y).toBe(8);
      expect(firstPosFrame.getPos().z).toBe(0);

      const firstColorFrame = addColorKeyFrame.mock.calls[0][1];
      expect(firstColorFrame.getTime()).toBe(12);
      expect(firstColorFrame.getColor().r).toBeCloseTo(1);
      expect(firstColorFrame.getColor().g).toBeCloseTo(0);
      expect(firstColorFrame.getColor().b).toBeCloseTo(0);
    });

    it("ignores pixels according to configured ignore color", () => {
      const image = createPixelData(2, 2, [
        [255, 255, 255, 255],
        [10, 10, 10, 255],
        [255, 255, 255, 255],
        [20, 30, 40, 255],
      ]);
      const { controller, addDrone } = createControllerMock();

      generateDroneFormation(controller, image, 1, 1, "white" as IgnoreColor);

      expect(addDrone).toHaveBeenCalledTimes(2);
    });
  });
});

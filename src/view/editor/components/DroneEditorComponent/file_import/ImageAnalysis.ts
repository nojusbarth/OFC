import { SampledImage } from "./ImageSampling";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { Color, Vector3 } from "three";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";

export type IgnoreColor = "white" | "black" | "transparent";

export function generateDroneFormation(
  controller: IUndoableController,
  image: SampledImage,
  pixelSpacingX: number,
  pixelSpacingY: number,
  ignoreColor: IgnoreColor,
) {
  const { width, height, data } = image;

  const totalPixels = width * height;
  const MAX_DRONES = 3000;

  if (totalPixels > MAX_DRONES) {
    throw new Error(`Maximale Drohnenanzahl von ${MAX_DRONES} überschritten.`);
  }

  const insertTime = controller.getTimeController().getTime();

  const totalWidth = (width - 1) * pixelSpacingX;
  const xOffset = totalWidth / 2;

  const validPixelCount = calculateValidPixelCount(image, ignoreColor);
  const currentDroneCount = controller.getDrones().length;
  if (validPixelCount + currentDroneCount >= MAX_DRONES) {
    throw new Error(`Maximale Drohnenanzahl von ${MAX_DRONES} überschritten.`);
  }

  const droneIds: number[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (isIgnoredPixel(r, g, b, a, ignoreColor)) {
        continue;
      }

      const posX = x * pixelSpacingX - xOffset;
      const posY = 5 + (height - 1 - y) * pixelSpacingY;
      const posZ = 0;

      const droneId = controller.addDrone();
      droneIds.push(droneId);

      controller.addPositionKeyFrame(
        droneId,
        new PositionKeyFrame(new Vector3(posX, posY, posZ), insertTime),
      );
      controller.addColorKeyFrame(
        droneId,
        new ColorKeyFrame(new Color(r / 255, g / 255, b / 255), insertTime),
      );
    }
  }
  const groupId = controller.getGroupManager().createGroup();
  controller.getGroupManager().addDronesToGroup(droneIds, groupId);
}

export function calculateValidPixelCount(
  image: SampledImage,
  ignoreColor: IgnoreColor,
): number {
  const { width, height, data } = image;

  let count = 0;

  for (let i = 0; i < width * height; i++) {
    const index = i * 4;

    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];

    if (isIgnoredPixel(r, g, b, a, ignoreColor)) {
      continue;
    }

    count++;
  }

  return count;
}

function isIgnoredPixel(
  r: number,
  g: number,
  b: number,
  a: number,
  ignoreColor: IgnoreColor,
): boolean {
  switch (ignoreColor) {
    case "white":
      return r > 250 && g > 250 && b > 250;

    case "black":
      return r < 5 && g < 5 && b < 5;

    case "transparent":
      return a < 10;

    default:
      return false;
  }
}

const MAX_TOTAL_PIXELS = 2500;

export function clampResolution(width: number, height: number) {
  width = Math.max(1, Math.floor(width));
  height = Math.max(1, Math.floor(height));

  if (width * height > MAX_TOTAL_PIXELS) {
    const scale = Math.sqrt(MAX_TOTAL_PIXELS / (width * height));
    width = Math.floor(width * scale);
    height = Math.floor(height * scale);
  }

  return { width, height };
}

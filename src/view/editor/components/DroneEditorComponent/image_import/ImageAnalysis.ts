import { PixelData } from "./ImageLoader";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { Color, Vector3 } from "three";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Definiert welche Hintergrundfarbe beim Bildimport ignoriert werden soll.
 */
export type IgnoreColor = "white" | "black" | "transparent";

/**
 * Erzeugt aus einem Bild eine Drohnenformation und legt Position- sowie Farb-Keyframes
 * für den aktuellen Zeitpunkt an.
 * @param controller - Controller für Drohnen- und Keyframe-Operationen.
 * @param image - Eingelesene Bilddaten als Pixelraster.
 * @param pixelSpacingX - Abstand zwischen Drohnen entlang der X-Achse.
 * @param pixelSpacingY - Abstand zwischen Drohnen entlang der Y-Achse.
 * @param ignoreColor - Hintergrundfarbe, die beim Erzeugen ausgelassen wird.
 * @throws Error - Falls die maximal unterstützte Drohnenanzahl überschritten wird.
 */
export function generateDroneFormation(
  controller: IUndoableController,
  image: PixelData,
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

  // HIER MUSS NOCH OPTIMIERT WERDEN

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

/**
 * Zählt alle Pixel eines Bildes, die nicht der konfigurierten Ignorierfarbe entsprechen.
 * @param image - Eingelesene Bilddaten als Pixelraster.
 * @param ignoreColor - Hintergrundfarbe, die nicht mitgezählt werden soll.
 * @returns Anzahl der gültigen Pixel.
 */
export function calculateValidPixelCount(
  image: PixelData,
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

/**
 * Begrenzt eine Zielauflösung so, dass die Gesamtanzahl an Pixeln das definierte
 * Maximum nicht überschreitet.
 * @param width - Gewünschte Zielbreite.
 * @param height - Gewünschte Zielhöhe.
 * @returns Korrigierte Breite und Höhe innerhalb des Limits.
 */
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

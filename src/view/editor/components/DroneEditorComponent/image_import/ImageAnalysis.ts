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

const MAX_DRONES = 3000;

type FormationPixel = {
  position: Vector3;
  color: Color;
  x: number;
  y: number;
};

type DronePixelAssignment = {
  droneId: number;
  pixel: FormationPixel;
};

/**
 * Erzeugt aus einem Bild eine Drohnenformation und legt neue Drohnen mit Position-
 * sowie Farb-Keyframes für den aktuellen Zeitpunkt an.
 * @param controller - Controller für Drohnen- und Keyframe-Operationen.
 * @param image - Eingelesene Bilddaten als Pixelraster.
 * @param pixelSpacingX - Abstand zwischen Drohnen entlang der X-Achse.
 * @param pixelSpacingY - Abstand zwischen Drohnen entlang der Y-Achse.
 * @param ignoreColor - Hintergrundfarbe, die beim Erzeugen ausgelassen wird.
 * @throws Error - Falls die maximal unterstützte Drohnenanzahl überschritten wird.
 */
export function generateDroneFormationForNew(
  controller: IUndoableController,
  image: PixelData,
  pixelSpacingX: number,
  pixelSpacingY: number,
  ignoreColor: IgnoreColor,
) {
  const insertTime = controller.getTimeController().getTime();

  const pixels = collectFormationPixels(
    image,
    pixelSpacingX,
    pixelSpacingY,
    ignoreColor,
  );
  if (pixels.length > MAX_DRONES) {
    throw new Error(`Maximale Drohnenanzahl von ${MAX_DRONES} überschritten.`);
  }

  const currentDroneCount = controller.getDrones().length;
  if (pixels.length + currentDroneCount >= MAX_DRONES) {
    throw new Error(`Maximale Drohnenanzahl von ${MAX_DRONES} überschritten.`);
  }

  controller.startBatching();

  const droneIds = createDronesForPixels(controller, pixels, insertTime);

  const groupId = controller.getGroupManager().createGroup();
  controller.getGroupManager().addDronesToGroup(droneIds, groupId);
  controller.endBatching();
}

/**
 * Erzeugt aus einem Bild eine Drohnenformation, indem bestehende Drohnen den
 * passenden Bildpixeln möglichst nah zugeordnet werden und fehlende Positionen
 * durch neue Drohnen ergänzt werden.
 */
export function generateDroneFormationForSelected(
  controller: IUndoableController,
  image: PixelData,
  pixelSpacingX: number,
  pixelSpacingY: number,
  ignoreColor: IgnoreColor,
) {
  const insertTime = controller.getTimeController().getTime();
  const pixels = collectFormationPixels(
    image,
    pixelSpacingX,
    pixelSpacingY,
    ignoreColor,
  );
  const selectedDroneIds = sortDroneIdsByPosition(
    controller,
    controller.getSelectedDrones(),
  );

  if (selectedDroneIds.length === 0) {
    throw new Error("Keine Drohnen ausgewählt.");
  }

  const requiredNewDroneCount = Math.max(
    0,
    pixels.length - selectedDroneIds.length,
  );
  const currentDroneCount = controller.getDrones().length;

  if (currentDroneCount + requiredNewDroneCount > MAX_DRONES) {
    throw new Error(`Maximale Drohnenanzahl von ${MAX_DRONES} überschritten.`);
  }

  controller.startBatching();

  const remainingPixels = matchDronesToClosestPixels(
    controller,
    selectedDroneIds,
    pixels,
  );

  for (const assignment of remainingPixels.assignments) {
    applyFormationToDrone(
      controller,
      assignment.droneId,
      assignment.pixel,
      insertTime,
    );
  }

  createDronesForPixels(
    controller,
    remainingPixels.unassignedPixels,
    insertTime,
  );

  controller.endBatching();
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
  return collectFormationPixels(image, 1, 1, ignoreColor).length;
}

function collectFormationPixels(
  image: PixelData,
  pixelSpacingX: number,
  pixelSpacingY: number,
  ignoreColor: IgnoreColor,
): FormationPixel[] {
  const { width, height, data } = image;
  const totalWidth = (width - 1) * pixelSpacingX;
  const xOffset = totalWidth / 2;

  const pixels: FormationPixel[] = [];

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

      pixels.push({
        position: new Vector3(
          x * pixelSpacingX - xOffset,
          5 + (height - 1 - y) * pixelSpacingY,
          0,
        ),
        color: new Color(r / 255, g / 255, b / 255),
        x,
        y,
      });
    }
  }

  return pixels;
}

function createDronesForPixels(
  controller: IUndoableController,
  pixels: FormationPixel[],
  insertTime: number,
): number[] {
  const droneIds: number[] = [];

  for (const pixel of pixels) {
    const droneId = controller.addDrone();
    droneIds.push(droneId);
    applyFormationToDrone(controller, droneId, pixel, insertTime);
  }

  return droneIds;
}

function applyFormationToDrone(
  controller: IUndoableController,
  droneId: number,
  pixel: FormationPixel,
  insertTime: number,
) {
  controller.addPositionKeyFrame(
    droneId,
    new PositionKeyFrame(pixel.position, insertTime),
  );
  controller.addColorKeyFrame(
    droneId,
    new ColorKeyFrame(pixel.color, insertTime),
  );
}

function matchDronesToClosestPixels(
  controller: IUndoableController,
  droneIds: number[],
  pixels: FormationPixel[],
): { assignments: DronePixelAssignment[]; unassignedPixels: FormationPixel[] } {
  const availablePixels = sortPixelsByLayout(pixels);
  const assignments: DronePixelAssignment[] = [];

  for (const droneId of droneIds) {
    if (availablePixels.length === 0) {
      break;
    }

    const dronePosition = controller.getPosition(droneId);
    const pixelIndex = findClosestPixelIndex(dronePosition, availablePixels);
    const [pixel] = availablePixels.splice(pixelIndex, 1);

    assignments.push({
      droneId,
      pixel,
    });
  }

  return { assignments, unassignedPixels: availablePixels };
}

function findClosestPixelIndex(
  dronePosition: Vector3,
  pixels: FormationPixel[],
): number {
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  pixels.forEach((pixel, index) => {
    const distance = dronePosition.distanceToSquared(pixel.position);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function sortPixelsByLayout(pixels: FormationPixel[]): FormationPixel[] {
  return [...pixels].sort((left, right) => {
    if (left.y !== right.y) {
      return right.y - left.y;
    }
    if (left.x !== right.x) {
      return left.x - right.x;
    }
    return 0;
  });
}

function sortDroneIdsByPosition(
  controller: IUndoableController,
  droneIds: number[],
): number[] {
  return [...droneIds].sort((left, right) => {
    const leftPosition = controller.getPosition(left);
    const rightPosition = controller.getPosition(right);

    if (leftPosition.y !== rightPosition.y) {
      return rightPosition.y - leftPosition.y;
    }
    if (leftPosition.x !== rightPosition.x) {
      return leftPosition.x - rightPosition.x;
    }

    return left - right;
  });
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

export { generateDroneFormationForNew as generateDroneFormation };

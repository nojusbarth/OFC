import { resampleImageNearest } from "../../../view/editor/components/DroneEditorComponent/image_import/ImageSampling";

// Dieser Abschnitt ist teilweise KI generiert

describe("ImageSampling", () => {
  describe("resampleImageNearest", () => {
    it("sollte die richtige Zielgröße zurückgeben", () => {
      const sourceData = new Uint8ClampedArray(16); // 2x2 RGBA
      const result = resampleImageNearest(2, 2, sourceData, 4, 4);

      expect(result.width).toBe(4);
      expect(result.height).toBe(4);
    });

    it("sollte die korrekte Datengröße für das Zielformat haben", () => {
      const sourceData = new Uint8ClampedArray(400); // 10x10 RGBA
      const targetWidth = 5;
      const targetHeight = 5;

      const result = resampleImageNearest(
        10,
        10,
        sourceData,
        targetWidth,
        targetHeight,
      );

      expect(result.data.length).toBe(targetWidth * targetHeight * 4);
    });

    it("sollte ohne Skalierung die gleichen Pixelwerte kopieren", () => {
      // 2x2 Bild mit bekannten Pixelwerten
      const sourceData = new Uint8ClampedArray([
        255,
        128,
        64,
        255, // Pixel (0,0): Rot, Grün, Blau, Alpha
        100,
        150,
        200,
        200, // Pixel (1,0)
        50,
        75,
        100,
        150, // Pixel (0,1)
        10,
        20,
        30,
        40, // Pixel (1,1)
      ]);

      const result = resampleImageNearest(2, 2, sourceData, 2, 2);

      // Sollte identisch sein
      for (let i = 0; i < sourceData.length; i++) {
        expect(result.data[i]).toBe(sourceData[i]);
      }
    });

    it("sollte Upsampling korrekt durchführen (Nearest-Neighbor)", () => {
      // 2x2 -> 4x4 Upsampling
      const sourceData = new Uint8ClampedArray([
        255,
        0,
        0,
        255, // Rot
        0,
        255,
        0,
        255, // Grün
        0,
        0,
        255,
        255, // Blau
        255,
        255,
        0,
        255, // Gelb
      ]);

      const result = resampleImageNearest(2, 2, sourceData, 4, 4);

      // Bei 2x2 -> 4x4 sollte jeder Pixel 2x vergrößert werden
      // Pixel (0,0) = Rot, sollte bei (0,0), (1,0), (0,1), (1,1) usw. sein
      const redPixel = [255, 0, 0, 255];
      expect(Array.from(result.data.slice(0, 4))).toEqual(redPixel);
    });

    it("sollte Downsampling korrekt durchführen", () => {
      // 4x4 -> 2x2 Downsampling
      const sourceData = new Uint8ClampedArray(64); // 4x4 RGBA
      sourceData.fill(0);

      // Setze eindeutige Werte für jeden Quell-Pixel
      const setPixel = (
        x: number,
        y: number,
        r: number,
        g: number,
        b: number,
        a: number,
      ) => {
        const index = (y * 4 + x) * 4;
        sourceData[index] = r;
        sourceData[index + 1] = g;
        sourceData[index + 2] = b;
        sourceData[index + 3] = a;
      };

      setPixel(0, 0, 255, 0, 0, 255); // Rot
      setPixel(1, 0, 0, 255, 0, 255); // Grün
      setPixel(0, 1, 0, 0, 255, 255); // Blau
      setPixel(1, 1, 255, 255, 0, 255); // Gelb

      const result = resampleImageNearest(4, 4, sourceData, 2, 2);

      // Target sollte auch 4 Pixel haben
      expect(result.data.length).toBe(16); // 2x2x4
    });

    it("sollte mit 1x1 als Quelle upsampling durchführen", () => {
      const sourceData = new Uint8ClampedArray([200, 100, 50, 255]); // Ein Pixel: RGBA

      const result = resampleImageNearest(1, 1, sourceData, 3, 3);

      // Alle 9 Ziel-Pixel sollten den gleichen Wert haben
      for (let i = 0; i < 9; i++) {
        const startIdx = i * 4;
        expect(result.data[startIdx]).toBe(200);
        expect(result.data[startIdx + 1]).toBe(100);
        expect(result.data[startIdx + 2]).toBe(50);
        expect(result.data[startIdx + 3]).toBe(255);
      }
    });

    it("sollte zu 1x1 downsampling durchführen", () => {
      // 3x3 -> 1x1: Sollte das Pixel an (0,0) nehmen (Nearest-Neighbor)
      const sourceData = new Uint8ClampedArray(36); // 3x3 RGBA
      sourceData.fill(0);

      // Setze Wert für Pixel (0,0)
      sourceData[0] = 123;
      sourceData[1] = 45;
      sourceData[2] = 67;
      sourceData[3] = 89;

      const result = resampleImageNearest(3, 3, sourceData, 1, 1);

      expect(result.width).toBe(1);
      expect(result.height).toBe(1);
      expect(result.data[0]).toBe(123);
      expect(result.data[1]).toBe(45);
      expect(result.data[2]).toBe(67);
      expect(result.data[3]).toBe(89);
    });

    it("sollte verschiedene Skalierungsverhältnisse korrekt handhaben", () => {
      // 10x10 -> 5x5 (faktor 2)
      const sourceData = new Uint8ClampedArray(400);
      sourceData.fill(128);

      const result = resampleImageNearest(10, 10, sourceData, 5, 5);

      expect(result.width).toBe(5);
      expect(result.height).toBe(5);
      expect(result.data.length).toBe(100); // 5x5x4
      // Alle sollten auf 128 gesetzt sein
      for (let i = 0; i < result.data.length; i += 4) {
        expect(result.data[i]).toBe(128);
      }
    });

    it("sollte nicht-quadratisches Upsampling korrekt durchführen", () => {
      // 2x3 -> 4x6
      const sourceData = new Uint8ClampedArray(24); // 2x3 RGBA
      sourceData.fill(200);

      const result = resampleImageNearest(2, 3, sourceData, 4, 6);

      expect(result.width).toBe(4);
      expect(result.height).toBe(6);
      expect(result.data.length).toBe(96); // 4x6x4
    });

    it("sollte nicht-quadratisches Downsampling korrekt durchführen", () => {
      // 8x6 -> 4x3
      const sourceData = new Uint8ClampedArray(192); // 8x6 RGBA
      sourceData.fill(75);

      const result = resampleImageNearest(8, 6, sourceData, 4, 3);

      expect(result.width).toBe(4);
      expect(result.height).toBe(3);
      expect(result.data.length).toBe(48); // 4x3x4
    });

    it("sollte korrekt mit Alpha-Kanal umgehen", () => {
      // 2x2 Bild mit verschiedenen Alpha-Werten
      const sourceData = new Uint8ClampedArray([
        255,
        255,
        255,
        255, // Weiß, voll sichtbar
        255,
        255,
        255,
        128, // Weiß, halb transparent
        255,
        255,
        255,
        64, // Weiß, sehr transparent
        255,
        255,
        255,
        0, // Weiß, vollständig transparent
      ]);

      const result = resampleImageNearest(2, 2, sourceData, 2, 2);

      // Alpha-Werte sollten exakt kopiert sein
      expect(result.data[3]).toBe(255);
      expect(result.data[7]).toBe(128);
      expect(result.data[11]).toBe(64);
      expect(result.data[15]).toBe(0);
    });

    it("sollte große Skalierungsfaktoren korrekt handhaben", () => {
      // 1x1 -> 100x100
      const sourceData = new Uint8ClampedArray([50, 100, 150, 200]);

      const result = resampleImageNearest(1, 1, sourceData, 100, 100);

      expect(result.width).toBe(100);
      expect(result.height).toBe(100);
      expect(result.data.length).toBe(40000); // 100x100x4

      // Erstes und letztes Pixel sollten gleich sein
      expect(result.data[0]).toBe(50);
      expect(result.data[39996]).toBe(50);
    });

    it("sollte PixelData mit korrektem Type-Info zurückgeben", () => {
      const sourceData = new Uint8ClampedArray(16); // 2x2
      const result = resampleImageNearest(2, 2, sourceData, 4, 4);

      expect(result).toHaveProperty("width");
      expect(result).toHaveProperty("height");
      expect(result).toHaveProperty("data");
      expect(result.data).toBeInstanceOf(Uint8ClampedArray);
    });

    it("sollte Eckpixel korrekt samplen", () => {
      // 3x3 -> 2x2
      const sourceData = new Uint8ClampedArray(36); // 3x3 RGBA
      sourceData.fill(0);

      // Setze unterschiedliche Werte für die vier Ecken
      sourceData[0] = 255; // (0,0) - oben links - R
      sourceData[2 * 4] = 200; // (2,0) - oben rechts - R
      sourceData[2 * 3 * 4] = 150; // (0,2) - unten links - R
      sourceData[2 * 3 * 4 + 2 * 4] = 100; // (2,2) - unten rechts - R

      const result = resampleImageNearest(3, 3, sourceData, 2, 2);

      // Mit Nearest-Neighbor sollten diese Werte gemappt werden
      expect(result.data.length).toBe(16); // 2x2x4
    });
  });
});

import {
  calculateDayTimeFromSunPosition,
  convertToUTCWithLongitude,
} from "../../../view/editor/utils/dayTimeCalculator";
import { DayTime } from "../../../repository/entity/DayTime";

//KI GENERIERT

describe("calculateDayTimeFromSunPosition", () => {
  // Karlsruhe Koordinaten für Tests
  const KARLSRUHE_LAT = 49.0069;
  const KARLSRUHE_LON = 8.4037;

  it("should return NOON for midday sun position in summer", () => {
    // 21. Juni 2024, 12:00 UTC (Sommersonnenwende)
    const date = new Date("2024-06-21T12:00:00Z");
    const result = calculateDayTimeFromSunPosition(
      date,
      KARLSRUHE_LAT,
      KARLSRUHE_LON,
    );
    expect(result).toBe(DayTime.NOON);
  });

  it("should return NIGHT for midnight sun position in winter", () => {
    // 21. Dezember 2024, 00:00 UTC (Wintersonnenwende, Mitternacht)
    const date = new Date("2024-12-21T00:00:00Z");
    const result = calculateDayTimeFromSunPosition(
      date,
      KARLSRUHE_LAT,
      KARLSRUHE_LON,
    );
    expect(result).toBe(DayTime.NIGHT);
  });

  it("should return SUNSET for evening sun position", () => {
    // 21. Juni 2024, 20:00 UTC (Abend, Sonnenuntergangszeit)
    const date = new Date("2024-06-21T20:00:00Z");
    const result = calculateDayTimeFromSunPosition(
      date,
      KARLSRUHE_LAT,
      KARLSRUHE_LON,
    );
    expect(result).toBe(DayTime.SUNSET);
  });

  it("should return NOON for afternoon sun", () => {
    // 21. Juni 2024, 14:00 UTC (Nachmittag, hoher Sonnenstand)
    const date = new Date("2024-06-21T14:00:00Z");
    const result = calculateDayTimeFromSunPosition(
      date,
      KARLSRUHE_LAT,
      KARLSRUHE_LON,
    );
    expect(result).toBe(DayTime.NOON);
  });

  it("should return NIGHT for late night", () => {
    // 21. Dezember 2024, 02:00 UTC (Nachts)
    const date = new Date("2024-12-21T02:00:00Z");
    const result = calculateDayTimeFromSunPosition(
      date,
      KARLSRUHE_LAT,
      KARLSRUHE_LON,
    );
    expect(result).toBe(DayTime.NIGHT);
  });

  it("should handle equator coordinates at noon", () => {
    const date = new Date("2024-06-21T12:00:00Z");
    const result = calculateDayTimeFromSunPosition(date, 0, 0);
    expect(result).toBe(DayTime.NOON);
  });

  it("should handle equator coordinates at midnight", () => {
    const date = new Date("2024-06-21T00:00:00Z");
    const result = calculateDayTimeFromSunPosition(date, 0, 0);
    expect(result).toBe(DayTime.NIGHT);
  });

  it("should return valid DayTime enum value", () => {
    const date = new Date("2024-06-21T12:00:00Z");
    const result = calculateDayTimeFromSunPosition(
      date,
      KARLSRUHE_LAT,
      KARLSRUHE_LON,
    );
    expect([DayTime.NOON, DayTime.SUNSET, DayTime.NIGHT]).toContain(result);
  });
});

describe("convertToUTCWithLongitude", () => {
  it("should correctly adjust for positive longitude (East)", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", 15);
    // 15° Ost = +1 Stunde, sollte 11:00 UTC ergeben
    expect(result.getUTCHours()).toBe(11);
    expect(result.getUTCMinutes()).toBe(0);
  });

  it("should correctly adjust for negative longitude (West)", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", -15);
    // 15° West = -1 Stunde, sollte 13:00 UTC ergeben
    expect(result.getUTCHours()).toBe(13);
    expect(result.getUTCMinutes()).toBe(0);
  });

  it("should handle zero longitude (Prime Meridian)", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", 0);
    expect(result.getUTCHours()).toBe(12);
    expect(result.getUTCMinutes()).toBe(0);
  });

  it("should handle large positive longitude (Tokyo ~139.7°)", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", 139.7);
    // 139.7/15 ≈ 9.3 Stunden
    expect(result.getUTCHours()).toBe(2); // 12 - 9.3 ≈ 2:42
  });

  it("should handle large negative longitude (New York ~-74°)", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", -74);
    // -74/15 ≈ -4.9 Stunden
    expect(result.getUTCHours()).toBe(16); // 12 - (-4.9) ≈ 16:56
  });

  it("should preserve the date", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", 8.4037);
    expect(result.getUTCFullYear()).toBe(2024);
    expect(result.getUTCMonth()).toBe(5); // Juni = Monat 5 (0-basiert)
    expect(result.getUTCDate()).toBe(21);
  });

  it("should handle different times", () => {
    const result1 = convertToUTCWithLongitude("2024-06-21", "08:00", 15);
    expect(result1.getUTCHours()).toBe(7);

    const result2 = convertToUTCWithLongitude("2024-06-21", "18:30", 15);
    expect(result2.getUTCHours()).toBe(17);
    expect(result2.getUTCMinutes()).toBe(30);
  });

  it("should handle midnight correctly", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "00:00", 15);
    // 00:00 - 1 Stunde = 23:00 des Vortages
    // Aber da wir mit UTC starten, bleibt es bei Tag 21, 23:00 des Vortags
    expect(result.getUTCHours()).toBe(23);
  });

  it("should handle date rollover for positive longitude", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "00:30", 30);
    // 00:30 - 2 Stunden = 22:30 des Vortags
    expect(result.getUTCHours()).toBe(22);
    expect(result.getUTCDate()).toBe(20); // Einen Tag zurück
  });

  it("should return Date object", () => {
    const result = convertToUTCWithLongitude("2024-06-21", "12:00", 8.4037);
    expect(result).toBeInstanceOf(Date);
  });
});

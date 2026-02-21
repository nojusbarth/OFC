import { mapDayTimeToDisplayName } from "../../../view/editor/utils/dayTimeMapper";
import { DayTime } from "../../../repository/entity/DayTime";
//KI GENERIERT

describe("mapDayTimeToDisplayName", () => {
  it("should map NOON to 'Mittag'", () => {
    expect(mapDayTimeToDisplayName(DayTime.NOON)).toBe("Mittag");
  });

  it("should map SUNSET to 'Dämmerung'", () => {
    expect(mapDayTimeToDisplayName(DayTime.SUNSET)).toBe("Dämmerung");
  });

  it("should map NIGHT to 'Nacht'", () => {
    expect(mapDayTimeToDisplayName(DayTime.NIGHT)).toBe("Nacht");
  });

  it("should return correct string type", () => {
    const result = mapDayTimeToDisplayName(DayTime.NOON);
    expect(typeof result).toBe("string");
  });

  it("should map all enum values", () => {
    const allValues = [DayTime.NOON, DayTime.SUNSET, DayTime.NIGHT];

    allValues.forEach((dayTime) => {
      const result = mapDayTimeToDisplayName(dayTime);
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});

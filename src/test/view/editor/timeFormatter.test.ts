import { formatTime } from "../../../view/editor/utils/timeFormatter";
//KI GENERIERT

describe("formatTime", () => {
  it("should format zero seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("should format seconds without minutes", () => {
    expect(formatTime(45)).toBe("00:45");
  });

  it("should format full minutes without seconds", () => {
    expect(formatTime(120)).toBe("02:00");
  });

  it("should format minutes and seconds", () => {
    expect(formatTime(155)).toBe("02:35");
  });

  it("should handle large values", () => {
    expect(formatTime(3661)).toBe("61:01");
  });

  it("should handle very large values", () => {
    expect(formatTime(7200)).toBe("120:00");
  });

  it("should pad single digit minutes", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("should pad single digit seconds", () => {
    expect(formatTime(125)).toBe("02:05");
  });

  it("should pad both single digits", () => {
    expect(formatTime(61)).toBe("01:01");
  });

  it("should handle decimal seconds by flooring", () => {
    expect(formatTime(125.7)).toBe("02:05");
  });

  it("should handle decimal seconds close to next second", () => {
    expect(formatTime(125.999)).toBe("02:05");
  });

  it("should handle one second", () => {
    expect(formatTime(1)).toBe("00:01");
  });

  it("should handle one minute", () => {
    expect(formatTime(60)).toBe("01:00");
  });

  it("should handle 59 seconds", () => {
    expect(formatTime(59)).toBe("00:59");
  });

  it("should error negative values (edge case)", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    expect(formatTime(-30)).toBe("00:00");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Negative Sekunden werden nicht unterstützt",
    );
  });

  it("should handle typical show duration (5 minutes)", () => {
    expect(formatTime(300)).toBe("05:00");
  });

  it("should handle typical show duration (10 minutes 30 seconds)", () => {
    expect(formatTime(630)).toBe("10:30");
  });
});

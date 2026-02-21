import SunCalc from "suncalc";
import { DayTime } from "../../../repository/entity/DayTime";

/**
 * Berechnet die Tageszeit basierend auf Sonnenstand
 * @param utcDate - UTC Datum/Zeit
 * @param latitude - Breitengrad
 * @param longitude - Längengrad
 * @returns Berechnete Tageszeit
 */
export function calculateDayTimeFromSunPosition(
  utcDate: Date,
  latitude: number,
  longitude: number,
): DayTime {
  const sunPos = SunCalc.getPosition(utcDate, latitude, longitude);
  const altitudeDeg = sunPos.altitude * (180 / Math.PI);

  if (altitudeDeg < -6) {
    return DayTime.NIGHT;
  } else if (altitudeDeg >= -6 && altitudeDeg <= 6) {
    return DayTime.SUNSET;
  } else {
    return DayTime.NOON;
  }
}

/**
 * Konvertiert lokale Zeit in UTC unter Berücksichtigung der Längengrad-Zeitverschiebung
 * @param dateStr - Datum als String (YYYY-MM-DD)
 * @param timeStr - Zeit als String (HH:MM)
 * @param longitude - Längengrad
 * @returns UTC Date Objekt
 */
export function convertToUTCWithLongitude(
  dateStr: string,
  timeStr: string,
  longitude: number,
): Date {
  const utcDate = new Date(`${dateStr}T${timeStr}Z`);
  const offsetHours = longitude / 15;
  utcDate.setHours(utcDate.getHours() - offsetHours);
  return utcDate;
}

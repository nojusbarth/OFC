import { DayTime } from "../../../repository/entity/DayTime";

/**
 * Mappt DayTime Enum zu deutschem Anzeigenamen
 * @param dayTime - Die DayTime Enum
 * @returns Deutscher Anzeigename
 */
export function mapDayTimeToDisplayName(dayTime: DayTime): string {
  switch (dayTime) {
    case DayTime.NOON:
      return "Mittag";
    case DayTime.SUNSET:
      return "Dämmerung";
    case DayTime.NIGHT:
      return "Nacht";
  }
}

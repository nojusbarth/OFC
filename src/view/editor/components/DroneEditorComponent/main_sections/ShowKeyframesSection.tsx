import { Card } from "react-bootstrap";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";
import { TitleComponent } from "../SharedComponents";
import { KeyframeCard } from "./KeyframeCard";
import { useTranslation } from "react-i18next";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Diese Komponente zeigt Positions- und Farb-Keyframes der aktuellen Auswahl an
 * und bietet Aktionen zum Springen und Entfernen.
 * @param positionKeyframes - Liste der Positions-Keyframes.
 * @param colorKeyframes - Liste der Farb-Keyframes.
 * @param getIdForKeyframe - Liefert die Drohnen-ID zu einem Keyframe.
 * @param handleRemoveKeyframe - Entfernt einen ausgewählten Keyframe.
 * @param handleJumpToTime - Springt zur Zeitmarke eines Keyframes.
 * @returns JSX-Karte mit Keyframe-Listen oder leerem Hinweis.
 */
export function ShowKeyframesSection({
  positionKeyframes,
  colorKeyframes,
  getIdForKeyframe,
  handleRemoveKeyframe,
  handleJumpToTime,
}: {
  positionKeyframes: PositionKeyFrame[];
  colorKeyframes: ColorKeyFrame[];
  getIdForKeyframe: (
    keyframe: PositionKeyFrame | ColorKeyFrame,
  ) => number | undefined;
  handleRemoveKeyframe: (
    keyframe: PositionKeyFrame | ColorKeyFrame,
  ) => void;
  handleJumpToTime: (
    keyframe: PositionKeyFrame | ColorKeyFrame,
  ) => void;
}) {
  const { t } = useTranslation();
  const hasKeyframes =
    positionKeyframes.length > 0 || colorKeyframes.length > 0;

  return (
    <Card className="p-3">
      <TitleComponent title={t("editor.keyframes.droneKeyframes")} />

      {hasKeyframes ? (
        <>
          {positionKeyframes.length > 0 && (
            <KeyframeCard
              title={t("editor.keyframes.positionKeyframes")}
              keyframes={positionKeyframes}
              getIdForKeyframe={getIdForKeyframe}
              handleRemoveKeyframe={handleRemoveKeyframe}
              handleJumpToTime={handleJumpToTime}
            />
          )}

          {colorKeyframes.length > 0 && (
            <KeyframeCard
              title={t("editor.keyframes.colorKeyframes")}
              keyframes={colorKeyframes}
              getIdForKeyframe={getIdForKeyframe}
              handleRemoveKeyframe={handleRemoveKeyframe}
              handleJumpToTime={handleJumpToTime}
            />
          )}
        </>
      ) : (
        <p className="text-muted small mb-0">
          {t("editor.keyframes.none")}
        </p>
      )}
    </Card>
  );
}
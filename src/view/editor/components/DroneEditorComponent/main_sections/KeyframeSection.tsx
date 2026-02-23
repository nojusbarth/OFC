import { Card } from "react-bootstrap";
import { ColorKeyFrame } from "../../../../../repository/entity/ColorKeyFrame";
import { PositionKeyFrame } from "../../../../../repository/entity/PositionKeyFrame";
import { TitleComponent } from "../SharedComponents";
import { KeyframeGroup } from "./KeyframeGroup";

export function KeyframeSection({
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
  const hasKeyframes =
    positionKeyframes.length > 0 || colorKeyframes.length > 0;

  return (
    <Card className="p-3">
      <TitleComponent title="Drohnen Keyframes" />

      {hasKeyframes ? (
        <>
          {positionKeyframes.length > 0 && (
            <KeyframeGroup
              title="Position Keyframes"
              keyframes={positionKeyframes}
              getIdForKeyframe={getIdForKeyframe}
              handleRemoveKeyframe={handleRemoveKeyframe}
              handleJumpToTime={handleJumpToTime}
            />
          )}

          {colorKeyframes.length > 0 && (
            <KeyframeGroup
              title="Color Keyframes"
              keyframes={colorKeyframes}
              getIdForKeyframe={getIdForKeyframe}
              handleRemoveKeyframe={handleRemoveKeyframe}
              handleJumpToTime={handleJumpToTime}
            />
          )}
        </>
      ) : (
        <p className="text-muted small mb-0">
          Keine Keyframes vorhanden
        </p>
      )}
    </Card>
  );
}
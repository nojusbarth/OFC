
import { PositionKeyFrame } from "../../../../repository/entity/PositionKeyFrame";

import { ColorKeyFrame } from "../../../../repository/entity/ColorKeyFrame";
import { Card } from "react-bootstrap";

export function KeyframeGroup({
  title,
  keyframes,
  getIdForKeyframe,
  handleRemoveKeyframe,
  handleJumpToTime,
}: any) {
  return (
    <div className="mb-3">
      <div className="text-muted small mb-2">{title}</div>

      {keyframes.map((keyframe: any) => (
        <KeyframeComponent
          key={keyframe.getTime()}
          keyframe={keyframe}
          handleRemoveKeyframe={handleRemoveKeyframe}
          handleJumpToTime={handleJumpToTime}
          getIdForKeyframe={getIdForKeyframe}
        />
      ))}
    </div>
  );
}


function KeyframeComponent({
  keyframe,
  handleRemoveKeyframe,
  handleJumpToTime,
  getIdForKeyframe,
}: {
  keyframe: PositionKeyFrame | ColorKeyFrame;
  handleRemoveKeyframe: (keyframe: PositionKeyFrame | ColorKeyFrame) => void;
  handleJumpToTime: (keyframe: PositionKeyFrame | ColorKeyFrame) => void;
  getIdForKeyframe: (
    keyframe: PositionKeyFrame | ColorKeyFrame,
  ) => number | undefined;
}) {
  return (
    <Card className="mb-2">
      <Card.Body className="p-2 d-flex align-items-center justify-content-between">
        <div className="flex-grow-1 d-flex align-items-center gap-2">
          {keyframe instanceof ColorKeyFrame && (
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                backgroundColor: `#${keyframe.getColor().getHexString()}`,
                border: "1px solid var(--bs-secondary)",
              }}
            />
          )}

          <div>
            <div
              className="small text-info fw-bold"
              onClick={() => handleJumpToTime(keyframe)}
              style={{ cursor: "pointer" }}
            >
              {keyframe.getTime().toFixed(1)}s
            </div>

            <div className="small text-muted">
              {getIdForKeyframe(keyframe) !== undefined
                ? "ID: " + getIdForKeyframe(keyframe)
                : "Keine ID"}{" "}
              •{" "}
              {keyframe instanceof ColorKeyFrame && (
                <>
                  [{keyframe.getColor().r.toFixed(2)},{" "}
                  {keyframe.getColor().g.toFixed(2)},{" "}
                  {keyframe.getColor().b.toFixed(2)}] • #
                  {keyframe.getColor().getHexString().toUpperCase()}
                </>
              )}
              {keyframe instanceof PositionKeyFrame && (
                <>
                  [{keyframe.getPos().x.toFixed(1)},{" "}
                  {keyframe.getPos().y.toFixed(1)},{" "}
                  {keyframe.getPos().z.toFixed(1)}]
                </>
              )}
            </div>
          </div>
        </div>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            handleRemoveKeyframe(keyframe);
          }}
          title="Löschen"
        >
          <i className="bi bi-trash" />
        </button>
      </Card.Body>
    </Card>
  );
}
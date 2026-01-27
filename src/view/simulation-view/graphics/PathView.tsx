
import React from "react";
import { Line } from "@react-three/drei";
import { PathFrame } from "../state/PathFrame";

import { pathConfig } from "../config";

type Props = {
  frame: PathFrame;
};

export const PathView: React.FC<Props> = ({ frame }) => {
  return (
    <>
      {Array.from(frame.pathPositions.entries()).map(([id, points]) => {
        if (points.length < 2) return null;

        const color = frame.pathColors.get(id) ?? "white";

        return (
          <Line
            key={id}
            points={points}
            color={color}
            lineWidth={pathConfig.lineWidth}
          />
        );
      })}
    </>
  );
};


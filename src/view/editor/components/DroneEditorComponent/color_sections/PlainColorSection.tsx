import { Color } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent } from "../SharedComponents";
import { AddKeyframeComponent } from "../SharedComponents";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function PlainColorSection({
  selectedDrones,
  controller,
}: {
  selectedDrones: number[];
  controller: IUndoableController;
}) {
  const { t } = useTranslation();
  const [color, setColor] = useState<Color>(new Color(0xffffff));
  const handleColorChange = (hexColor: string) => {
    setColor(new Color(hexColor));
  };

  const handleAddColorKeyframe = () => {
    controller.startBatching();
    selectedDrones.forEach((droneId) => {
      controller.addColorKeyFrameNow(droneId, color);
    });
    controller.endBatching();
  };

  return (
    <KeyframeEditorComponent title={t("editor.color.plain.title")}>
      <div>
        <label className="small">{t("editor.color.common.pickLedColor")}</label>
        <input
          id="drone-color-input"
          type="color"
          value={`#${color.getHexString()}`}
          onInput={(e) => handleColorChange((e.target as HTMLInputElement).value)}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{
            cursor: "pointer",
            height: "40px",
            width: "100%",
          }}
        />
      </div>

      <AddKeyframeComponent onClick={handleAddColorKeyframe} />
    </KeyframeEditorComponent>
  );
}
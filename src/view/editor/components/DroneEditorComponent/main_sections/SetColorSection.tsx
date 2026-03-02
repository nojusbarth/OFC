import { Color } from "three";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { KeyframeEditorComponent, AddKeyframeComponent } from "../SharedComponents";

// Dieser Abschnitt ist teilweise KI generiert

export function SetColorSection({
    color,
    setColor,
    selectedDrones,
    controller,
}: {
    color: Color;
    setColor: (color: Color) => void;
    selectedDrones: number[];
    controller: IUndoableController;
}) {

    const handleColorChange = (hexColor: string) => {
        setColor(new Color(hexColor));
    };

    const handleAddColorKeyframe = () => {
        selectedDrones.forEach((droneId) => {
            controller.addColorKeyFrameNow(droneId, color);
        });
    };

    return (
        <KeyframeEditorComponent title="Farbe Setzen">
            <div>
                <label className="small">LED-Farbe wählen</label>
                <input
                    type="color"
                    value={`#${color.getHexString()}`}
                    onChange={(e) =>
                        handleColorChange(e.target.value)
                    }
                    style={{
                        cursor: "pointer",
                        height: "40px",
                        width: "100%",
                    }}
                />
            </div>

            <AddKeyframeComponent
                onClick={handleAddColorKeyframe}
            />
        </KeyframeEditorComponent>
    );
}
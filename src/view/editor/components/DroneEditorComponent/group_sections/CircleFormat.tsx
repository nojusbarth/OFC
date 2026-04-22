import { useEffect, useState } from "react";
import { Vector3 } from "three";
import {
	KeyframeEditorComponent,
	PositionInputComponent,
} from "../SharedComponents";
import { IUndoableController } from "../../../../../controller/interface/IUndoableController";
import { useTranslation } from "react-i18next";

// Dieser Abschnitt ist teilweise KI generiert

/**
 * Die CircleFormatSection ordnet ausgewählte Drohnen auf einem Kreis
 * um einen konfigurierbaren Mittelpunkt an.
 * @param selectedDrones - IDs der aktuell ausgewählten Drohnen.
 * @param controller - Controller für das Schreiben von Positions-Keyframes.
 * @returns JSX-Komponente zur Konfiguration und Anwendung einer Kreis-Formation.
 */
export function CircleFormatSection({
	selectedDrones,
	controller,
}: {
	selectedDrones: number[];
	controller: IUndoableController;
}) {
	const { t } = useTranslation();
	const [center, setCenter] = useState<Vector3>(new Vector3(0, 0, 0));
	const [radius, setRadius] = useState<number>(5);

	const handleCenterChange = (axis: "x" | "y" | "z", value: number) => {
		const newCenter = center.clone();
		newCenter[axis] = value;
		setCenter(newCenter);
	};

	const getCirclePosition = (index: number, count: number) => {
		const angle = (2 * Math.PI * index) / count;
		return new Vector3(
			center.x + Math.cos(angle) * radius,
			center.y + Math.sin(angle) * radius,
			center.z,
		);
	};

	const updateGhostPreview = () => {
		const ghostController = controller.getGhostController();

		if (selectedDrones.length === 0) {
			ghostController.resetGhosts();
			return;
		}

		const count = selectedDrones.length;
		const positionMap = new Map<number, Vector3>();
		selectedDrones.forEach((droneId, index) => {
			positionMap.set(droneId, getCirclePosition(index, count));
		});

		ghostController.setGhostPositions(positionMap);
	};

	useEffect(() => {
		updateGhostPreview();
	}, [selectedDrones, center, radius]);

	useEffect(() => {
		return () => {
			controller.getGhostController().resetGhosts();
		};
	}, [controller]);

	const handleApply = () => {
		const count = selectedDrones.length;
		if (count === 0) return;

		controller.startBatching();
		selectedDrones.forEach((droneId, index) => {
			controller.addPositionKeyFrameNow(droneId, getCirclePosition(index, count));
		});
		controller.endBatching();
		controller.getGhostController().resetGhosts();
	};

	return (
		<KeyframeEditorComponent title={t("editor.group.circleFormation")}>
			<div className="mb-3">
				<div className="text-muted small mb-2">{t("editor.group.center")}</div>

				<div className="d-flex gap-2">
					<PositionInputComponent
						title={t("axes.x")}
						currentValue={center.x}
						onChangePosition={(v) => handleCenterChange("x", v)}
					/>
					<PositionInputComponent
						title={t("axes.y")}
						currentValue={center.y}
						onChangePosition={(v) => handleCenterChange("y", v)}
					/>
					<PositionInputComponent
						title={t("axes.z")}
						currentValue={center.z}
						onChangePosition={(v) => handleCenterChange("z", v)}
					/>
				</div>
			</div>

			<div className="mb-3">
				<div className="text-muted small mb-2">{t("editor.group.radius")}</div>

				<PositionInputComponent
					title={t("editor.group.radius")}
					currentValue={radius}
					onChangePosition={(v) => setRadius(Math.max(0, v))}
				/>
			</div>

			<button
				className="btn btn-primary w-100"
				onClick={handleApply}
				disabled={selectedDrones.length === 0}
			>
				{t("common.apply")}
			</button>
		</KeyframeEditorComponent>
	);
}

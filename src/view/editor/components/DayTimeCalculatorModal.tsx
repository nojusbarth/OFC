import React, { useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { DayTime } from "../../../repository/entity/DayTime";
import {
  calculateDayTimeFromSunPosition,
  convertToUTCWithLongitude,
} from "../utils/dayTimeCalculator";
import { useTranslation } from "react-i18next";

async function getCoords(cityName: string) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
        const data = await response.json();
        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), displayName: data[0].display_name };
        }
        return null;
    } catch (error) {
        console.error("Fehler beim Abrufen der Koordinaten", error);
        return null;
    }
}

/**
 * DayTimeCalculatorModal Komponente für die Berechnung der Tageszeit basierend auf geografischen Koordinaten
 * @param props
 * @param props.show - Ob das Modal angezeigt werden soll
 * @param props.onHide - Callback wenn das Modal geschlossen wird
 * @param props.onResult - Callback mit dem berechneten DayTime Resultat
 * @returns JSX-Element des Tageszeit-Rechner-Modals
 */
export function DayTimeCalculatorModal({ show, onHide, onResult }: {
    show: boolean;
    onHide: () => void;
    onResult: (dayTime: DayTime) => void;
}) {
    const { t } = useTranslation();
    // Form States
    const [cityInput, setCityInput] = useState("");
    const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
    const [timeStr, setTimeStr] = useState("12:00");

    // Logik States
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [localResult, setLocalResult] = useState<{ type: DayTime; text: string } | null>(null);

    const handleCalculate = async () => {
        setIsLoading(true);
        setErrorMsg(null);

        const city = cityInput ? cityInput : t("dayTimeCalculator.defaultCity");

        const coords = await getCoords(city);

        if (!coords) {
            setErrorMsg(t("dayTimeCalculator.locationNotFound", { city: cityInput }));
            setIsLoading(false);
            return;
        }

        const utcDate = convertToUTCWithLongitude(dateStr, timeStr, coords.lon);
        const result = calculateDayTimeFromSunPosition(
            utcDate,
            coords.lat,
            coords.lon,
        );

        setIsLoading(false);
        setLocalResult({
            type: result,
            text: coords.displayName as string
        })
        onResult(result);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("dayTimeCalculator.title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{t("dayTimeCalculator.cityLabel")}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t("dayTimeCalculator.defaultCity")}
                            value={cityInput}
                            onChange={(e) => setCityInput(e.target.value)}
                            isInvalid={!!errorMsg}
                            disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errorMsg}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>{t("dayTimeCalculator.dateLabel")}</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={dateStr}
                                    onChange={(e) => setDateStr(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>{t("dayTimeCalculator.timeLabel")}</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={timeStr}
                                    onChange={(e) => setTimeStr(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Form>
                {localResult && (
                    <p>{t("dayTimeCalculator.resultFor", {
                        location: localResult.text,
                        dayTime: t(mapDayTimeToTranslationKey(localResult.type)),
                    })}</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-primary btn-sm d-flex gap-2"
                    onClick={onHide}>
                    {t("common.cancel")}
                </button>
                <button
                    className="btn btn-primary btn-sm d-flex gap-2"
                    onClick={handleCalculate}
                    type="button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {" "} {t("dayTimeCalculator.searchingLocation")}
                        </>
                    ) : (
                        t("dayTimeCalculator.calculateAndApply")
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

function mapDayTimeToTranslationKey(dayTime: DayTime): string {
    switch (dayTime) {
        case DayTime.NOON:
            return "dayTime.values.noon";
        case DayTime.SUNSET:
            return "dayTime.values.sunset";
        case DayTime.NIGHT:
            return "dayTime.values.night";
    }
}
import React, {useState} from "react";
import {Form, Modal, Spinner} from "react-bootstrap";
import {DayTime} from "../../../repository/entity/DayTime";
import SunCalc from 'suncalc';

interface DayTimeCalculatorModalProps {
    show: boolean;
    onHide: () => void;
    onResult: (dayTime: DayTime) => void;
}

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

function mapDayTimeToDisplayName(dayTime: DayTime): string {
    switch (dayTime) {
        case DayTime.NOON: return "Mittag"
        case DayTime.SUNSET: return "Dämmerung"
        case DayTime.NIGHT: return "Nacht"
    }
}

export const DayTimeCalculatorModal: React.FC<DayTimeCalculatorModalProps> = ({ show, onHide, onResult }) => {
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

        const coords = await getCoords(cityInput);

        if (!coords) {
            setErrorMsg(`Der Ort "${cityInput}" wurde nicht gefunden.`);
            setIsLoading(false);
            return;
        }
        const utcDate = new Date(`${dateStr}T${timeStr}Z`);

        const offsetHours = coords.lon / 15;
        utcDate.setHours(utcDate.getHours() - offsetHours);

        const sunPos = SunCalc.getPosition(utcDate, coords.lat, coords.lon);
        const altitudeDeg = sunPos.altitude * (180 / Math.PI);

        let result: DayTime;

        if (altitudeDeg < -6) {
            result = DayTime.NIGHT;
        } else if (altitudeDeg >= -6 && altitudeDeg <= 6) {
            result = DayTime.SUNSET;
        } else {
            result = DayTime.NOON;
        }

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
                <Modal.Title>Tageszeit berechnen</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Stadt / Ort eingeben</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Karlsruhe"
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
                                <Form.Label>Datum</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={dateStr}
                                    onChange={(e) => setDateStr(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Uhrzeit</Form.Label>
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
                    <p>Ergebnis für {localResult.text}: {mapDayTimeToDisplayName(localResult.type)}</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-primary btn-sm d-flex gap-2"
                    onClick={onHide}>
                    Abbrechen
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
                            {' '} Suche Ort...
                        </>
                    ) : (
                        'Berechnen & Anwenden'
                    )}
                </button>
            </Modal.Footer>
        </Modal>
    );
};
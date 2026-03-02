import { test, expect, Page } from '@playwright/test';
import path from 'path';

const fixturesDir = path.resolve(__dirname, './fixtures');

// Hilfsfunktion zum Auswählen einer Datei auf der Startseite
async function selectStartpageFile(page: Page, fileName: string = 'test_show.json') {
    const filePath = path.join(fixturesDir, fileName);
    await page.locator('#fileInput').setInputFiles(filePath);
    await expect(page.locator('#fileInput')).toHaveValue(new RegExp(fileName.replace('.', '\\.')));
}

// Hilfsfunktion zum Hinzufügen eines Positions-Keyframes zu einer Drohne
async function addPositionKeyframeAtTime(
    page: Page,
    seconds: number,
    x: number,
    y: number,
    z: number,
) {
    await page.locator('#timeline-time-slider').fill(String(seconds * 100));
    await page.locator('#drone-position-x-input').fill(String(x));
    await page.locator('#drone-position-y-input').fill(String(y));
    await page.locator('#drone-position-z-input').fill(String(z));
    await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(0).click();
}

// Hilfsfunktion zum Hinzufügen eines Farb-Keyframes zu einer Drohne
async function addColorKeyframeAtTime(
    page: Page,
    seconds: number,
    hexColor: string,
) {
    await page.locator('#timeline-time-slider').fill(String(seconds * 100));
    await page.locator('#drone-color-input').fill(hexColor);
    await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(1).click();
}

test('test loading, editing and saving file', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Lade die default Testdatei
    await selectStartpageFile(page);
    await page.getByRole('button', { name: 'Projekt öffnen' }).first().click();

    await expect(page.getByTitle('Änderungen speichern')).toBeVisible();        

    // Gehe zu den Projekteinstellungen und ändere Einstellungen
    await page.getByTitle('Zu den Projekteinstellungen').click();

    await page.locator('#collision-distance-input').fill('0.5');
    await page.locator('#end-time-input').fill('30');

    await page.getByRole('button', { name: 'Speichern' }).click();
    await expect(page.locator('#timeline-time-slider')).toHaveAttribute('max', '3000');

    await page.getByTitle('Zu den Drohneneinstellungen').click();

    // Füge Keyframes für die erste Drohne hinzu
    await page.locator('.col.drone-manager').first().click();

    await addPositionKeyframeAtTime(page, 24, 2, 4, 6);
    await addPositionKeyframeAtTime(page, 27, 3, 6, 9);
    await addPositionKeyframeAtTime(page, 30, 4, 8, 12);

    await addColorKeyframeAtTime(page, 24, '#FF0000');
    await addColorKeyframeAtTime(page, 27, '#00FF00');
    await addColorKeyframeAtTime(page, 30, '#0000FF');


    // Überprüfe, ob die Keyframes korrekt angezeigt werden
    await expect(page.getByText('24.0s')).toHaveCount(2);
    await expect(page.getByText('27.0s')).toHaveCount(2);
    await expect(page.getByText('30.0s')).toHaveCount(2);

    await expect(page.getByText('ID: 0 • [2.0, 4.0, 6.0]')).toBeVisible();
    await expect(page.getByText('ID: 0 • [3.0, 6.0, 9.0]')).toBeVisible();
    await expect(page.getByText('ID: 0 • [4.0, 8.0, 12.0]')).toBeVisible();

    await expect(page.getByText('ID: 0 • [1.00, 0.00, 0.00] • #FF0000').first()).toBeVisible();
    await expect(page.getByText('ID: 0 • [0.00, 1.00, 0.00] • #00FF00').first()).toBeVisible();
    await expect(page.getByText('ID: 0 • [0.00, 0.00, 1.00] • #0000FF').first()).toBeVisible();

    // Speichere die Änderungen
    await page.getByTitle('Änderungen speichern').click();

    const storedProject = await page.evaluate(() => {
        const data = localStorage.getItem('last_project_config');
        return data ? JSON.parse(data) : null;
    });

    // Überprüfe, ob die Änderungen korrekt im localStorage gespeichert wurden
    expect(storedProject).not.toBeNull();
    expect(storedProject.settings.endTime).toBe(30);
    expect(storedProject.settings.collisionRadius).toBe(0.25);

    const savedTimes = storedProject.drones[0].waypoints.map((waypoint: { time: number }) => waypoint.time);
    expect(savedTimes).toEqual(expect.arrayContaining([24, 27, 30]));

    const savedColorTimes = storedProject.drones[0].colors.map((colorKeyframe: { time: number }) => colorKeyframe.time);
    expect(savedColorTimes).toEqual(expect.arrayContaining([24, 27, 30]));
});

test('test creating a show', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Überprüfe, ob die Startseite korrekt geladen wurde
    await expect(page.getByRole('heading', { name: 'Olympian Flight Control' })).toBeVisible();

    // Neues Projekt erstellen
    await page.getByRole('button', { name: 'Projekt erstellen' }).click();
    await expect(page.getByTitle('Änderungen speichern')).toBeVisible();

    // Projekteinstellungen setzen
    await page.getByTitle('Zu den Projekteinstellungen').click();
    await page.locator('#collision-distance-input').fill('0.8');
    await page.locator('#end-time-input').fill('45');
    await page.getByRole('button', { name: 'Speichern' }).click();
    await expect(page.locator('#timeline-time-slider')).toHaveAttribute('max', '4500');

    await page.getByTitle('Zu den Drohneneinstellungen').click();

    // 3 Drohnen erstellen
    await page.getByRole('button', { name: 'Hinzufügen' }).click();
    await page.getByRole('button', { name: 'Hinzufügen' }).click();
    await page.getByRole('button', { name: 'Hinzufügen' }).click();
    const droneCards = page.locator('.col.drone-manager');
    await expect(droneCards).toHaveCount(3);

    // Drohne 1
    await droneCards.nth(0).click();
    await addPositionKeyframeAtTime(page, 5, 1, 0, 1);
    await addPositionKeyframeAtTime(page, 15, 2, 1, 2);
    await addColorKeyframeAtTime(page, 5, '#FF0000');
    await addColorKeyframeAtTime(page, 15, '#00FF00');
    await droneCards.nth(0).click();

    // Drohne 2
    await droneCards.nth(1).click();
    await addPositionKeyframeAtTime(page, 10, 0, 2, 1);
    await addPositionKeyframeAtTime(page, 20, -1, 3, 2);
    await addColorKeyframeAtTime(page, 10, '#0000FF');
    await addColorKeyframeAtTime(page, 20, '#FFFF00');
    await droneCards.nth(1).click();

    // Drohne 3
    await droneCards.nth(2).click();
    await addPositionKeyframeAtTime(page, 12, 3, 3, 1);
    await addPositionKeyframeAtTime(page, 30, 4, 4, 2);
    await addColorKeyframeAtTime(page, 12, '#FF00FF');
    await addColorKeyframeAtTime(page, 30, '#00FFFF');

    // Speichern der Änderungen
    await page.getByTitle('Änderungen speichern').click();

    const storedProject = await page.evaluate(() => {
        const data = localStorage.getItem('last_project_config');
        return data ? JSON.parse(data) : null;
    });


    // Überprüfe, ob die Änderungen korrekt im localStorage gespeichert wurden
    expect(storedProject).not.toBeNull();
    expect(storedProject.settings.endTime).toBe(45);
    expect(storedProject.settings.collisionRadius).toBe(0.4);
    expect(storedProject.drones).toHaveLength(3);

    const drone0WaypointTimes = storedProject.drones[0].waypoints.map((waypoint: { time: number }) => waypoint.time);
    const drone0ColorTimes = storedProject.drones[0].colors.map((colorKeyframe: { time: number }) => colorKeyframe.time);
    expect(drone0WaypointTimes).toEqual(expect.arrayContaining([5, 15]));
    expect(drone0ColorTimes).toEqual(expect.arrayContaining([5, 15]));

    const drone1WaypointTimes = storedProject.drones[1].waypoints.map((waypoint: { time: number }) => waypoint.time);
    const drone1ColorTimes = storedProject.drones[1].colors.map((colorKeyframe: { time: number }) => colorKeyframe.time);
    expect(drone1WaypointTimes).toEqual(expect.arrayContaining([10, 20]));
    expect(drone1ColorTimes).toEqual(expect.arrayContaining([10, 20]));

    const drone2WaypointTimes = storedProject.drones[2].waypoints.map((waypoint: { time: number }) => waypoint.time);
    const drone2ColorTimes = storedProject.drones[2].colors.map((colorKeyframe: { time: number }) => colorKeyframe.time);
    expect(drone2WaypointTimes).toEqual(expect.arrayContaining([12, 30]));
    expect(drone2ColorTimes).toEqual(expect.arrayContaining([12, 30]));
});
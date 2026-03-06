import { test, expect } from '@playwright/test';
import { TestHelper } from './TestHelper';

test('test creating a show', async ({ page }) => {
    const helper = new TestHelper();

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

    // Drohne 1
    await helper.clickDroneCardById(page, 1);
    await helper.addPositionKeyframeAtTime(page, 5, 1, 0, 1);
    await helper.addPositionKeyframeAtTime(page, 15, 2, 1, 2);
    await helper.addColorKeyframeAtTime(page, 5, '#FF0000');
    await helper.addColorKeyframeAtTime(page, 15, '#00FF00');
    await helper.clickDroneCardById(page, 1);

    // Drohne 2
    await helper.clickDroneCardById(page, 2);
    await helper.addPositionKeyframeAtTime(page, 10, 0, 2, 1);
    await helper.addPositionKeyframeAtTime(page, 20, -1, 3, 2);
    await helper.addColorKeyframeAtTime(page, 10, '#0000FF');
    await helper.addColorKeyframeAtTime(page, 20, '#FFFF00');
    await helper.clickDroneCardById(page, 2);

    // Drohne 3
    await helper.clickDroneCardById(page, 3);
    await helper.addPositionKeyframeAtTime(page, 12, 3, 3, 1);
    await helper.addPositionKeyframeAtTime(page, 30, 4, 4, 2);
    await helper.addColorKeyframeAtTime(page, 12, '#FF00FF');
    await helper.addColorKeyframeAtTime(page, 30, '#00FFFF');

    // Speichern der Änderungen
    await page.getByTitle('Änderungen speichern').click();

    const storedProject = await helper.getStoredProject(page);

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

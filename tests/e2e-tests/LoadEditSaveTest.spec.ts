import { test, expect } from '@playwright/test';
import { TestHelper } from './TestHelper';

test('test loading, editing and saving file', async ({ page }) => {
    const helper = new TestHelper();

    await page.goto('http://localhost:3000/');

    // Lade die default Testdatei
    await helper.selectStartpageFile(page);
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
    await helper.clickDroneCardById(page, 0);

    await helper.addPositionKeyframeAtTime(page, 24, 2, 4, 6);
    await helper.addPositionKeyframeAtTime(page, 27, 3, 6, 9);
    await helper.addPositionKeyframeAtTime(page, 30, 4, 8, 12);

    await helper.addColorKeyframeAtTime(page, 24, '#FF0000');
    await helper.addColorKeyframeAtTime(page, 27, '#00FF00');
    await helper.addColorKeyframeAtTime(page, 30, '#0000FF');


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

    const storedProject = await helper.getStoredProject(page);

    // Überprüfe, ob die Änderungen korrekt im localStorage gespeichert wurden
    expect(storedProject).not.toBeNull();
    expect(storedProject.settings.endTime).toBe(30);
    expect(storedProject.settings.collisionRadius).toBe(0.25);

    const savedTimes = storedProject.drones[0].waypoints.map((waypoint: { time: number }) => waypoint.time);
    expect(savedTimes).toEqual(expect.arrayContaining([24, 27, 30]));

    const savedColorTimes = storedProject.drones[0].colors.map((colorKeyframe: { time: number }) => colorKeyframe.time);
    expect(savedColorTimes).toEqual(expect.arrayContaining([24, 27, 30]));
});

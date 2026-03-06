import { test, expect } from '@playwright/test';
import { TestHelper } from './TestHelper';


test('test big show', async ({ page }) => {
    const helper = new TestHelper();
    test.setTimeout(600000); // 10 Minuten
    await page.goto('http://localhost:3000/');

    // Neues Projekt erstellen
    await page.getByRole('button', { name: 'Projekt erstellen' }).click();
    await expect(page.getByTitle('Änderungen speichern')).toBeVisible();

    // Projekteinstellungen setzen
    await page.getByTitle('Zu den Projekteinstellungen').click();
    await page.locator('#collision-distance-input').fill('0.6');
    await page.locator('#end-time-input').fill('30');
    await page.getByRole('button', { name: 'Speichern' }).click();
    await expect(page.locator('#timeline-time-slider')).toHaveAttribute('max', '3000');

    await page.getByTitle('Zu den Drohneneinstellungen').click();

    // 174 Drohnen erstellen
    for (let i = 0; i < 174; i++) {
        await page.getByRole('button', { name: 'Hinzufügen' }).click();
    }

    // ========== Positions-Keyframes für alle Drohnen ==========
    // Drohne 1 (JSON-Index 0) - Positions-Keyframes
    await helper.clickDroneCardById(page, 1);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 5.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 5.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 5.5, 9, -2);
    await helper.clickDroneCardById(page, 1);

    // Drohne 2 (JSON-Index 1) - Positions-Keyframes
    await helper.clickDroneCardById(page, 2);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 6.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 6.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 6.5, 9, -2);
    await helper.clickDroneCardById(page, 2);

    // Drohne 3 (JSON-Index 2) - Positions-Keyframes
    await helper.clickDroneCardById(page, 3);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 5.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 5.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 5.5, 8, -2);
    await helper.clickDroneCardById(page, 3);

    // Drohne 4 (JSON-Index 3) - Positions-Keyframes
    await helper.clickDroneCardById(page, 4);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 6.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 6.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 6.5, 8, -2);
    await helper.clickDroneCardById(page, 4);

    // Drohne 5 (JSON-Index 4) - Positions-Keyframes
    await helper.clickDroneCardById(page, 5);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 1.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 1.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 1.5, 7, -2);
    await helper.clickDroneCardById(page, 5);

    // Drohne 6 (JSON-Index 5) - Positions-Keyframes
    await helper.clickDroneCardById(page, 6);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 2.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 2.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 2.5, 7, -2);
    await helper.clickDroneCardById(page, 6);

    // Drohne 7 (JSON-Index 6) - Positions-Keyframes
    await helper.clickDroneCardById(page, 7);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 3.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 3.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 3.5, 7, -2);
    await helper.clickDroneCardById(page, 7);

    // Drohne 8 (JSON-Index 7) - Positions-Keyframes
    await helper.clickDroneCardById(page, 8);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 4.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 4.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 4.5, 7, -2);
    await helper.clickDroneCardById(page, 8);

    // Drohne 9 (JSON-Index 8) - Positions-Keyframes
    await helper.clickDroneCardById(page, 9);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 5.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 5.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 5.5, 7, -2);
    await helper.clickDroneCardById(page, 9);

    // Drohne 10 (JSON-Index 9) - Positions-Keyframes
    await helper.clickDroneCardById(page, 10);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 6.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 6.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 6.5, 7, -2);
    await helper.clickDroneCardById(page, 10);

    // Drohne 11 (JSON-Index 10) - Positions-Keyframes
    await helper.clickDroneCardById(page, 11);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 1.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 1.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 1.5, 6, -2);
    await helper.clickDroneCardById(page, 11);

    // Drohne 12 (JSON-Index 11) - Positions-Keyframes
    await helper.clickDroneCardById(page, 12);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 2.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 2.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 2.5, 6, -2);
    await helper.clickDroneCardById(page, 12);

    // Drohne 13 (JSON-Index 12) - Positions-Keyframes
    await helper.clickDroneCardById(page, 13);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 3.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 3.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 3.5, 6, -2);
    await helper.clickDroneCardById(page, 13);

    // Drohne 14 (JSON-Index 13) - Positions-Keyframes
    await helper.clickDroneCardById(page, 14);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 4.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 4.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 4.5, 6, -2);
    await helper.clickDroneCardById(page, 14);

    // Drohne 15 (JSON-Index 14) - Positions-Keyframes
    await helper.clickDroneCardById(page, 15);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 5.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 5.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 5.5, 6, -2);
    await helper.clickDroneCardById(page, 15);

    // Drohne 16 (JSON-Index 15) - Positions-Keyframes
    await helper.clickDroneCardById(page, 16);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 6.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 6.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 6.5, 6, -2);
    await helper.clickDroneCardById(page, 16);

    // Drohne 17 (JSON-Index 16) - Positions-Keyframes
    await helper.clickDroneCardById(page, 17);
    await helper.addPositionKeyframeAtTime(page, 0, -0.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -0.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -0.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -0.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -0.5, 9, -2);
    await helper.clickDroneCardById(page, 17);

    // Drohne 18 (JSON-Index 17) - Positions-Keyframes
    await helper.clickDroneCardById(page, 18);
    await helper.addPositionKeyframeAtTime(page, 0, 0.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 0.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 0.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 0.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 0.5, 9, -2);
    await helper.clickDroneCardById(page, 18);

    // Drohne 19 (JSON-Index 18) - Positions-Keyframes
    await helper.clickDroneCardById(page, 19);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 1.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 1.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 1.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 1.5, 9, -2);
    await helper.clickDroneCardById(page, 19);

    // Drohne 20 (JSON-Index 19) - Positions-Keyframes
    await helper.clickDroneCardById(page, 20);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 2.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 2.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 2.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 2.5, 9, -2);
    await helper.clickDroneCardById(page, 20);

    // Drohne 21 (JSON-Index 20) - Positions-Keyframes
    await helper.clickDroneCardById(page, 21);
    await helper.addPositionKeyframeAtTime(page, 0, -0.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -0.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -0.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -0.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -0.5, 8, -2);
    await helper.clickDroneCardById(page, 21);

    // Drohne 22 (JSON-Index 21) - Positions-Keyframes
    await helper.clickDroneCardById(page, 22);
    await helper.addPositionKeyframeAtTime(page, 0, 0.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 0.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 0.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 0.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 0.5, 8, -2);
    await helper.clickDroneCardById(page, 22);

    // Drohne 23 (JSON-Index 22) - Positions-Keyframes
    await helper.clickDroneCardById(page, 23);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 1.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 1.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 1.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 1.5, 8, -2);
    await helper.clickDroneCardById(page, 23);

    // Drohne 24 (JSON-Index 23) - Positions-Keyframes
    await helper.clickDroneCardById(page, 24);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 2.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 2.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 2.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 2.5, 8, -2);
    await helper.clickDroneCardById(page, 24);

    // Drohne 25 (JSON-Index 24) - Positions-Keyframes
    await helper.clickDroneCardById(page, 25);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -2.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -2.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -2.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -2.5, 7, -2);
    await helper.clickDroneCardById(page, 25);

    // Drohne 26 (JSON-Index 25) - Positions-Keyframes
    await helper.clickDroneCardById(page, 26);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -1.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -1.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -1.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -1.5, 7, -2);
    await helper.clickDroneCardById(page, 26);

    // Drohne 27 (JSON-Index 26) - Positions-Keyframes
    await helper.clickDroneCardById(page, 27);
    await helper.addPositionKeyframeAtTime(page, 0, -0.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -0.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -0.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -0.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -0.5, 7, -2);
    await helper.clickDroneCardById(page, 27);

    // Drohne 28 (JSON-Index 27) - Positions-Keyframes
    await helper.clickDroneCardById(page, 28);
    await helper.addPositionKeyframeAtTime(page, 0, 0.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 0.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 0.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 0.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 0.5, 7, -2);
    await helper.clickDroneCardById(page, 28);

    // Drohne 29 (JSON-Index 28) - Positions-Keyframes
    await helper.clickDroneCardById(page, 29);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -2.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -2.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -2.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -2.5, 6, -2);
    await helper.clickDroneCardById(page, 29);

    // Drohne 30 (JSON-Index 29) - Positions-Keyframes
    await helper.clickDroneCardById(page, 30);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -1.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -1.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -1.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -1.5, 6, -2);
    await helper.clickDroneCardById(page, 30);

    // Drohne 31 (JSON-Index 30) - Positions-Keyframes
    await helper.clickDroneCardById(page, 31);
    await helper.addPositionKeyframeAtTime(page, 0, -0.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, -0.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -0.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -0.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -0.5, 6, -2);
    await helper.clickDroneCardById(page, 31);

    // Drohne 32 (JSON-Index 31) - Positions-Keyframes
    await helper.clickDroneCardById(page, 32);
    await helper.addPositionKeyframeAtTime(page, 0, 0.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 5, 0.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 10, 0.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 0.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 0.5, 6, -2);
    await helper.clickDroneCardById(page, 32);

    // Drohne 33 (JSON-Index 32) - Positions-Keyframes
    await helper.clickDroneCardById(page, 33);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 43, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 43, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 13, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 13, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 7.5, 9, 0);
    await helper.clickDroneCardById(page, 33);

    // Drohne 34 (JSON-Index 33) - Positions-Keyframes
    await helper.clickDroneCardById(page, 34);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 43, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 43, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 13, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 13, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 8.5, 9, 0);
    await helper.clickDroneCardById(page, 34);

    // Drohne 35 (JSON-Index 34) - Positions-Keyframes
    await helper.clickDroneCardById(page, 35);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 42, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 42, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 12, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 12, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 7.5, 8, 0);
    await helper.clickDroneCardById(page, 35);

    // Drohne 36 (JSON-Index 35) - Positions-Keyframes
    await helper.clickDroneCardById(page, 36);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 42, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 42, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 12, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 12, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 8.5, 8, 0);
    await helper.clickDroneCardById(page, 36);

    // Drohne 37 (JSON-Index 36) - Positions-Keyframes
    await helper.clickDroneCardById(page, 37);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 7.5, 7, 0);
    await helper.clickDroneCardById(page, 37);

    // Drohne 38 (JSON-Index 37) - Positions-Keyframes
    await helper.clickDroneCardById(page, 38);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 8.5, 7, 0);
    await helper.clickDroneCardById(page, 38);

    // Drohne 39 (JSON-Index 38) - Positions-Keyframes
    await helper.clickDroneCardById(page, 39);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 7.5, 6, 0);
    await helper.clickDroneCardById(page, 39);

    // Drohne 40 (JSON-Index 39) - Positions-Keyframes
    await helper.clickDroneCardById(page, 40);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 8.5, 6, 0);
    await helper.clickDroneCardById(page, 40);

    // Drohne 41 (JSON-Index 40) - Positions-Keyframes
    await helper.clickDroneCardById(page, 41);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 9, -2);
    await helper.clickDroneCardById(page, 41);

    // Drohne 42 (JSON-Index 41) - Positions-Keyframes
    await helper.clickDroneCardById(page, 42);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 9, -2);
    await helper.clickDroneCardById(page, 42);

    // Drohne 43 (JSON-Index 42) - Positions-Keyframes
    await helper.clickDroneCardById(page, 43);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 8, -2);
    await helper.clickDroneCardById(page, 43);

    // Drohne 44 (JSON-Index 43) - Positions-Keyframes
    await helper.clickDroneCardById(page, 44);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 8, -2);
    await helper.clickDroneCardById(page, 44);

    // Drohne 45 (JSON-Index 44) - Positions-Keyframes
    await helper.clickDroneCardById(page, 45);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 7, -2);
    await helper.clickDroneCardById(page, 45);

    // Drohne 46 (JSON-Index 45) - Positions-Keyframes
    await helper.clickDroneCardById(page, 46);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 7, -2);
    await helper.clickDroneCardById(page, 46);

    // Drohne 47 (JSON-Index 46) - Positions-Keyframes
    await helper.clickDroneCardById(page, 47);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 7.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 7.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 7.5, 6, -2);
    await helper.clickDroneCardById(page, 47);

    // Drohne 48 (JSON-Index 47) - Positions-Keyframes
    await helper.clickDroneCardById(page, 48);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 8.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 8.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 8.5, 6, -2);
    await helper.clickDroneCardById(page, 48);

    // Drohne 49 (JSON-Index 48) - Positions-Keyframes
    await helper.clickDroneCardById(page, 49);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -2.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -2.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -2.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, -2.5, 7, 0);
    await helper.clickDroneCardById(page, 49);

    // Drohne 50 (JSON-Index 49) - Positions-Keyframes
    await helper.clickDroneCardById(page, 50);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -1.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -1.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -1.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, -1.5, 7, 0);
    await helper.clickDroneCardById(page, 50);

    // Drohne 51 (JSON-Index 50) - Positions-Keyframes
    await helper.clickDroneCardById(page, 51);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -2.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -2.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -2.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, -2.5, 6, 0);
    await helper.clickDroneCardById(page, 51);

    // Drohne 52 (JSON-Index 51) - Positions-Keyframes
    await helper.clickDroneCardById(page, 52);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -1.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -1.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -1.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, -1.5, 6, 0);
    await helper.clickDroneCardById(page, 52);

    // Drohne 53 (JSON-Index 52) - Positions-Keyframes
    await helper.clickDroneCardById(page, 53);
    await helper.addPositionKeyframeAtTime(page, 0, -4.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -4.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -4.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -4.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -4.5, 9, -2);
    await helper.clickDroneCardById(page, 53);

    // Drohne 54 (JSON-Index 53) - Positions-Keyframes
    await helper.clickDroneCardById(page, 54);
    await helper.addPositionKeyframeAtTime(page, 0, -3.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -3.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -3.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -3.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -3.5, 9, -2);
    await helper.clickDroneCardById(page, 54);

    // Drohne 55 (JSON-Index 54) - Positions-Keyframes
    await helper.clickDroneCardById(page, 55);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -2.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -2.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -2.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -2.5, 9, -2);
    await helper.clickDroneCardById(page, 55);

    // Drohne 56 (JSON-Index 55) - Positions-Keyframes
    await helper.clickDroneCardById(page, 56);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -1.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -1.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -1.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -1.5, 9, -2);
    await helper.clickDroneCardById(page, 56);

    // Drohne 57 (JSON-Index 56) - Positions-Keyframes
    await helper.clickDroneCardById(page, 57);
    await helper.addPositionKeyframeAtTime(page, 0, -4.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -4.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -4.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -4.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -4.5, 8, -2);
    await helper.clickDroneCardById(page, 57);

    // Drohne 58 (JSON-Index 57) - Positions-Keyframes
    await helper.clickDroneCardById(page, 58);
    await helper.addPositionKeyframeAtTime(page, 0, -3.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -3.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -3.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -3.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -3.5, 8, -2);
    await helper.clickDroneCardById(page, 58);

    // Drohne 59 (JSON-Index 58) - Positions-Keyframes
    await helper.clickDroneCardById(page, 59);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -2.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -2.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -2.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -2.5, 8, -2);
    await helper.clickDroneCardById(page, 59);

    // Drohne 60 (JSON-Index 59) - Positions-Keyframes
    await helper.clickDroneCardById(page, 60);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -1.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -1.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -1.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -1.5, 8, -2);
    await helper.clickDroneCardById(page, 60);

    // Drohne 61 (JSON-Index 60) - Positions-Keyframes
    await helper.clickDroneCardById(page, 61);
    await helper.addPositionKeyframeAtTime(page, 0, -4.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -4.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -4.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -4.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -4.5, 7, -2);
    await helper.clickDroneCardById(page, 61);

    // Drohne 62 (JSON-Index 61) - Positions-Keyframes
    await helper.clickDroneCardById(page, 62);
    await helper.addPositionKeyframeAtTime(page, 0, -3.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -3.5, 37, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -3.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -3.5, 7, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -3.5, 7, -2);
    await helper.clickDroneCardById(page, 62);

    // Drohne 63 (JSON-Index 62) - Positions-Keyframes
    await helper.clickDroneCardById(page, 63);
    await helper.addPositionKeyframeAtTime(page, 0, -4.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -4.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -4.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -4.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -4.5, 6, -2);
    await helper.clickDroneCardById(page, 63);

    // Drohne 64 (JSON-Index 63) - Positions-Keyframes
    await helper.clickDroneCardById(page, 64);
    await helper.addPositionKeyframeAtTime(page, 0, -3.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 10, -3.5, 36, 0);
    await helper.addPositionKeyframeAtTime(page, 15, -3.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 25, -3.5, 6, 0);
    await helper.addPositionKeyframeAtTime(page, 26, -3.5, 6, -2);
    await helper.clickDroneCardById(page, 64);

    // Drohne 65 (JSON-Index 64) - Positions-Keyframes
    await helper.clickDroneCardById(page, 65);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 1.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 1.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 1.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 1.5, 7, 0);
    await helper.clickDroneCardById(page, 65);

    // Drohne 66 (JSON-Index 65) - Positions-Keyframes
    await helper.clickDroneCardById(page, 66);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 2.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 2.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 2.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 2.5, 7, 0);
    await helper.clickDroneCardById(page, 66);

    // Drohne 67 (JSON-Index 66) - Positions-Keyframes
    await helper.clickDroneCardById(page, 67);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 3.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 3.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 3.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 3.5, 7, 0);
    await helper.clickDroneCardById(page, 67);

    // Drohne 68 (JSON-Index 67) - Positions-Keyframes
    await helper.clickDroneCardById(page, 68);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 4.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 4.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 4.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 4.5, 7, 0);
    await helper.clickDroneCardById(page, 68);

    // Drohne 69 (JSON-Index 68) - Positions-Keyframes
    await helper.clickDroneCardById(page, 69);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 5.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 5.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 5.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 5.5, 7, 0);
    await helper.clickDroneCardById(page, 69);

    // Drohne 70 (JSON-Index 69) - Positions-Keyframes
    await helper.clickDroneCardById(page, 70);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 6.5, 41, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 6.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 6.5, 11, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 6.5, 7, 0);
    await helper.clickDroneCardById(page, 70);

    // Drohne 71 (JSON-Index 70) - Positions-Keyframes
    await helper.clickDroneCardById(page, 71);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 1.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 1.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 1.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 1.5, 6, 0);
    await helper.clickDroneCardById(page, 71);

    // Drohne 72 (JSON-Index 71) - Positions-Keyframes
    await helper.clickDroneCardById(page, 72);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 2.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 2.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 2.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 2.5, 6, 0);
    await helper.clickDroneCardById(page, 72);

    // Drohne 73 (JSON-Index 72) - Positions-Keyframes
    await helper.clickDroneCardById(page, 73);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 3.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 3.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 3.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 3.5, 6, 0);
    await helper.clickDroneCardById(page, 73);

    // Drohne 74 (JSON-Index 73) - Positions-Keyframes
    await helper.clickDroneCardById(page, 74);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 4.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 4.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 4.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 4.5, 6, 0);
    await helper.clickDroneCardById(page, 74);

    // Drohne 75 (JSON-Index 74) - Positions-Keyframes
    await helper.clickDroneCardById(page, 75);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 5.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 5.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 5.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 5.5, 6, 0);
    await helper.clickDroneCardById(page, 75);

    // Drohne 76 (JSON-Index 75) - Positions-Keyframes
    await helper.clickDroneCardById(page, 76);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 6.5, 40, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 6.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 6.5, 10, 0);
    await helper.addPositionKeyframeAtTime(page, 27, 6.5, 6, 0);
    await helper.clickDroneCardById(page, 76);

    // Drohne 77 (JSON-Index 76) - Positions-Keyframes
    await helper.clickDroneCardById(page, 77);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 3.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 3.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 3.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 3.5, 9, -2);
    await helper.clickDroneCardById(page, 77);

    // Drohne 78 (JSON-Index 77) - Positions-Keyframes
    await helper.clickDroneCardById(page, 78);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 4.5, 39, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 4.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 4.5, 9, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 4.5, 9, -2);
    await helper.clickDroneCardById(page, 78);

    // Drohne 79 (JSON-Index 78) - Positions-Keyframes
    await helper.clickDroneCardById(page, 79);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 3.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 3.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 3.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 3.5, 8, -2);
    await helper.clickDroneCardById(page, 79);

    // Drohne 80 (JSON-Index 79) - Positions-Keyframes
    await helper.clickDroneCardById(page, 80);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 15, 4.5, 38, 0);
    await helper.addPositionKeyframeAtTime(page, 20, 4.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 25, 4.5, 8, 0);
    await helper.addPositionKeyframeAtTime(page, 26, 4.5, 8, -2);
    await helper.clickDroneCardById(page, 80);

    // Drohne 81 (JSON-Index 80) - Positions-Keyframes
    await helper.clickDroneCardById(page, 81);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 44, 0);
    await helper.clickDroneCardById(page, 81);

    // Drohne 82 (JSON-Index 81) - Positions-Keyframes
    await helper.clickDroneCardById(page, 82);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 43, 0);
    await helper.clickDroneCardById(page, 82);

    // Drohne 83 (JSON-Index 82) - Positions-Keyframes
    await helper.clickDroneCardById(page, 83);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 42, 0);
    await helper.clickDroneCardById(page, 83);

    // Drohne 84 (JSON-Index 83) - Positions-Keyframes
    await helper.clickDroneCardById(page, 84);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 41, 0);
    await helper.clickDroneCardById(page, 84);

    // Drohne 85 (JSON-Index 84) - Positions-Keyframes
    await helper.clickDroneCardById(page, 85);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 40, 0);
    await helper.clickDroneCardById(page, 85);

    // Drohne 86 (JSON-Index 85) - Positions-Keyframes
    await helper.clickDroneCardById(page, 86);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 39, 0);
    await helper.clickDroneCardById(page, 86);

    // Drohne 87 (JSON-Index 86) - Positions-Keyframes
    await helper.clickDroneCardById(page, 87);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 38, 0);
    await helper.clickDroneCardById(page, 87);

    // Drohne 88 (JSON-Index 87) - Positions-Keyframes
    await helper.clickDroneCardById(page, 88);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 37, 0);
    await helper.clickDroneCardById(page, 88);

    // Drohne 89 (JSON-Index 88) - Positions-Keyframes
    await helper.clickDroneCardById(page, 89);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 36, 0);
    await helper.clickDroneCardById(page, 89);

    // Drohne 90 (JSON-Index 89) - Positions-Keyframes
    await helper.clickDroneCardById(page, 90);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 35, 0);
    await helper.clickDroneCardById(page, 90);

    // Drohne 91 (JSON-Index 90) - Positions-Keyframes
    await helper.clickDroneCardById(page, 91);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 34, 0);
    await helper.clickDroneCardById(page, 91);

    // Drohne 92 (JSON-Index 91) - Positions-Keyframes
    await helper.clickDroneCardById(page, 92);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 33, 0);
    await helper.clickDroneCardById(page, 92);

    // Drohne 93 (JSON-Index 92) - Positions-Keyframes
    await helper.clickDroneCardById(page, 93);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 32, 0);
    await helper.clickDroneCardById(page, 93);

    // Drohne 94 (JSON-Index 93) - Positions-Keyframes
    await helper.clickDroneCardById(page, 94);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 31, 0);
    await helper.clickDroneCardById(page, 94);

    // Drohne 95 (JSON-Index 94) - Positions-Keyframes
    await helper.clickDroneCardById(page, 95);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 30, 0);
    await helper.clickDroneCardById(page, 95);

    // Drohne 96 (JSON-Index 95) - Positions-Keyframes
    await helper.clickDroneCardById(page, 96);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 29, 0);
    await helper.clickDroneCardById(page, 96);

    // Drohne 97 (JSON-Index 96) - Positions-Keyframes
    await helper.clickDroneCardById(page, 97);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 28, 0);
    await helper.clickDroneCardById(page, 97);

    // Drohne 98 (JSON-Index 97) - Positions-Keyframes
    await helper.clickDroneCardById(page, 98);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 27, 0);
    await helper.clickDroneCardById(page, 98);

    // Drohne 99 (JSON-Index 98) - Positions-Keyframes
    await helper.clickDroneCardById(page, 99);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 26, 0);
    await helper.clickDroneCardById(page, 99);

    // Drohne 100 (JSON-Index 99) - Positions-Keyframes
    await helper.clickDroneCardById(page, 100);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 25, 0);
    await helper.clickDroneCardById(page, 100);

    // Drohne 101 (JSON-Index 100) - Positions-Keyframes
    await helper.clickDroneCardById(page, 101);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 24, 0);
    await helper.clickDroneCardById(page, 101);

    // Drohne 102 (JSON-Index 101) - Positions-Keyframes
    await helper.clickDroneCardById(page, 102);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 23, 0);
    await helper.clickDroneCardById(page, 102);

    // Drohne 103 (JSON-Index 102) - Positions-Keyframes
    await helper.clickDroneCardById(page, 103);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 22, 0);
    await helper.clickDroneCardById(page, 103);

    // Drohne 104 (JSON-Index 103) - Positions-Keyframes
    await helper.clickDroneCardById(page, 104);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 21, 0);
    await helper.clickDroneCardById(page, 104);

    // Drohne 105 (JSON-Index 104) - Positions-Keyframes
    await helper.clickDroneCardById(page, 105);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 20, 0);
    await helper.clickDroneCardById(page, 105);

    // Drohne 106 (JSON-Index 105) - Positions-Keyframes
    await helper.clickDroneCardById(page, 106);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 19, 0);
    await helper.clickDroneCardById(page, 106);

    // Drohne 107 (JSON-Index 106) - Positions-Keyframes
    await helper.clickDroneCardById(page, 107);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 18, 0);
    await helper.clickDroneCardById(page, 107);

    // Drohne 108 (JSON-Index 107) - Positions-Keyframes
    await helper.clickDroneCardById(page, 108);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 17, 0);
    await helper.clickDroneCardById(page, 108);

    // Drohne 109 (JSON-Index 108) - Positions-Keyframes
    await helper.clickDroneCardById(page, 109);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 16, 0);
    await helper.clickDroneCardById(page, 109);

    // Drohne 110 (JSON-Index 109) - Positions-Keyframes
    await helper.clickDroneCardById(page, 110);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 15, 0);
    await helper.clickDroneCardById(page, 110);

    // Drohne 111 (JSON-Index 110) - Positions-Keyframes
    await helper.clickDroneCardById(page, 111);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 14, 0);
    await helper.clickDroneCardById(page, 111);

    // Drohne 112 (JSON-Index 111) - Positions-Keyframes
    await helper.clickDroneCardById(page, 112);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 13, 0);
    await helper.clickDroneCardById(page, 112);

    // Drohne 113 (JSON-Index 112) - Positions-Keyframes
    await helper.clickDroneCardById(page, 113);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 12, 0);
    await helper.clickDroneCardById(page, 113);

    // Drohne 114 (JSON-Index 113) - Positions-Keyframes
    await helper.clickDroneCardById(page, 114);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 11, 0);
    await helper.clickDroneCardById(page, 114);

    // Drohne 115 (JSON-Index 114) - Positions-Keyframes
    await helper.clickDroneCardById(page, 115);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 10, 0);
    await helper.clickDroneCardById(page, 115);

    // Drohne 116 (JSON-Index 115) - Positions-Keyframes
    await helper.clickDroneCardById(page, 116);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 9, 0);
    await helper.clickDroneCardById(page, 116);

    // Drohne 117 (JSON-Index 116) - Positions-Keyframes
    await helper.clickDroneCardById(page, 117);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 8, 0);
    await helper.clickDroneCardById(page, 117);

    // Drohne 118 (JSON-Index 117) - Positions-Keyframes
    await helper.clickDroneCardById(page, 118);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 7, 0);
    await helper.clickDroneCardById(page, 118);

    // Drohne 119 (JSON-Index 118) - Positions-Keyframes
    await helper.clickDroneCardById(page, 119);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 6, 0);
    await helper.clickDroneCardById(page, 119);

    // Drohne 120 (JSON-Index 119) - Positions-Keyframes
    await helper.clickDroneCardById(page, 120);
    await helper.addPositionKeyframeAtTime(page, 0, -5.5, 5, 0);
    await helper.clickDroneCardById(page, 120);

    // Drohne 121 (JSON-Index 120) - Positions-Keyframes
    await helper.clickDroneCardById(page, 121);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 44, 0);
    await helper.clickDroneCardById(page, 121);

    // Drohne 122 (JSON-Index 121) - Positions-Keyframes
    await helper.clickDroneCardById(page, 122);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 43, 0);
    await helper.clickDroneCardById(page, 122);

    // Drohne 123 (JSON-Index 122) - Positions-Keyframes
    await helper.clickDroneCardById(page, 123);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 42, 0);
    await helper.clickDroneCardById(page, 123);

    // Drohne 124 (JSON-Index 123) - Positions-Keyframes
    await helper.clickDroneCardById(page, 124);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 41, 0);
    await helper.clickDroneCardById(page, 124);

    // Drohne 125 (JSON-Index 124) - Positions-Keyframes
    await helper.clickDroneCardById(page, 125);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 40, 0);
    await helper.clickDroneCardById(page, 125);

    // Drohne 126 (JSON-Index 125) - Positions-Keyframes
    await helper.clickDroneCardById(page, 126);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 39, 0);
    await helper.clickDroneCardById(page, 126);

    // Drohne 127 (JSON-Index 126) - Positions-Keyframes
    await helper.clickDroneCardById(page, 127);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 38, 0);
    await helper.clickDroneCardById(page, 127);

    // Drohne 128 (JSON-Index 127) - Positions-Keyframes
    await helper.clickDroneCardById(page, 128);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 37, 0);
    await helper.clickDroneCardById(page, 128);

    // Drohne 129 (JSON-Index 128) - Positions-Keyframes
    await helper.clickDroneCardById(page, 129);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 36, 0);
    await helper.clickDroneCardById(page, 129);

    // Drohne 130 (JSON-Index 129) - Positions-Keyframes
    await helper.clickDroneCardById(page, 130);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 35, 0);
    await helper.clickDroneCardById(page, 130);

    // Drohne 131 (JSON-Index 130) - Positions-Keyframes
    await helper.clickDroneCardById(page, 131);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 34, 0);
    await helper.clickDroneCardById(page, 131);

    // Drohne 132 (JSON-Index 131) - Positions-Keyframes
    await helper.clickDroneCardById(page, 132);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 33, 0);
    await helper.clickDroneCardById(page, 132);

    // Drohne 133 (JSON-Index 132) - Positions-Keyframes
    await helper.clickDroneCardById(page, 133);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 32, 0);
    await helper.clickDroneCardById(page, 133);

    // Drohne 134 (JSON-Index 133) - Positions-Keyframes
    await helper.clickDroneCardById(page, 134);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 31, 0);
    await helper.clickDroneCardById(page, 134);

    // Drohne 135 (JSON-Index 134) - Positions-Keyframes
    await helper.clickDroneCardById(page, 135);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 30, 0);
    await helper.clickDroneCardById(page, 135);

    // Drohne 136 (JSON-Index 135) - Positions-Keyframes
    await helper.clickDroneCardById(page, 136);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 29, 0);
    await helper.clickDroneCardById(page, 136);

    // Drohne 137 (JSON-Index 136) - Positions-Keyframes
    await helper.clickDroneCardById(page, 137);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 28, 0);
    await helper.clickDroneCardById(page, 137);

    // Drohne 138 (JSON-Index 137) - Positions-Keyframes
    await helper.clickDroneCardById(page, 138);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 27, 0);
    await helper.clickDroneCardById(page, 138);

    // Drohne 139 (JSON-Index 138) - Positions-Keyframes
    await helper.clickDroneCardById(page, 139);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 26, 0);
    await helper.clickDroneCardById(page, 139);

    // Drohne 140 (JSON-Index 139) - Positions-Keyframes
    await helper.clickDroneCardById(page, 140);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 25, 0);
    await helper.clickDroneCardById(page, 140);

    // Drohne 141 (JSON-Index 140) - Positions-Keyframes
    await helper.clickDroneCardById(page, 141);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 24, 0);
    await helper.clickDroneCardById(page, 141);

    // Drohne 142 (JSON-Index 141) - Positions-Keyframes
    await helper.clickDroneCardById(page, 142);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 23, 0);
    await helper.clickDroneCardById(page, 142);

    // Drohne 143 (JSON-Index 142) - Positions-Keyframes
    await helper.clickDroneCardById(page, 143);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 22, 0);
    await helper.clickDroneCardById(page, 143);

    // Drohne 144 (JSON-Index 143) - Positions-Keyframes
    await helper.clickDroneCardById(page, 144);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 21, 0);
    await helper.clickDroneCardById(page, 144);

    // Drohne 145 (JSON-Index 144) - Positions-Keyframes
    await helper.clickDroneCardById(page, 145);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 20, 0);
    await helper.clickDroneCardById(page, 145);

    // Drohne 146 (JSON-Index 145) - Positions-Keyframes
    await helper.clickDroneCardById(page, 146);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 19, 0);
    await helper.clickDroneCardById(page, 146);

    // Drohne 147 (JSON-Index 146) - Positions-Keyframes
    await helper.clickDroneCardById(page, 147);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 18, 0);
    await helper.clickDroneCardById(page, 147);

    // Drohne 148 (JSON-Index 147) - Positions-Keyframes
    await helper.clickDroneCardById(page, 148);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 17, 0);
    await helper.clickDroneCardById(page, 148);

    // Drohne 149 (JSON-Index 148) - Positions-Keyframes
    await helper.clickDroneCardById(page, 149);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 16, 0);
    await helper.clickDroneCardById(page, 149);

    // Drohne 150 (JSON-Index 149) - Positions-Keyframes
    await helper.clickDroneCardById(page, 150);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 15, 0);
    await helper.clickDroneCardById(page, 150);

    // Drohne 151 (JSON-Index 150) - Positions-Keyframes
    await helper.clickDroneCardById(page, 151);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 14, 0);
    await helper.clickDroneCardById(page, 151);

    // Drohne 152 (JSON-Index 151) - Positions-Keyframes
    await helper.clickDroneCardById(page, 152);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 13, 0);
    await helper.clickDroneCardById(page, 152);

    // Drohne 153 (JSON-Index 152) - Positions-Keyframes
    await helper.clickDroneCardById(page, 153);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 12, 0);
    await helper.clickDroneCardById(page, 153);

    // Drohne 154 (JSON-Index 153) - Positions-Keyframes
    await helper.clickDroneCardById(page, 154);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 11, 0);
    await helper.clickDroneCardById(page, 154);

    // Drohne 155 (JSON-Index 154) - Positions-Keyframes
    await helper.clickDroneCardById(page, 155);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 10, 0);
    await helper.clickDroneCardById(page, 155);

    // Drohne 156 (JSON-Index 155) - Positions-Keyframes
    await helper.clickDroneCardById(page, 156);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 9, 0);
    await helper.clickDroneCardById(page, 156);

    // Drohne 157 (JSON-Index 156) - Positions-Keyframes
    await helper.clickDroneCardById(page, 157);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 8, 0);
    await helper.clickDroneCardById(page, 157);

    // Drohne 158 (JSON-Index 157) - Positions-Keyframes
    await helper.clickDroneCardById(page, 158);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 7, 0);
    await helper.clickDroneCardById(page, 158);

    // Drohne 159 (JSON-Index 158) - Positions-Keyframes
    await helper.clickDroneCardById(page, 159);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 6, 0);
    await helper.clickDroneCardById(page, 159);

    // Drohne 160 (JSON-Index 159) - Positions-Keyframes
    await helper.clickDroneCardById(page, 160);
    await helper.addPositionKeyframeAtTime(page, 0, 9.5, 5, 0);
    await helper.clickDroneCardById(page, 160);

    // Drohne 161 (JSON-Index 160) - Positions-Keyframes
    await helper.clickDroneCardById(page, 161);
    await helper.addPositionKeyframeAtTime(page, 0, -4.5, 5, 0);
    await helper.clickDroneCardById(page, 161);

    // Drohne 162 (JSON-Index 161) - Positions-Keyframes
    await helper.clickDroneCardById(page, 162);
    await helper.addPositionKeyframeAtTime(page, 0, -3.5, 5, 0);
    await helper.clickDroneCardById(page, 162);

    // Drohne 163 (JSON-Index 162) - Positions-Keyframes
    await helper.clickDroneCardById(page, 163);
    await helper.addPositionKeyframeAtTime(page, 0, -2.5, 5, 0);
    await helper.clickDroneCardById(page, 163);

    // Drohne 164 (JSON-Index 163) - Positions-Keyframes
    await helper.clickDroneCardById(page, 164);
    await helper.addPositionKeyframeAtTime(page, 0, -1.5, 5, 0);
    await helper.clickDroneCardById(page, 164);

    // Drohne 165 (JSON-Index 164) - Positions-Keyframes
    await helper.clickDroneCardById(page, 165);
    await helper.addPositionKeyframeAtTime(page, 0, -0.5, 5, 0);
    await helper.clickDroneCardById(page, 165);

    // Drohne 166 (JSON-Index 165) - Positions-Keyframes
    await helper.clickDroneCardById(page, 166);
    await helper.addPositionKeyframeAtTime(page, 0, 0.5, 5, 0);
    await helper.clickDroneCardById(page, 166);

    // Drohne 167 (JSON-Index 166) - Positions-Keyframes
    await helper.clickDroneCardById(page, 167);
    await helper.addPositionKeyframeAtTime(page, 0, 1.5, 5, 0);
    await helper.clickDroneCardById(page, 167);

    // Drohne 168 (JSON-Index 167) - Positions-Keyframes
    await helper.clickDroneCardById(page, 168);
    await helper.addPositionKeyframeAtTime(page, 0, 2.5, 5, 0);
    await helper.clickDroneCardById(page, 168);

    // Drohne 169 (JSON-Index 168) - Positions-Keyframes
    await helper.clickDroneCardById(page, 169);
    await helper.addPositionKeyframeAtTime(page, 0, 3.5, 5, 0);
    await helper.clickDroneCardById(page, 169);

    // Drohne 170 (JSON-Index 169) - Positions-Keyframes
    await helper.clickDroneCardById(page, 170);
    await helper.addPositionKeyframeAtTime(page, 0, 4.5, 5, 0);
    await helper.clickDroneCardById(page, 170);

    // Drohne 171 (JSON-Index 170) - Positions-Keyframes
    await helper.clickDroneCardById(page, 171);
    await helper.addPositionKeyframeAtTime(page, 0, 5.5, 5, 0);
    await helper.clickDroneCardById(page, 171);

    // Drohne 172 (JSON-Index 171) - Positions-Keyframes
    await helper.clickDroneCardById(page, 172);
    await helper.addPositionKeyframeAtTime(page, 0, 6.5, 5, 0);
    await helper.clickDroneCardById(page, 172);

    // Drohne 173 (JSON-Index 172) - Positions-Keyframes
    await helper.clickDroneCardById(page, 173);
    await helper.addPositionKeyframeAtTime(page, 0, 7.5, 5, 0);
    await helper.clickDroneCardById(page, 173);

    // Drohne 174 (JSON-Index 173) - Positions-Keyframes
    await helper.clickDroneCardById(page, 174);
    await helper.addPositionKeyframeAtTime(page, 0, 8.5, 5, 0);
    await helper.clickDroneCardById(page, 174);

    // ========== Farb-Keyframes (gruppiert per addColorKeyframeForMultipleDronesAtTime) ==========
    // Gruppe: Drohnen [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 0, '#FF0000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 25, '#000000');

    // Gruppe: Drohnen [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 5, '#ff6600');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 25, '#000000');

    // Gruppe: Drohnen [33, 34, 35, 36, 37, 38, 39, 40]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [33, 34, 35, 36, 37, 38, 39, 40], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [33, 34, 35, 36, 37, 38, 39, 40], 20, '#01FF00');

    // Gruppe: Drohnen [41, 42, 43, 44, 45, 46, 47, 48]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [41, 42, 43, 44, 45, 46, 47, 48], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [41, 42, 43, 44, 45, 46, 47, 48], 20, '#01FF00');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [41, 42, 43, 44, 45, 46, 47, 48], 25, '#000000');

    // Gruppe: Drohnen [49, 50, 51, 52]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [49, 50, 51, 52], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [49, 50, 51, 52], 10, '#7900FF');

    // Gruppe: Drohnen [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], 10, '#7900FF');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], 25, '#000000');

    // Gruppe: Drohnen [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76], 15, '#00B8FF');

    // Gruppe: Drohnen [77, 78, 79, 80]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [77, 78, 79, 80], 0, '#000000');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [77, 78, 79, 80], 15, '#00B8FF');
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [77, 78, 79, 80], 25, '#000000');

    // Gruppe: Drohnen [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174]
    await helper.addColorKeyframeForMultipleDronesAtTime(page, [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174], 0, '#FFFFFF');

    // Änderungen speichern
    await page.getByTitle('Änderungen speichern').click();

    const storedProject = await helper.getStoredProject(page);

    // Grundlegende Validierung
    expect(storedProject).not.toBeNull();
    expect(storedProject.settings.endTime).toBe(30);
    expect(storedProject.settings.collisionRadius).toBe(0.3);
    expect(storedProject.drones).toHaveLength(174);

    // Validierung ausgewählter Drohnen (Stichproben aus allen Gruppen)
    const droneValidations = [
        { idx: 0, wpTimes: [0, 5, 25, 26], colTimes: [0, 25] },
        { idx: 16, wpTimes: [0, 5, 10, 25, 26], colTimes: [5, 25] },
        { idx: 32, wpTimes: [0, 20, 25, 26, 27], colTimes: [20] },
        { idx: 48, wpTimes: [0, 10, 15, 26, 27], colTimes: [10] },
        { idx: 52, wpTimes: [0, 10, 15, 25, 26], colTimes: [10, 25] },
        { idx: 64, wpTimes: [0, 15, 20, 26, 27], colTimes: [15] },
        { idx: 76, wpTimes: [0, 15, 20, 25, 26], colTimes: [15, 25] },
        { idx: 80, wpTimes: [0], colTimes: [0] },
    ];

    for (const { idx, wpTimes, colTimes } of droneValidations) {
        const drone = storedProject.drones[idx];
        const actualWpTimes = drone.waypoints.map((wp: { time: number }) => wp.time);
        const actualColTimes = drone.colors.map((c: { time: number }) => c.time);
        expect(actualWpTimes).toEqual(expect.arrayContaining(wpTimes));
        expect(actualColTimes).toEqual(expect.arrayContaining(colTimes));
    }


    // Animation am Ende auf 3x abspielen und prüfen, dass sie automatisch stoppt
    await page.getByTitle('Geschwindigkeit ändern').click();
    await page.getByTitle('Geschwindigkeit ändern').click();
    await page.getByTitle('Geschwindigkeit ändern').click();
    await expect(page.getByText('3x')).toBeVisible();

    await page.getByTitle('Animation starten \n(Leertaste)').click();
    await expect(page.getByTitle('Animation stoppen \n(Leertaste)')).toBeVisible();

    // Bei 30s Endzeit und 3x sollte die Animation nach ca. 10s automatisch stoppen.
    await expect(page.getByTitle('Animation starten \n(Leertaste)')).toBeVisible({ timeout: 20000 });
    await expect(page.getByTitle('Animation stoppen \n(Leertaste)')).toBeHidden();
});

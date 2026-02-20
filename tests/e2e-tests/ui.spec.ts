import { test, expect } from '@playwright/test';

test('general functionality test', async ({ page }) => {
    await page.goto('http://localhost:3000/');


  /* ---------- Überprüfe Startpage ---------- */ 
  await expect(page.getByRole('heading', { name: 'Olympian Flight Control' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Projekt erstellen' })).toBeVisible();

  await page.getByRole('button', { name: 'Projekt erstellen'}).click();


  /* ---------- Überprüfe Editor ---------- */ 
  // Timeline
  await expect(page.getByTitle('Animation starten')).toBeVisible();
  await expect(page.getByTitle('Geschwindigkeit ändern')).toBeVisible();
  await expect(page.getByText('1x')).toBeVisible();
  await expect(page.getByText('00:00 /')).toBeVisible();
  await expect(page.getByRole('slider', { name: 'Zeit ändern' })).toBeVisible();
  await expect(page.getByTitle('Aufnahme starten')).toBeVisible();

  // DroneManager
  await expect(page.getByRole('button', { name: 'Hinzufügen' })).toBeVisible();

  // DroneEditor
  await expect(page.getByTitle('Änderung rückgängig machen')).toBeVisible();
  await expect(page.getByTitle('Änderung wiederherstellen')).toBeVisible();

  // Canvas
  await expect(page.locator('canvas')).toBeVisible();

  //Toolbar
  await expect(page.getByTitle('Zurück zur Startseite')).toBeVisible();
  await expect(page.getByTitle('Änderungen speichern')).toBeVisible();
  await expect(page.getByTitle('Zu den Projekteinstellungen')).toBeVisible();

  // Settings
  await page.getByTitle('Zu den Projekteinstellungen').click();

  await expect(page.getByTitle('Zu den Drohneneinstellungen')).toBeVisible();
  await expect(page.getByText('Projekt')).toBeVisible();
  await expect(page.getByText('Tageszeit')).toBeVisible();
  await expect(page.getByText('Sicherheitsabstand')).toBeVisible();
  await expect(page.getByText('Endzeit')).toBeVisible();
  await expect(page.getByText('Export', { exact: true })).toBeVisible();
  await expect(page.getByText('Waypoint-Export')).toBeVisible();

  await page.getByTitle('Zu den Drohneneinstellungen').click();


  /* ---------- Überprüfe Drohnen hinzufügen ---------- */ 
  await page.getByRole('button', { name: 'Hinzufügen' }).click();
  await page.getByRole('button', { name: 'Hinzufügen' }).click();
  await page.getByRole('button', { name: 'Hinzufügen' }).click();
  await page.getByRole('button', { name: 'Hinzufügen' }).click();

  await expect(page.getByText('1', { exact: true })).toBeVisible();
  await expect(page.getByText('2', { exact: true })).toBeVisible();
  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await expect(page.getByText('4', { exact: true })).toBeVisible();

  await expect(page.locator('.rounded-circle').nth(0)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.rounded-circle').nth(1)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.rounded-circle').nth(2)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.rounded-circle').nth(3)).toHaveCSS('background-color', 'rgb(255, 255, 255)');


  /* ---------- Überprüfe Drohne auswählen ---------- */
  await page.locator('.col.drone-manager').filter({ hasText: /1/ }).click();

  await expect(page.getByText('1 Drohne ausgewählt')).toBeVisible();
  await expect(page.getByText('Position Setzen')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(0)).toBeVisible();

  await expect(page.getByText('Farbe Setzen')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(1)).toBeVisible();

  await expect(page.getByText('Drohnen Keyframes')).toBeVisible();
  await expect(page.getByText('Keine Keyframes vorhanden')).toBeVisible();


  /* ---------- Überprüfe Keyframes hinzufügen ---------- */
  await page.getByRole('spinbutton').nth(0).click();
  await page.getByRole('spinbutton').nth(0).fill('5');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('10');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('2');
  await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(0).click();

  await expect(page.getByText('Position Keyframes')).toBeVisible();
  await expect(page.getByText('Color Keyframes')).not.toBeVisible();
  await expect(page.getByText('0.0s').nth(0)).toBeVisible();
  await expect(page.getByText('ID: 1 • [5.0, 10.0, 2.0]')).toBeVisible();

  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('#FF00FF');
  await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(1).click();

  await expect(page.getByText('Position Keyframes')).toBeVisible();
  await expect(page.getByText('Color Keyframes')).toBeVisible();
  await expect(page.getByText('0.0s').nth(1)).toBeVisible();
  await expect(page.getByText('ID: 1 • [1.00, 0.00, 1.00] • #FF00FF')).toBeVisible();
  
  await expect(page.locator('.rounded-circle').nth(0)).toHaveCSS('background-color', 'rgb(255, 0, 255)');
  await expect(page.locator('.rounded-circle').nth(1)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.rounded-circle').nth(2)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.rounded-circle').nth(3)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});



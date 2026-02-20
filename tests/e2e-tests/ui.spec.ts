import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test('start page shows project actions', async ({ page }) => {
	await page.goto(baseURL);

	await expect(page.getByRole('heading', { name: 'Olympian Flight Control' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Projekt erstellen' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Projekt öffnen' })).toBeDisabled();
});

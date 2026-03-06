import { Page } from '@playwright/test';
import path from 'path';

/**
 * Helper class providing utility functions for E2E tests
 */
export class TestHelper {
    private readonly fixturesDir: string;

    constructor() {
        this.fixturesDir = path.resolve(__dirname, './fixtures');
    }

    /**
     * Selects a file from the startpage
     * @param page - The Playwright page object
     * @param fileName - The name of the file to select (default: 'test_show.json')
     */
    async selectStartpageFile(page: Page, fileName: string = 'test_show.json'): Promise<void> {
        const filePath = path.join(this.fixturesDir, fileName);
        await page.locator('#fileInput').setInputFiles(filePath);
    }

    /**
     * Adds a position keyframe to a drone at a specific time
     * @param page - The Playwright page object
     * @param seconds - The time in seconds
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param z - Z coordinate
     */
    async addPositionKeyframeAtTime(
        page: Page,
        seconds: number,
        x: number,
        y: number,
        z: number,
    ): Promise<void> {
        await page.locator('#timeline-time-slider').fill(String(seconds * 100));
        await page.locator('#drone-position-x-input').fill(String(x));
        await page.locator('#drone-position-y-input').fill(String(y));
        await page.locator('#drone-position-z-input').fill(String(z));
        await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(0).click();
    }

    /**
     * Adds a color keyframe to a drone at a specific time
     * @param page - The Playwright page object
     * @param seconds - The time in seconds
     * @param hexColor - The color in hex format (e.g., '#FF0000')
     */
    async addColorKeyframeAtTime(
        page: Page,
        seconds: number,
        hexColor: string,
    ): Promise<void> {
        await page.locator('#timeline-time-slider').fill(String(seconds * 100));
        await page.locator('#drone-color-input').fill(hexColor);
        await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(1).click();
    }

    /**
     * Clicks on a drone card by its ID
     * @param page - The Playwright page object
     * @param droneId - The ID of the drone
     */
    async clickDroneCardById(page: Page, droneId: number): Promise<void> {
        await page.locator(`#drone-manager-card-${droneId}`).click();
    }

    /**
     * Adds a color keyframe to multiple drones at a specific time
     * @param page - The Playwright page object
     * @param droneIds - Array of drone IDs
     * @param seconds - The time in seconds
     * @param hexColor - The color in hex format (e.g., '#FF0000')
     */
    async addColorKeyframeForMultipleDronesAtTime(
        page: Page,
        droneIds: number[],
        seconds: number,
        hexColor: string,
    ): Promise<void> {
        for (const droneId of droneIds) {
            await this.clickDroneCardById(page, droneId);
        }

        await page.locator('#timeline-time-slider').fill(String(seconds * 100));
        await page.locator('#drone-color-input').fill(hexColor);
        await page.getByRole('button', { name: 'Keyframe hinzufügen' }).nth(0).click();

        for (const droneId of droneIds) {
            await this.clickDroneCardById(page, droneId);
        }
    }

    /**
     * Retrieves the stored project from localStorage
     * @param page - The Playwright page object
     * @returns The stored project configuration or null
     */
    async getStoredProject(page: Page): Promise<any> {
        return await page.evaluate(() => {
            const data = localStorage.getItem('last_project_config');
            return data ? JSON.parse(data) : null;
        });
    }
}

import type { Page } from "playwright/test";
import { HorseRacingPage } from "./HorseRacingPage";

export class LandingPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://www.sportsbet.com.au/");
    }

    racingTab() {
        return this.page.locator('[data-automation-id="racing-tab-switch"]') 
    }

    racingTabSelected() {
        return this.page.locator('[data-automation-id="racing-tab-switch-selected"]') 
    }

    nextToJump() {
        return this.page.locator('[data-automation-id="scrollable-container-group-1-carousel-1-body-container"]')
    }

    async navigateToNextToJumpItem(index: number) {
        await this.page.locator('[data-automation-id^="group-1-carousel-1-body-container-cell-"]').locator(`nth=${index}`).click();
        // Can't check for network idle as page is constantly calling 'push' API
        // We only care about selecting the racecard outcome listings on this page so we can get away with waiting for the parent container to load
        await this.page.waitForSelector('[data-automation-id="racecard-frame"]');
        return new HorseRacingPage(this.page);
    }
}
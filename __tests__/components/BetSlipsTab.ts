import type { Page } from "playwright/test";

export class BetSlipsTab {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    betSlipSingles() {
        return this.page.locator('[data-automation-id^="betslip-single-"]');
    }

    betSlipSinglesTitles() {
        return this.betSlipSingles().locator('[data-automation-id="betslip-bet-title"]');
    }
}
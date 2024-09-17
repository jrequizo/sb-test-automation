import type { Page } from "playwright/test";
import { BetSlipsTab } from "../components/BetSlipsTab";

export class HorseRacingPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    racecardOutcome() {
        return this.page.locator('[data-automation-id="racecard-outcome-name"]');
    }

    racecardOutcomeLPrice() {
        return this.page.locator('[data-automation-id="racecard-outcome-0-L-price"]');
    }

    headerBetCount() {
        return this.page.locator('[data-automation-id="header-bet-count"]');
    }

    async openBetSlipTab() {
        await this.page.locator("//span", { hasText: "Bet Slip" }).getByText("Bet Slip", { exact: true }).click();
        // Wait until there are no more network requests
        await this.page.waitForSelector('[data-automation-id="layout-right-panel"]');
        return new BetSlipsTab(this.page);
    }

    closeBetSlipTab() {
        return this.page.locator('[data-automation-id="close-isolated-icon"]');
    }

    layoutRightPanel() {
        return this.page.locator('[data-automation-id="layout-right-panel"]');
    }
}

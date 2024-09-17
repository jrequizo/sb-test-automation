import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";

const BET_SLIP_ITEMS = 2;

test("automation journey", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();

    // Check to see if the racing tab is selected
    const isRacingTabSelected = await landingPage.racingTabSelected().isVisible();
    if (!isRacingTabSelected) {
        await landingPage.racingTab().click();

        // Wait until there are no more network requests
        await page.waitForLoadState("networkidle");
    }

    // Select first Next To Jump slip and wait for page to load
    const horseRacingPage = await landingPage.navigateToNextToJumpItem(0);
    let betItems = await horseRacingPage.racecardOutcomeLPrice().all();
    let racecardOutcome = await horseRacingPage.racecardOutcome().all();

    const betNames = [];

    // Select the first two Bet items
    for (let i = 0; i < BET_SLIP_ITEMS; i++) {
        // Add the name to confirm it's in the bet slips later
        const name = await racecardOutcome[i].locator("//span").first().textContent();
        const number = await racecardOutcome[i].locator("//span").last().textContent();
        betNames.push(`${name}${number}`);

        await betItems[i].click();

        // Close the Tab if it pops up
        const isRightPanelVisible = await horseRacingPage.layoutRightPanel().isVisible();
        if (isRightPanelVisible) {
            await horseRacingPage.closeBetSlipTab().click();
            // Wait for all animations to complete
            // We'll wait for the same frame as in LandingPage's navigateToNextToJumpItem
            await page.waitForSelector('[data-automation-id="racecard-frame"]');

            // We have to re-retrieve all the betItem selectables as the previous selections have left the DOM tree
            // due to the rightPanel entering/leaving causing the tree to re-render
            betItems = await horseRacingPage.racecardOutcomeLPrice().all();
            racecardOutcome = await horseRacingPage.racecardOutcome().all();
        }
    }

    // await page.pause();
    // Confirm the right number of bets were selected
    // For some reason, two elements with this property are found, select the first (assumed newest) one
    expect(await horseRacingPage.headerBetCount().first().textContent()).toBe(BET_SLIP_ITEMS.toString());

    // Open the bet slip tab
    const betSlipTab = await horseRacingPage.openBetSlipTab();

    // Confirm the right bets were selected
    // We're assuming the bet slips are populated in the same order as the bets were selected
    const betSlips = await betSlipTab.betSlipSinglesTitles().all();
    
    for (let i = 0; i < betNames.length; i++) {
      // Brackets have a weird unicode value and aren't equivalent to each other...
      let a = (await betSlips[i].textContent())!
      a = a.substring(0, a.length - 4);

      let b = betNames[i]
      b = b.substring(0, b.length - 4)

      expect(a).toBe(b);
    }
});

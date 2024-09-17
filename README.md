# Sportsbet Automation

## Setup

1. Run `pnpm install` to install dependencies.
2. Run `npx playwright install@latest` to install Playwright.

**To run tests**
- Run `pnpm test:e2e` to run the Playwright end-to-end tests.

## Assumptions

1. User is not logged in.
2. Browser height is 1080px and width is 420px.
3. Using Node version `v.21.5.0` and latest browser drivers installed from Playwright.

## Problems Encountered
1. Some query selectors resulted in duplicate elements when the assumption would be that only one would exist. This may be due to animations firing and the original elements removal being delayed until animations have finished. We assume that the first element is the newest element and is the relevant element used for testing.
2. Awaiting for `networkidle` events were infeasible in some scenarios due to the page using constant POST requests to refresh data on the page. In such scenarios, I used alternate methods to wait for all elements to be loaded and assumed that such awaits would be sufficient.


## Areas for Improvement
- Having some sort of structure on what elements need to be retrievable and tested would make writing the Page-Object model easier as we can flesh out each page's elements and methods, allowing for future tests to use such methods.
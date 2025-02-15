// @ts-check
import { test, expect } from "@playwright/test";

test("expand dropdown by clicking button", async ({ page }) => {
  await page.goto("/src/elements/combo-box.html#template-artists");
  await page.locator("oui-combo-box").click();
  await expect(page.getByText("Portishead")).toBeVisible();
  await page.getByText("Portishead").click();
  await expect(page.getByText("2 Selected")).toBeVisible();
  await page.getByText("2 Selected").click();
  await page.getByText("2 Selected").click();
  await expect(page.getByPlaceholder("Search")).toBeFocused();
  await page.getByPlaceholder("Search").fill("bj");
  await expect(page.getByText("Björk")).toBeVisible();
  await expect(page.getByText("Radiohead")).toBeHidden();
});

test("keyboard access", async ({ page }) => {
  await page.goto("/src/elements/combo-box.html#template-authors");
  await page.getByPlaceholder("Search").focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press(" ");
  await expect(page.getByText("3 Selected")).toBeVisible();
  await page.keyboard.press(" ");
  await expect(page.getByText("Authors (All)")).toBeVisible();
  await page.getByLabel("All").click();
  await page.getByPlaceholder("Search").focus();
  await page.keyboard.type("cor");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press(" ");
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(page.locator("[title='Cormac McCarthy']")).toBeVisible();
});

test("performance of slotted queries", async ({ page }) => {
  await page.goto("/src/elements/combo-box.html#template-perf");
  const startTime = await page.evaluate(() => Date.now());
  await page.locator("oui-combo-box").click();
  await expect(page.getByText("Item 1", { exact: true })).toBeVisible();
  const endTime = await page.evaluate(() => Date.now());
  expect(endTime - startTime).toBeLessThan(10_000);
});

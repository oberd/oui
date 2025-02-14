// @ts-check
import { test, expect } from "@playwright/test";

test("expand dropdown by clicking button", async ({ page }) => {
  await page.goto("/src/elements/combo-box.html");
  await page
    .getByTestId("1")
    .getByRole("button")
    .getByText("Miles Davis", { exact: false })
    .click();
  await expect(page.getByText("Radiohead")).toBeVisible();
  await page.getByText("Radiohead").click();
  await expect(page.getByTestId("1").getByText("2 Selected")).toBeVisible();
  await page.getByTestId("1").getByText("2 Selected").click();
  await page.getByTestId("1").getByText("2 Selected").click();
  await expect(page.getByTestId("1").getByPlaceholder("Search")).toBeFocused();
  await page.getByTestId("1").getByPlaceholder("Search").fill("bj");
  await expect(page.getByText("Björk")).toBeVisible();
  await expect(page.getByText("Radiohead")).toBeHidden();
});

test("keyboard access", async ({ page }) => {
  await page.goto("/src/elements/combo-box.html");
  await page.getByTestId("2").getByPlaceholder("Search").focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press(" ");
  await expect(page.getByTestId("2").getByText("3 Selected")).toBeVisible();
  await page.keyboard.press(" ");
  await expect(page.getByTestId("2").getByText("Authors (All)")).toBeVisible();
  await page.getByTestId("2").getByLabel("All").click();
  await page.getByTestId("2").getByPlaceholder("Search").focus();
  await page.keyboard.type("cor");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press(" ");
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(
    page.locator(
      "[data-testid='2'] [aria-expanded='false'][title='Cormac McCarthy']",
    ),
  ).toBeVisible();
});

// @ts-check
import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:5173";

test("expand dropdown by clicking button", async ({ page }) => {
  await page.goto(baseUrl + "/src/elements/combo-box.html");
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

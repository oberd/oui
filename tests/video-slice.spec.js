// @ts-check
import { test, expect } from "@playwright/test";
import path from "node:path";

const sampleFilesDir = path.join(
  path.dirname(__dirname),
  "video-processing",
  "sample-files",
);
const sample1sMP4 = path.join(sampleFilesDir, "sample_1s.mp4");

test("slice video", async ({ page }) => {
  await page.goto("/src/elements/video-slice.html");
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText("Upload").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(sample1sMP4);
  await expect(page.getByText("video metadata analyzed")).toBeVisible();
});

import { test, expect } from "@playwright/test";

test("Can download image", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Heading should be visible
  await expect(page.getByText(/nick's content creator/i)).toBeVisible();

  // Find and click the first image
  const firstImage = page.getByRole("figure").first();
  await expect(firstImage).toBeVisible();
  await firstImage.click();

  // Verify the image editor modal opens
  await expect(page.getByText(/image editor/i)).toBeVisible();

  // Verify a download works
  const downloadButton = page.getByRole("button", { name: /Download Image/i });
  await expect(downloadButton).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await downloadButton.click();
  const download = await downloadPromise;
  expect(download).toBeTruthy();
});

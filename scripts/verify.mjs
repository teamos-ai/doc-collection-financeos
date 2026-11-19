import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
mkdirSync("evidence", { recursive: true });
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
  headless: true,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(process.env.BASE_URL || "http://127.0.0.1:5319/");
  await page
    .getByRole("heading", { name: "One checklist. The whole journey." })
    .waitFor();
  await page
    .getByRole("button", { name: "Whole journey", exact: true })
    .click();
  assert.equal(await page.locator(".react-flow__node-step").count(), 54);
  const original = await page
    .locator(".react-flow__viewport")
    .getAttribute("style");
  await page
    .getByRole("group", { name: "overview.DC-03: Client uploads", exact: true })
    .press("Enter");
  await page
    .getByRole("complementary", { name: "Builder inspector" })
    .waitFor();
  await page.getByRole("checkbox", { name: "Show tags", exact: true }).check();
  assert.equal(
    await page.locator(".react-flow__viewport").getAttribute("style"),
    original,
  );
  await page.getByRole("button", { name: "Full screen", exact: true }).click();
  assert.equal(
    await page.locator(".react-flow__viewport").getAttribute("style"),
    original,
  );
  await page
    .getByRole("button", { name: "Focus this logic on canvas" })
    .click();
  await page.getByRole("button", { name: "Close inspector" }).click();
  await page.screenshot({ path: "evidence/unified-fullscreen-auto.png" });
  await page
    .getByRole("button", { name: "Upload example", exact: true })
    .click();
  const result = page.locator(".dc-projection");
  await page
    .getByRole("combobox", { name: "Outstanding document" })
    .selectOption("card-b");
  assert.match(
    await result.innerText(),
    /KEEP \/ ADD fos-doc-needed-credit-card-statements/,
  );
  await page.getByRole("button", { name: "Attach a sample PDF" }).click();
  await page.getByRole("button", { name: "Simulate failed save" }).click();
  assert.match(await page.getByRole("status").innerText(), /Save failed/);
  await page
    .getByRole("checkbox", { name: "This item is ready for broker review" })
    .uncheck();
  await page.getByRole("button", { name: "Save sample upload" }).click();
  assert.equal(
    await page
      .getByRole("combobox", { name: "Outstanding document" })
      .locator("option")
      .count(),
    2,
  );
  await page
    .getByRole("checkbox", { name: "This item is ready for broker review" })
    .check();
  await page.getByRole("button", { name: "Attach a sample PDF" }).click();
  await page.getByRole("button", { name: "Save sample upload" }).click();
  assert.match(
    await result.innerText(),
    /KEEP \/ ADD fos-doc-needed-credit-card-statements/,
  );
  await page.getByRole("button", { name: "Attach a sample PDF" }).click();
  await page.getByRole("button", { name: "Save sample upload" }).click();
  assert.match(
    await result.innerText(),
    /REMOVE fos-doc-needed-credit-card-statements/,
  );
  await page
    .getByRole("checkbox", { name: "Another loan still needs card statements" })
    .check();
  assert.match(
    await result.innerText(),
    /KEEP \/ ADD fos-doc-needed-credit-card-statements/,
  );
  await page
    .getByRole("checkbox", { name: "Another loan still needs card statements" })
    .uncheck();
  await page.getByRole("button", { name: "Replace A", exact: true }).click();
  assert.match(
    await result.innerText(),
    /KEEP \/ ADD fos-doc-needed-credit-card-statements/,
  );
  await page
    .getByRole("button", { name: "Broker intake", exact: true })
    .click();
  const intake = page.locator(".dc-intake");
  await intake
    .getByLabel("Applicant email", { exact: true })
    .fill("sam@example.test");
  assert.match(
    await intake
      .locator("tr")
      .filter({ hasText: "Applicant A · Card A" })
      .innerText(),
    /6 continuous months/,
  );
  assert.match(
    await intake
      .locator("tr")
      .filter({ hasText: "Applicant A · Card B" })
      .innerText(),
    /3 continuous months/,
  );
  await intake.getByLabel("Match salary deposits to payslips").check();
  await intake.getByText("Salary bank statements", { exact: true }).waitFor();
  await intake.getByRole("button", { name: /Confirm preview/ }).click();
  await intake
    .getByRole("heading", { name: "Preview confirmed", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Close resource" }).press("Escape");
  await page
    .getByRole("button", { name: "Broker intake", exact: true })
    .click();
  assert.equal(
    await intake.getByLabel("Applicant email", { exact: true }).inputValue(),
    "sam@example.test",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
  await page.screenshot({ path: "evidence/unified-mobile-auto.png" });
  await page.getByRole("button", { name: "Close resource" }).press("Escape");
  await page.getByRole("button", { name: "Exit full screen" }).press("Escape");
  await page
    .getByRole("button", { name: "Full screen", exact: true })
    .waitFor();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(
    pathToFileURL(resolve("document-collection-board.html")).href,
  );
  await page
    .getByRole("heading", { name: "One checklist. The whole journey." })
    .waitFor();
  assert.equal(await page.locator(".react-flow__node-step").count(), 54);
  await page
    .getByRole("button", { name: "Document catalogue", exact: true })
    .click();
  await page.getByLabel("Find a document or alias").fill("NOA");
  await page.getByText("Notice of Assessment", { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  console.log(
    "Browser suite passed: persistent canvas, keyboard, full screen, upload/tag lifecycle, intake, mobile and portable HTML.",
  );
} finally {
  await browser.close();
}

// Genera la versión UX/UI (IA conversacional + DS + frontend) del CV
// Uso: node scripts/cv/build-uxui.js  (requiere playwright)
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "cv-uxui.html"));
  await page.pdf({
    path: path.join(__dirname, "../../public/files/charly-gourves-cv-ux-ui.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
})();

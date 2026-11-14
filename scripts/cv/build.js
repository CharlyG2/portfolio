// Genera public/files/charly-gourves-cv.pdf desde scripts/cv/cv.html
// Uso: node scripts/cv/build.js  (requiere playwright)
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "cv.html"));
  await page.pdf({
    path: path.join(__dirname, "../../public/files/charly-gourves-cv.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
})();

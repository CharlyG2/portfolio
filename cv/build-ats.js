// Genera public/files/charly-gourves-cv-ats.pdf: CV de una columna y texto
// simple, para que los portales de empleo (ATS) lo lean bien.
// Uso: node cv/build-ats.js
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "cv-ats.html"));
  await page.pdf({
    path: path.join(__dirname, "..", "public", "files", "charly-gourves-cv-ats.pdf"),
    format: "A4",
    preferCSSPageSize: true,
  });
  await browser.close();
})();

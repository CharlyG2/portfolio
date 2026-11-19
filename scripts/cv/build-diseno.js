// Genera public/files/charly-gourves-cv-diseno.pdf (CV con diseño: foto, QR y columna lateral)
// Uso: node scripts/cv/build-diseno.js  (requiere playwright)
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "cv-diseno.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(__dirname, "../../public/files/charly-gourves-cv-diseno.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
})();

// Genera public/files/charly-gourves-cv.pdf desde scripts/cv/cv.html
// Uso: node scripts/cv/build.js [archivo.html]  (por defecto cv-uxui.html, la versión publicada; cv.html es la versión AI Product Designer)
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, process.argv[2] || "cv-uxui.html"));
  await page.pdf({
    path: path.join(__dirname, "../../public/files/charly-gourves-cv.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
})();

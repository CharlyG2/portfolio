const BASE = "https://charly-gourves.vercel.app";
const PATHS = [
  "/",
  "/express",
  "/casos/design-system",
  "/casos/landing-viajes",
  "/casos/funnel-csi",
  "/casos/beliv",
  "/casos/chatbot",
  "/casos/este-portafolio",
];

export default function sitemap() {
  return PATHS.map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));
}

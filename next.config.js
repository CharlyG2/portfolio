/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Link corto para compartir la versión rápida (sin 3D).
  async redirects() {
    return [{ source: "/rapido", destination: "/express", permanent: false }];
  },
};

module.exports = nextConfig;

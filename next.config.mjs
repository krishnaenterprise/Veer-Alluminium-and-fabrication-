/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // All imagery is self-hosted under /public/images (SVG facades) — no remote
  // image hosts required, which keeps the site fast and free of broken images.
};

export default nextConfig;

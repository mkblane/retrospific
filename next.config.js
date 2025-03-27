/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/retrospific',
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  // This is needed for GitHub Pages
  assetPrefix: '/retrospific/',
  // Disable server-side features since we're deploying statically
  trailingSlash: true,
  // Disable unnecessary features for static export
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig 
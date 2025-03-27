/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/retrospific',
  assetPrefix: '/retrospific/',
  images: {
    unoptimized: true,
  },
  // Disable server-side features since we're deploying statically
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  // Indicate the root path for GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: '/retrospific',
  }
}

module.exports = nextConfig 
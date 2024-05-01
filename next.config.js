/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
}

module.exports = nextConfig

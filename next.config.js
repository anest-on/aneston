/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'aneston-signatures.s3.us-east-2.amazonaws.com',
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
}

module.exports = nextConfig

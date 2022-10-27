/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAINNET_PRIMARY: process.env.MAINNET_PRIMARY,
    MAINNET_SECONDARY: process.env.MAINNET_SECONDARY,
    MAINNET_PRIMARY_BETA: process.env.MAINNET_PRIMARY_BETA,
    BASE_CLUSTER: process.env.BASE_CLUSTER,
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || 'https://mint.cardinal.so',
  },
}

module.exports = nextConfig

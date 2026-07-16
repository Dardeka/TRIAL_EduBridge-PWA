/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@vercel/blob', 'undici'],
};

module.exports = nextConfig;

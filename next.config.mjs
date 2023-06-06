/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },

  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;

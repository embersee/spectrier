/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
    // typedRoutes: true,
  },

  images: {
    domains: ["images.unsplash.com", "uploadthing.com"],
  },
};

export default nextConfig;

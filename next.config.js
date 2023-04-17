/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/signin",
      },
    ];
  },
};

module.exports = nextConfig;

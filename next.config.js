/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com", "localhost"],
  },
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

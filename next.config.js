/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "example.com",
      "www.gravatar.com",
      "localhost",
      "mentorcycle-dev.s3.us-east-2.amazonaws.com",
    ],
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

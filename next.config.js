/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: process.env.BASE_PATH || undefined,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/latest",
        permanent: true,
      }
    ];
  },
  async rewrites() {
    if (process.env.REMOTE_URL) {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.REMOTE_URL}/api/:path*/`,
        },
        {
          source: "/oauth/:path*",
          destination: `${process.env.REMOTE_URL}/oauth/:path*/`,
        },
      ];
    } else return [];
  },
};

module.exports = nextConfig;

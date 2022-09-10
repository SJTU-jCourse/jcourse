/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: process.env.BASE_PATH || undefined,
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/latest",
        permanent: true,
      },
      {
        source: "/review/:id",
        destination: "/review?review_id=:id",
        permanent: true,
      },
      {
        source: "/course/:id/review",
        destination: "/review?course_id=:id",
        permanent: true,
      },
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

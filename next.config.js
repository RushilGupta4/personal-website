/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;

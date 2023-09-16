/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    appDir: true
  },
  compiler: {
    styledComponents: true
  },
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;

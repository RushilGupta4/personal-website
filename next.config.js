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
  },
  output: 'export'
};

module.exports = nextConfig;

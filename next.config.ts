import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Pin the workspace root so Turbopack ignores unrelated lockfiles in parent directories.
  turbopack: {
    root: path.resolve(import.meta.dirname)
  }
};

export default nextConfig;

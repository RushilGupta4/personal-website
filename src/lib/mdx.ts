import { notFound } from 'next/navigation';
import { cache } from 'react';
import { toISODate } from './utils';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import BlogInfo from '@/components/mdx/BlogInfo';
import MdxImage from '@/components/mdx/MdxImage';

const rootDirectory = `${process.cwd()}/content`;

export const getPostBySlug = async (slug: string, directory: string): Promise<{ meta: any; content: any }> => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const dirPath = directory.length > 0 ? path.join(rootDirectory, directory) : rootDirectory;
  const filePath = path.join(dirPath, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return { meta: {}, content: null };
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      // next-mdx-remote v5+ strips JSX expressions by default. Our MDX is authored
      // in-repo (not user submitted) and relies on `<BlogInfo frontmatter={frontmatter} />`,
      // so expressions stay enabled while dangerous calls remain blocked.
      blockJS: false,
      blockDangerousJS: true
    },
    components: { BlogInfo, img: MdxImage }
  });

  if (frontmatter.hasOwnProperty('published')) {
    if (!frontmatter.published) {
      return { meta: {}, content: null };
    }
  }

  if (directory === 'blogs') {
    for (const field of ['publishDate', 'updatedDate']) {
      if (field === 'updatedDate' && frontmatter[field] === undefined) continue;
      if (!toISODate(frontmatter[field] as string)) {
        throw new Error(`Invalid ${field} in ${filePath}: expected YYYY-MM-DD or Month D, YYYY`);
      }
    }
  }

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPostsMeta = async (directory: string) => {
  const dir = path.join(rootDirectory, directory);
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));

  let posts = [];

  for (const file of files) {
    const { meta, content } = await getPostBySlug(file, directory);
    if (!content) {
      continue;
    }
    posts.push(meta);
  }

  let sortedPosts = posts.sort((p1: any, p2: any) => {
    let date1 = new Date(p1.publishDate);
    let date2 = new Date(p2.publishDate);

    return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
  });

  return sortedPosts;
};

/** Share the same existence check between page, metadata, and social image. */
export const getBlogPostOrNotFound = cache(async (slug: string) => {
  const post = await getPostBySlug(slug, 'blogs');
  if (!post.content) notFound();
  return post;
});

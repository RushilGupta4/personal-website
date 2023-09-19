import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import BlogInfo from '@/components/mdx/BlogInfo';

const rootDirectory = `${process.cwd()}/content`;

export const getPostBySlug = async (slug: string, directory: string) => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(rootDirectory, directory, `${realSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return { meta: {}, content: null };
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: { BlogInfo }
  });

  if (!frontmatter.published) {
    return { meta: {}, content: null };
  }

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPostsMeta = async (directory: string) => {
  const dir = path.join(rootDirectory, directory);
  const files = fs.readdirSync(dir);

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

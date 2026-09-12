import { createPageMetadata } from '@/lib/metadata';
import { toISODate } from '@/lib/utils';
import { getAllPostsMeta, getBlogPostOrNotFound } from '@/lib/mdx';
import SchemaData from '@/components/SchemaData';
import { absoluteUrl, personId, siteId, siteUrl } from '@/lib/constants';

export async function generateStaticParams() {
  const slugs = await getAllPostsMeta('blogs');
  return slugs.map(data => ({ slug: data.slug }));
}

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { meta }: { meta: any } = await getBlogPostOrNotFound(slug);
  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blogs/${slug}`,
    publishedTime: toISODate(meta.publishDate),
    modifiedTime: toISODate(meta.updatedDate || meta.publishDate)
  });
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { meta, content } = await getBlogPostOrNotFound(slug);

  const postUrl = absoluteUrl(`/blogs/${slug}`);
  const postSchema = {
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    isPartOf: { '@id': `${absoluteUrl('/blogs')}#blog` },
    author: { '@id': personId, name: 'Rushil Gupta', url: siteUrl },
    publisher: { '@id': personId, name: 'Rushil Gupta', url: siteUrl },
    headline: meta.title,
    description: meta.description,
    datePublished: toISODate(meta.publishDate),
    dateModified: toISODate(meta.updatedDate || meta.publishDate),
    inLanguage: 'en',
    articleSection: meta.tags,
    ...(meta.image ? { image: absoluteUrl(meta.image) } : {}),
    url: postUrl,
    keywords: meta.keywords
  };

  return (
    <section className="pt-4 md:pt-8 mx-auto">
      <SchemaData data={{ '@graph': [{ '@type': 'WebPage', '@id': postUrl, isPartOf: { '@id': siteId } }, postSchema] }} />
      <article className="mx-auto prose prose-base md:prose-md lg:prose-lg 2xl:prose-2xl max-w-none">{content}</article>
    </section>
  );
};

export default Page;

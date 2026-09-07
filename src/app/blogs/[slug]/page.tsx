import { createPageMetadata } from '@/lib/metadata';
import { toISODate } from '@/lib/utils';
import { getAllPostsMeta, getBlogPostOrNotFound } from '@/lib/mdx';
import SchemaData from '@/components/SchemaData';
import { baseUrl, personId } from '@/lib/constants';

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

  const jsonLd = {
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${slug}`
    },
    author: {
      '@type': 'Person',
      '@id': personId,
      name: 'Rushil Gupta',
      url: baseUrl
    },
    publisher: {
      '@type': 'Person',
      '@id': personId,
      name: 'Rushil Gupta',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/img/favicon.png`
      }
    },
    headline: meta.title,
    description: meta.description,
    datePublished: toISODate(meta.publishDate),
    dateModified: toISODate(meta.updatedDate || meta.publishDate),
    image: `${baseUrl}/blogs/${slug}/opengraph-image`,
    url: `/blogs/${slug}`,
    keywords: meta.keywords
  };

  return (
    <section className="pt-4 md:pt-8 mx-auto">
      <SchemaData data={jsonLd} />
      <article className="mx-auto prose prose-base md:prose-md lg:prose-lg 2xl:prose-2xl">{content}</article>
    </section>
  );
};

export default Page;

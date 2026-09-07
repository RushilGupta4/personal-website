import { redirect } from 'next/navigation';
import { getAllPostsMeta, getPostBySlug } from '@/lib/mdx';
import SchemaData from '@/components/SchemaData';
import { baseUrl } from '@/lib/constants';

export async function generateStaticParams() {
  const slugs = await getAllPostsMeta('blogs');
  return slugs.map(data => ({ slug: data.slug }));
}

const getPageContent = async (slug: string) => {
  const { meta, content } = await getPostBySlug(slug, 'blogs');
  return { meta, content };
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { meta }: { meta: any } = await getPageContent(slug);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || 'Rushil Gupta, blog, technology, programming, computer science',
    alternates: {
      canonical: `/blogs/${slug}`
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/blogs/${slug}`,
      type: 'article',
      publishedTime: meta.publishDate,
      authors: ['Rushil Gupta']
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description
    }
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { meta, content } = await getPageContent(slug);

  const jsonLd = {
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${slug}`
    },
    author: {
      '@type': 'Person',
      name: 'Rushil Gupta',
      url: baseUrl
    },
    publisher: {
      '@type': 'Person',
      name: 'Rushil Gupta',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/img/favicon.png`
      }
    },
    headline: meta.title,
    description: meta.description,
    datePublished: new Date(meta.publishDate).toISOString(),
    dateModified: meta.updatedDate ? new Date(meta.updatedDate).toISOString() : new Date(meta.publishDate).toISOString(),
    image: `${baseUrl}/blogs/${slug}/opengraph-image`,
    url: `/blogs/${slug}`,
    keywords: meta.keywords
  };

  if (!content) {
    redirect('/blogs');
  }

  return (
    <section className="pt-4 md:pt-8 mx-auto">
      <SchemaData data={jsonLd} />
      <article className="mx-auto prose prose-base md:prose-md lg:prose-lg 2xl:prose-2xl">{content}</article>
    </section>
  );
};

export default Page;

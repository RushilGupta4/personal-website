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

export async function generateMetadata({ params }: { params: any }) {
  const { meta }: { meta: any } = await getPageContent(params.slug);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || 'Rushil Gupta, blog, technology, programming, computer science',
    alternates: {
      canonical: `/blogs/${params.slug}`
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/blogs/${params.slug}`,
      type: 'article',
      publishedTime: meta.publishDate,
      authors: ['Rushil Gupta'],
      images: [
        {
          url: meta.image || `${baseUrl}/img/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image || `${baseUrl}/img/opengraph-image.png`]
    }
  };
}

const Page = async ({ params }: { params: any }) => {
  const { meta, content } = await getPageContent(params.slug);

  const jsonLd = {
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${params.slug}`
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
    image: meta.image || `${baseUrl}/img/opengraph-image.png`,
    url: `/blogs/${params.slug}`,
    keywords: meta.keywords
  };

  if (!content) {
    redirect('/blogs');
  }

  return (
    <section className="pt-4 md:pt-8 mx-auto">
      <SchemaData data={jsonLd} />
      <article className="mx-auto prose prose-invert prose-base md:prose-md lg:prose-lg 2xl:prose-2xl">{content}</article>
    </section>
  );
};

export default Page;

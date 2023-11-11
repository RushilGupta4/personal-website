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
    alternates: {
      canonical: `/blogs/${params.slug}`
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/blogs/${params.slug}`,
      type: 'website'
    }
  };
}

const Page = async ({ params }: { params: any }) => {
  const { meta, content } = await getPageContent(params.slug);

  const jsonLd = {
    '@type': 'BlogPosting',
    name: 'Rushil Gupta',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${params.slug}`
    },
    author: {
      '@type': 'Person',
      name: 'Rushil Gupta',
      url: 'https://www.rushilgupta.tech'
    },
    description: meta.description,
    headline: meta.title,
    datePublished: new Date(meta.publishDate),
    url: `/blogs/${params.slug}`,
    keywords: meta.keywords,
    image: meta.image
  };

  if (!content) {
    redirect('/blogs');
  }

  return (
    <section className="pt-4 md:pt-8 mx-auto">
      <SchemaData data={jsonLd} />
      <article className="mx-auto prose prose-base md:prose-lg prose-slate">{content}</article>
    </section>
  );
};

export default Page;

import { redirect } from 'next/navigation';
import { getAllPostsMeta, getPostBySlug } from '@/lib/mdx';

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
  const { content } = await getPageContent(params.slug);

  if (!content) {
    redirect('/blogs');
  }

  return (
    <div className="pt-4 md:pt-8 mx-auto">
      <article className="mx-auto prose prose-base md:prose-lg prose-slate">{content}</article>
    </div>
  );
};

export default Page;

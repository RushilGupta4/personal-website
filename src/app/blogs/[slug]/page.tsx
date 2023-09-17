import { redirect } from 'next/navigation';
import { getPostBySlug } from '@/lib/mdx';

const getPageContent = async (slug: string) => {
  const { meta, content } = await getPostBySlug(slug, 'blogs');
  return { meta, content };
};

export async function generateMetadata({ params }: { params: any }) {
  const { meta }: { meta: any } = await getPageContent(params.slug);
  return { title: `${meta.title} | Rushil Gupta` };
}

const Page = async ({ params }: { params: any }) => {
  const { content } = await getPageContent(params.slug);

  if (!content) {
    redirect('/blogs');
  }

  return (
    <div className="pt-4 md:pt-8">
      <article className="prose prose-base md:prose-lg lg:prose-xl prose-slate prose-h1:pb-1 md:prose-h1:pb-2 prose-h1:border-b-2 md:prose-h1:border-b-[3px] prose-h1:border-slate-700">
        {content}
      </article>
    </div>
  );
};

export default Page;

import { createPageMetadata } from '@/lib/metadata';
import BasePage from '@/components/base/BasePage';
import PublicationEntry from '@/components/publications/PublicationEntry';
import SchemaData from '@/components/SchemaData';
import publications, { AUTHOR_NAME } from '@/lib/publicationsData';
import { baseUrl, personId } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Publications',
  description: 'Research papers and preprints I have contributed to, spanning machine learning, optimisation and applied probability.',
  path: '/publications'
});

const PublicationsPage = () => {
  const sorted = [...publications].sort((a, b) => b.year - a.year || b.month - a.month);

  const jsonLd = sorted.map(publication => ({
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    name: publication.title,
    author: publication.authors.map(author => ({ '@type': 'Person', name: author, ...(author === AUTHOR_NAME ? { '@id': personId } : {}) })),
    description: publication.description,
    url: publication.links[0].url,
    mainEntityOfPage: `${baseUrl}/publications`
  }));

  return (
    <BasePage
      title={`Publications`}
      description={`Research papers and preprints I have contributed to, spanning machine learning, optimisation and applied probability.`}
    >
      <SchemaData data={jsonLd} />
      <div className="mx-auto">
        {sorted.map(publication => (
          <PublicationEntry key={publication.links[0].url} data={publication} />
        ))}
      </div>
    </BasePage>
  );
};

export default PublicationsPage;

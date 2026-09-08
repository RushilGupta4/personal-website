import { createPageMetadata } from '@/lib/metadata';
import BasePage from '@/components/base/BasePage';
import PublicationEntry from '@/components/publications/PublicationEntry';
import SchemaData from '@/components/SchemaData';
import publications, { AUTHOR_NAME } from '@/lib/publicationsData';
import { absoluteUrl, personId, siteId } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Publications',
  description: 'Research papers and preprints I have contributed to, spanning machine learning, optimisation and applied probability.',
  path: '/publications'
});

const PublicationsPage = () => {
  const sorted = [...publications].sort((a, b) => b.year - a.year || b.month - a.month);
  const pageUrl = absoluteUrl('/publications');

  const jsonLd = {
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: 'Publications',
        description: 'Research papers and preprints I have contributed to, spanning machine learning, optimisation and applied probability.',
        isPartOf: { '@id': siteId },
        mainEntity: { '@id': `${pageUrl}#list` }
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#list`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: sorted.map((publication, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'ScholarlyArticle',
            '@id': `${pageUrl}#publication-${index + 1}`,
            headline: publication.title,
            name: publication.title,
            author: publication.authors.map(author => ({ '@type': 'Person', name: author, ...(author === AUTHOR_NAME ? { '@id': personId } : {}) })),
            description: publication.description,
            datePublished: `${publication.year}-${String(publication.month).padStart(2, '0')}`,
            sameAs: publication.links[0].url,
            isPartOf: { '@id': `${pageUrl}#list` }
          }
        }))
      }
    ]
  };

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

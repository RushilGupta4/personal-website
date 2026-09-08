import { createPageMetadata } from '@/lib/metadata';
import BasePage from '@/components/base/BasePage';
import TeachingEntry from '@/components/teaching/TeachingEntry';
import teaching, { SEASON_ORDER } from '@/lib/teachingData';
import SchemaData from '@/components/SchemaData';
import { absoluteUrl, siteId } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Teaching',
  description: 'Courses I have been a teaching assistant for, along with resources and lectures I gave.',
  path: '/teaching'
});

const TeachingPage = () => {
  const sorted = [...teaching].sort((a, b) => b.termYear - a.termYear || SEASON_ORDER[b.termSeason] - SEASON_ORDER[a.termSeason]);
  const pageUrl = absoluteUrl('/teaching');
  const jsonLd = {
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: 'Teaching',
        description: 'Courses I have been a teaching assistant for, along with resources and lectures I gave.',
        isPartOf: { '@id': siteId },
        mainEntity: { '@id': `${pageUrl}#courses` }
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#courses`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: sorted.map((course, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Course',
            '@id': `${pageUrl}#course-${index + 1}`,
            name: course.name,
            courseCode: course.code,
            provider: { '@type': 'CollegeOrUniversity', name: course.institution }
          }
        }))
      }
    ]
  };

  return (
    <BasePage
      title={`Teaching`}
      description={`These are the courses I have been a teaching assistant for. I was fortunate to give some lectures too!`}
    >
      <SchemaData data={jsonLd} />
      <div className="mx-auto">
        {sorted.map(course => (
          <TeachingEntry key={`${course.code}-${course.termSeason}-${course.termYear}`} data={course} />
        ))}
      </div>
    </BasePage>
  );
};

export default TeachingPage;

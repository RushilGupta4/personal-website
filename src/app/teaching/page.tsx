import { createPageMetadata } from '@/lib/metadata';
import BasePage from '@/components/base/BasePage';
import TeachingEntry from '@/components/teaching/TeachingEntry';
import teaching, { SEASON_ORDER } from '@/lib/teachingData';

export const metadata = createPageMetadata({
  title: 'Teaching',
  description: 'Courses I have been a teaching assistant for, along with resources and lectures I gave.',
  path: '/teaching'
});

const TeachingPage = () => {
  const sorted = [...teaching].sort((a, b) => b.termYear - a.termYear || SEASON_ORDER[b.termSeason] - SEASON_ORDER[a.termSeason]);

  return (
    <BasePage
      title={`Teaching`}
      description={`These are the courses I have been a teaching assistant for. I was fortunate to give some lectures too!`}
    >
      <div className="mx-auto">
        {sorted.map(course => (
          <TeachingEntry key={`${course.code}-${course.termSeason}-${course.termYear}`} data={course} />
        ))}
      </div>
    </BasePage>
  );
};

export default TeachingPage;

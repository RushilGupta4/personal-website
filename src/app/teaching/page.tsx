import { Metadata } from 'next';
import BasePage from '@/components/base/BasePage';
import TeachingEntry from '@/components/teaching/TeachingEntry';
import teaching, { SEASON_ORDER } from '@/lib/teachingData';

export const metadata: Metadata = {
  title: 'Teaching',
  description: 'Courses I have been a teaching assistant for, along with resources and lectures I gave.',
  alternates: {
    canonical: `/teaching`
  }
};

const TeachingPage = () => {
  const sorted = [...teaching].sort((a, b) => b.termYear - a.termYear || SEASON_ORDER[b.termSeason] - SEASON_ORDER[a.termSeason]);

  return (
    <BasePage
      title={`Teaching`}
      description={`These are the courses I have been a teaching assistant for. Where I gave a lecture, I have attached the resources and slides.`}
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

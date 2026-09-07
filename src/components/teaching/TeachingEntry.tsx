import { FiExternalLink, FiFileText } from 'react-icons/fi';
import type { Course } from '@/lib/teachingData';

const TeachingEntry = ({ data }: { data: Course }) => {
  const hasSlides = Boolean(data.slides?.length);

  return (
    <article className="py-5 md:py-6 border-b border-border-light/30 last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
        <h2 className="text-xl md:text-2xl 3xl:text-3xl font-bold leading-snug text-text-heading">
          {data.courseLink ? (
            <a
              href={data.courseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline link-underline-blue transition-colors duration-200"
            >
              {data.name}
            </a>
          ) : (
            data.name
          )}
        </h2>
        <span className="shrink-0 text-sm md:text-base text-text-secondary whitespace-nowrap">
          {data.termSeason} {data.termYear}
        </span>
      </div>

      <p className="mt-2 text-sm md:text-base text-text-secondary">
        <span className="font-medium text-text-primary">{data.role}</span>
        {' · '}
        {data.code}
        {' · '}
        {data.institution}
      </p>

      {data.instructors && data.instructors.length > 0 && (
        <p className="mt-1 text-sm md:text-base text-text-secondary">
          Taught by {new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(data.instructors)}
        </p>
      )}

      {hasSlides && (
        <div className="mt-4">
          <p className="text-sm uppercase tracking-wider text-text-disabled font-medium mb-2">Slides</p>
          <ul className="flex flex-col gap-2">
            {data.slides!.map(slide => {
              const isExternal = /^https?:\/\//.test(slide.url);
              return (
                <li key={slide.url}>
                  <a
                    href={slide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-base md:text-lg text-text-body hover:text-accent-400 transition-colors duration-200"
                  >
                    {isExternal ? (
                      <FiExternalLink className="shrink-0 text-text-disabled group-hover:text-accent-400 transition-colors" size={16} />
                    ) : (
                      <FiFileText className="shrink-0 text-text-disabled group-hover:text-accent-400 transition-colors" size={16} />
                    )}
                    <span className="underline underline-offset-4 decoration-border-main group-hover:decoration-accent-400">{slide.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
};

export default TeachingEntry;

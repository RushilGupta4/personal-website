import { AUTHOR_NAME, type Publication, type VenueType } from '@/lib/publicationsData';
import { cn } from '@/lib/utils';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const VENUE_STYLES: Record<VenueType, string> = {
  conference: 'bg-primary-main/15 text-accent-300 border-primary-main/30',
  journal: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  workshop: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  preprint: 'bg-neutral-main/15 text-text-body border-neutral-main/30'
};

const PublicationEntry = ({ data }: { data: Publication }) => {
  const [primary, ...secondary] = data.links;
  const date = `${MONTHS[data.month - 1]} ${data.year}`;

  return (
    <article className="py-5 md:py-6 border-b border-border-light/30 last:border-b-0">
      <h2 className="text-xl md:text-2xl 3xl:text-3xl font-bold leading-snug text-text-heading">
        <a href={primary.url} target="_blank" rel="noopener noreferrer" className="link-underline link-underline-blue transition-colors duration-200">
          {data.title}
        </a>
      </h2>

      <p className="mt-2 text-sm md:text-base text-text-secondary">
        {data.authors.map((author, index) => (
          <span key={author}>
            <span className={cn(author === AUTHOR_NAME && 'font-semibold text-text-primary')}>{author}</span>
            {index < data.authors.length - 1 && ', '}
          </span>
        ))}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
        <span className={cn('px-2.5 py-0.5 rounded-md border font-medium', VENUE_STYLES[data.venue.type])}>{data.venue.name}</span>
        <span className="text-text-secondary">{date}</span>
        {secondary.length > 0 && (
          <span className="flex flex-wrap items-center gap-x-3">
            {secondary.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-400 underline underline-offset-4 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </span>
        )}
      </div>

      <p className="mt-3 text-base md:text-lg 3xl:text-xl text-text-body font-[325] leading-relaxed">{data.description}</p>
    </article>
  );
};

export default PublicationEntry;

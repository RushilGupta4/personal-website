import { AUTHOR_NAME, primaryUrl, type Publication, type Venue, type VenueType } from '@/lib/publicationsData';
import { cn } from '@/lib/utils';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const VENUE_STYLES: Record<VenueType, string> = {
  conference: 'bg-primary-main/15 text-accent-300 border-primary-main/30',
  journal: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  workshop: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  preprint: 'bg-neutral-main/15 text-text-body border-neutral-main/30'
};

/** A venue pill linking to this version of the paper. */
const VenueTag = ({ venue }: { venue: Venue }) => (
  <a
    href={venue.paper}
    target="_blank"
    rel="noopener noreferrer"
    className={cn('px-2.5 py-0.5 rounded-md border font-medium hover:brightness-125 transition-[filter] duration-200', VENUE_STYLES[venue.type])}
  >
    {venue.name}
  </a>
);

const PublicationEntry = ({ data }: { data: Publication }) => {
  const date = `${MONTHS[data.month - 1]} ${data.year}`;

  return (
    <article className="py-5 md:py-6 border-b border-border-light/60 last:border-b-0">
      <h2 className="text-xl md:text-2xl font-bold leading-snug text-text-heading">
        <a href={primaryUrl(data)} target="_blank" rel="noopener noreferrer" className="link-underline link-underline-blue transition-colors duration-200">
          {data.title}
        </a>
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {data.authors.map((author, index) => (
          <span key={author}>
            <span className={cn(author === AUTHOR_NAME && 'font-semibold text-text-primary')}>{author}</span>
            {index < data.authors.length - 1 && ', '}
          </span>
        ))}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        {data.venues.map(venue => (
          <VenueTag key={venue.name} venue={venue} />
        ))}
        <span className="text-text-secondary">{date}</span>
      </div>

      <p className="mt-3 text-base md:text-lg 3xl:text-xl text-text-body font-[325] leading-relaxed">{data.description}</p>
    </article>
  );
};

export default PublicationEntry;

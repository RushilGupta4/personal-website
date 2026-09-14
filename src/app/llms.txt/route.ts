import { absoluteUrl, socialLinks } from '@/lib/constants';
import publications from '@/lib/publicationsData';

export const dynamic = 'force-static';

export function GET(): Response {
  const papers = [...publications]
    .sort((a, b) => b.year - a.year || b.month - a.month)
    .map(publication => {
      const month = new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' })
        .format(new Date(Date.UTC(publication.year, publication.month - 1, 1)));
      const venue = publication.venue.type === 'preprint'
        ? `${month} ${publication.year} preprint`
        : `${publication.venue.name} paper`;
      const description = publication.directorySummary
        ? `${venue} ${publication.directorySummary}`
        : `${venue}. ${publication.description}`;
      return `- [${publication.title}](${publication.links[0].url}): ${description}`;
    })
    .join('\n');

  const content = `# Rushil Gupta

> Personal website of Rushil Gupta, a Mathematics and Computer
> Science major at Ashoka University. His research interests
> include machine learning, optimisation, and applied probability.

Rushil works at the Safexpress Centre for Data, Learning and
Decision Sciences (SCDLDS) at Ashoka University with Professor
Sandeep Juneja. In summer 2026, he visited Professor Peter Glynn
at Stanford University. Previously, he worked on the platforms
team at Sarvam AI from 2024 to 2025.

Outside research, he enjoys playing squash and learning new things,
usually with coffee nearby.

Publication entries distinguish preprints from conference papers.
Blog posts describe experiences at their publication dates and
may not reflect current affiliations.

## Main pages

- [About Rushil](${absoluteUrl('/')}): Current biography and profile links.
- [Publications](${absoluteUrl('/publications')}): Research papers, authors, summaries, venues, and source links.
- [Teaching](${absoluteUrl('/teaching')}): Teaching assistant roles at Ashoka University and lecture materials.
- [Résumé](${absoluteUrl('/resume.pdf')}): Education, research, and professional experience.

## Research papers

${papers}

## Profiles and affiliations

- [Google Scholar](${socialLinks.scholar}): Publication and citation profile.
- [SCDLDS](https://scdlds.ashoka.edu.in/): Safexpress Centre for Data, Learning and Decision Sciences at Ashoka University.
- [Sandeep Juneja](https://sandeep-juneja.github.io/): Faculty website.
- [Peter Glynn](https://profiles.stanford.edu/peter-glynn): Stanford faculty profile.
- [Sarvam AI](https://www.sarvam.ai/): Previous employer.

## Optional

- [Blog](${absoluteUrl('/blogs')}): Personal writing about university, internships, and software development.
- [GitHub](${socialLinks.github}): Code and projects.
- [LinkedIn](${socialLinks.linkedin}): Professional profile.
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}

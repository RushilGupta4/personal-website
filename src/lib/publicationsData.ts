/**
 * Publications
 * ------------
 * Entries are sorted newest-first by the page itself, so the order here does not matter.
 */

export type VenueType = 'conference' | 'journal' | 'workshop' | 'preprint';

export interface Venue {
  /** Display name, e.g. "AISTATS 2026" or "arXiv". */
  name: string;
  type: VenueType;
}

export interface PublicationLink {
  label: string;
  url: string;
}

export interface Publication {
  title: string;
  /** In publication order. Names matching `AUTHOR_NAME` are highlighted. */
  authors: string[];
  /** 1-12 */
  month: number;
  year: number;
  /** One or two lines. */
  description: string;
  venue: Venue;
  /** First entry is the primary link the title points at. */
  links: PublicationLink[];
}

/** Author name to highlight in the author lists. */
export const AUTHOR_NAME = 'Rushil Gupta';

const publications: Publication[] = [
  {
    title: 'AdaWeather: Adaptively Mixing Probabilistic Weather Forecasts with Logarithmic Regret',
    authors: [
      'Saptarishi Dhanuka',
      'Sarvesh Iyer',
      'Manmeet Singh',
      'Mihir More',
      'Rushil Gupta',
      'Dhruman Gupta',
      'Parthasarathi Mukhopadhyay',
      'Sandeep Juneja'
    ],
    month: 6,
    year: 2026,
    description:
      'An adaptive framework that mixes many probabilistic weather forecasts using both machine learning and a mixture of experts. We prove logarithmic regret against the best static mixture of experts in hindsight, and show empirical gains on temperature forecasting.',
    venue: { name: 'arXiv', type: 'preprint' },
    links: [{ label: 'arXiv', url: 'https://arxiv.org/abs/2606.02663' }]
  },
  {
    title: 'Fundamental limits for weighted empirical approximations of tilted distributions',
    authors: [
      'Sarvesh Ravichandran Iyer',
      'Himadri Mandal',
      'Dhruman Gupta',
      'Rushil Gupta',
      'Agniv Bandhyopadhyay',
      'Achal Bassamboo',
      'Varun Gupta',
      'Sandeep Juneja'
    ],
    month: 12,
    year: 2025,
    description:
      'A sharp characterisation of how accurately a self-normalized importance sampler can approximate a tilted distribution from samples of the base distribution alone. Bounded random vectors need polynomially many samples in the tilt amount; unbounded ones need super-polynomially many.',
    venue: { name: 'AISTATS 2026', type: 'conference' },
    links: [
      { label: 'OpenReview', url: 'https://openreview.net/forum?id=gmmtcjRs0O' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2512.23979' }
    ]
  }
];

export default publications;

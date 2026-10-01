/**
 * Publications
 * ------------
 * Entries are sorted newest-first by the page itself, so the order here does not matter.
 */

export type VenueType = 'conference' | 'journal' | 'workshop' | 'preprint';

/** One version of a paper, e.g. its arXiv preprint or its appearance at a conference. */
export interface Venue {
  /** Display name, e.g. "AISTATS 2026" or "arXiv". */
  name: string;
  type: VenueType;
  /** This version of the paper, e.g. its OpenReview, PMLR or arXiv page. The tag links here. */
  paper: string;
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
  /** Concise description for the llms.txt directory, following the venue/date. */
  directorySummary?: string;
  /** One per version of the paper, shown in this order. */
  venues: Venue[];
}

/** Author name to highlight in the author lists. */
export const AUTHOR_NAME = 'Rushil Gupta';

const publications: Publication[] = [
  {
    title: 'A Splitting Method for SDE Terminal-Law Estimation',
    directorySummary: 'with Sandeep Juneja on path splitting for estimating terminal distributions of stochastic differential equations.',
    authors: ['Rushil Gupta', 'Sandeep Juneja'],
    month: 9,
    year: 2026,
    description:
      'A path-splitting method for estimating terminal distributions of stochastic differential equations under a fixed simulation budget. We characterise asymptotic errors and develop a splitting strategy that reduces mean Kolmogorov–Smirnov error by 10–25% in many settings compared with independent sampling.',
    venues: [
      { name: 'MLxOR @ NeurIPS 2026', type: 'workshop', paper: 'https://openreview.net/forum?id=QLkuIr3rQE' },
      { name: 'arXiv', type: 'preprint', paper: 'https://arxiv.org/abs/2609.12513' }
    ]
  },
  {
    title: 'AdaWeather: Adaptively Mixing Probabilistic Weather Forecasts with Logarithmic Regret',
    directorySummary: 'on adaptive combinations of probabilistic weather forecasts.',
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
    venues: [{ name: 'arXiv', type: 'preprint', paper: 'https://arxiv.org/abs/2606.02663' }]
  },
  {
    title: 'Fundamental limits for weighted empirical approximations of tilted distributions',
    directorySummary: 'on the accuracy of self-normalized importance sampling.',
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
    venues: [
      { name: 'AISTATS 2026', type: 'conference', paper: 'https://openreview.net/forum?id=gmmtcjRs0O' },
      { name: 'arXiv', type: 'preprint', paper: 'https://arxiv.org/abs/2512.23979' }
    ]
  }
];

/** The link the title points at: the arXiv version (ideally the latest), else the first version. */
export const primaryUrl = (publication: Publication): string =>
  (publication.venues.find(venue => venue.name === 'arXiv') ?? publication.venues[0]).paper;

export default publications;

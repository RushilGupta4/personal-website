/**
 * Teaching
 * --------
 * Courses assisted, newest term first. `termYear` / `termSeason` drive the sort,
 * so entries can be listed here in any order.
 */

export type TermSeason = 'Spring' | 'Monsoon';

export interface Slide {
  title: string;
  /** Local path under /public or an external URL - both are just hrefs. */
  url: string;
}

export interface Course {
  /** Course code(s) as they appear on the transcript, e.g. "CS-3410 / MAT-3211". */
  code: string;
  name: string;
  institution: string;
  termSeason: TermSeason;
  termYear: number;
  role: string;
  /** Course instructor(s). */
  instructors?: string[];
  courseLink?: string;
  /** Talks or lectures delivered. Omit or leave empty when there are none. */
  slides?: Slide[];
}

/** Monsoon runs Aug-Dec, Spring runs Jan-May, so Monsoon sorts after Spring in the same year. */
export const SEASON_ORDER: Record<TermSeason, number> = {
  Spring: 0,
  Monsoon: 1
};

const teaching: Course[] = [
  {
    code: 'CS-5410 / ECO-6410 / MAT-3215 / CS-4411 / ECO-4410',
    name: 'Reinforcement Learning',
    institution: 'Ashoka University',
    termSeason: 'Monsoon',
    termYear: 2026,
    role: 'Teaching Assistant',
    instructors: ['Sandeep Juneja']
  },
  {
    code: 'CS-3410 / MAT-3211',
    name: 'Introduction to Machine Learning',
    institution: 'Ashoka University',
    termSeason: 'Spring',
    termYear: 2026,
    role: 'Teaching Assistant',
    instructors: ['Sandeep Juneja'],
    slides: [
      { title: '(V)AE and Sequence Modelling', url: '/teaching/cs-3410/vae-and-sequence-modelling.pdf' },
      { title: 'Transformers', url: '/teaching/cs-3410/transformers.pdf' }
    ]
  },
  {
    code: 'CS-3220 / MAT-2204',
    name: 'Numerical Algorithms and Optimization',
    institution: 'Ashoka University',
    termSeason: 'Monsoon',
    termYear: 2025,
    role: 'Teaching Assistant',
    instructors: ['Sandeep Juneja', 'Sagar Shrivastava']
  },
  {
    code: 'CS-1102',
    name: 'Introduction to Computer Science',
    institution: 'Ashoka University',
    termSeason: 'Spring',
    termYear: 2025,
    role: 'Teaching Assistant',
    instructors: ['Aalok Thakkar', 'Debayan Gupta']
  }
];

export default teaching;

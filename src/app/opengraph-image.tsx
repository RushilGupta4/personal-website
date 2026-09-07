import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og';

export const alt = 'Rushil Gupta | CS @ Ashoka University';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function og() {
  return new ImageResponse(<OgCard title="Rushil Gupta" eyebrow="rushilgupta.in" meta={['CS @ Ashoka University']} />, size);
}

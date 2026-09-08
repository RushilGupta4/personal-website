import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og';

export const alt = 'Teaching - Rushil Gupta';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function og() {
  return new ImageResponse(<OgCard title="Teaching" eyebrow="Rushil Gupta" />, size);
}

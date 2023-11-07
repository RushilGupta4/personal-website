/* eslint-disable @next/next/no-img-element */
import { getPostBySlug } from '@/lib/mdx';
import { ImageResponse } from 'next/og';
import { baseUrl } from '@/lib/constants';

export const alt = 'Blog - Rushil Gupta';
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function og({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { meta } = await getPostBySlug(slug, 'blogs');

  const imgUrl = meta?.image != '' ? baseUrl + meta?.image : baseUrl + '/img/og-image.png';

  return new ImageResponse(
    (
      <div tw="relative w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img tw="flex flex-1" src={imgUrl} alt={meta?.title!!} width={size.width} height={size.height} />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black opacity-40" />
        </div>
        <div tw="flex flex-col text-neutral-50 w-5/6 text-center mx-auto">
          {/* Title */}
          <div tw="mx-auto text-[80px] !font-bold">{meta?.title}</div>
          <hr tw="w-1/2 mx-auto mt-6 mb-8 border-neutral-100 opacity-80" />
          {/* Tags */}
          <div tw="mx-auto flex items-center text-4xl text-neutral-100">
            <div>{meta?.author}</div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div>{meta?.readTime}</div>
            <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
            <div>{meta?.publishDate!!}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

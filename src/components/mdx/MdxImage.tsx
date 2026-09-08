import Image from 'next/image';
import type { ComponentProps } from 'react';

type Dimensions = { width: number; height: number };

// MDX image sources are authored in-repo. Keeping dimensions alongside the
// renderer lets the browser reserve space before an image loads, while
// next/image serves responsive renditions instead of the original JPEG.
const dimensionsBySource: Record<string, Dimensions> = {
  '/blogs/first-month-at-ashoka/ashoka-at-night.jpeg': { width: 1280, height: 960 },
  '/blogs/first-month-at-ashoka/ganesh-chaturthi-ashoka.jpeg': { width: 1600, height: 960 },
  '/blogs/my-first-internship/rain-at-ashoka.jpeg': { width: 960, height: 1213 },
  '/blogs/racquet-sports-league/toofan-express-owners.JPG': { width: 1600, height: 1200 },
  '/blogs/the-journey-of-this-website/coding-the-website.jpeg': { width: 4032, height: 2864 }
};

type MdxImageProps = ComponentProps<'img'>;

export default function MdxImage({ src, alt = '', className, width, height, ...props }: MdxImageProps): React.JSX.Element {
  const source = typeof src === 'string' ? src : '';
  const dimensions = dimensionsBySource[source];

  if (!dimensions) {
    // The fallback preserves unknown, authored MDX images while retaining any
    // supplied intrinsic dimensions. All current in-repo images use Image.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={source} alt={alt} width={width} height={height} className={className} loading="lazy" decoding="async" {...props} />;
  }

  return (
    <Image
      src={source}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
      className={className}
      {...props}
    />
  );
}

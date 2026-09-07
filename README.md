This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/api-reference/components/font) to automatically optimize and load Roboto, a custom Google Font.

Use npm — `package-lock.json` is the only lockfile. Adding a `pnpm-lock.yaml` or `yarn.lock` will make Vercel pick that package manager instead.

Lint with `npx eslint` (`next lint` was removed in Next.js 16; config lives in `eslint.config.mjs`).

## Assets

**Compress binaries _before_ the commit that adds them.** Git keeps every version forever, so shrinking a file after it has landed only helps the working tree — the original blob stays in history and in every clone. The one-time cleanup below took `public/` from 18.6 MB to 4.8 MB.

### Slide PDFs (`public/teaching/**`)

Lecture decks exported from Beamer/Keynote store screenshots losslessly and run 5-8 MB. Ghostscript's `/ebook` preset downsamples images to 150 dpi and gives roughly a 6x reduction with no visible loss — text stays crisp and it is still fine to print as a handout.

```bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.7 -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH -sOutputFile=out.pdf in.pdf
```

Measured on the CS-3410 decks: 8171 KB -> 1254 KB and 5159 KB -> 1169 KB, at 0.56% RMSE against the originals.

Other presets, if `/ebook` ever looks too soft: `/printer` (300 dpi, ~1.6 MB each) or `/screen` (72 dpi, smallest). Always re-check the page count afterwards — Ghostscript silently drops pages on malformed input:

```bash
gs -q -dNODISPLAY -dNOSAFER -c "(out.pdf) (r) file runpdfbegin pdfpagecount = quit"
```

### Photos (`public/img/**`)

Convert to WebP and cap the width at roughly 2x the largest size the image is ever displayed at. The landing photo renders at most 680 CSS px, so 2000px covers retina comfortably.

```bash
cwebp -q 80 -resize 2000 0 input.jpeg -o output.webp
```

`landing.jpeg` (4032x3024, 2759 KB) became `landing.webp` (2000x1500, 250 KB). Import it in `src/app/page.tsx` as a static import so `next/image` keeps generating the blur placeholder and the responsive `srcset`.

### Still uncompressed

The blog images under `public/blogs/**` total ~2 MB and would drop to ~600 KB as WebP q80, but they are referenced by filename from the MDX files, so each conversion needs a matching content edit. They are also already in git history, so converting them shrinks checkouts but not clone size — which is why they were left alone.

### Before committing new binaries

```bash
find public src -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \
  -o -iname '*.webp' -o -iname '*.pdf' \) -exec ls -l {} \; \
  | awk '{printf "%10.1f KB  %s\n", $5/1024, $9}' | sort -rn
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

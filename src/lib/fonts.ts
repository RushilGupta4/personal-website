import { Inter, Poppins, Work_Sans, Roboto } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const workSans = Work_Sans({
  subsets: ['latin']
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
});

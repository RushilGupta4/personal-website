import './globals.scss';

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`mx-auto w-11/12 sm:w-3/4 md:w-[70%] lg:w-[65%] min-[1100px]:w-[60%]`}>{children}</div>;
}

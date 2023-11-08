import './globals.scss';

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`mx-auto w-11/12 sm:w-3/4 lg:w-[70%]`}>{children}</div>;
}

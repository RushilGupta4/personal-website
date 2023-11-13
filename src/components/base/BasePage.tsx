export default async function BasePage({ title, description, children }: { title: string; description: string; children: any }) {
  return (
    <div id={title}>
      <h1
        className={
          'base-heading underline decoration-3 md:decoration-4 underline-offset-[6px] sm:underline-offset-[8px] text-[40px] sm:text-[54px] md:text-[60px] lg:text-[64px]'
        }
      >
        {title}
      </h1>
      <p className={`mx-auto text-slate-500 font-[450] sm:font-normal text-[16px] md:text-[18px] lg:text-[20px]`}>{description}</p>
      {children}
    </div>
  );
}

export default async function BasePage({ title, description, children }: { title: string; description: string; children: any }) {
  return (
    <div id={title}>
      <div className="py-2 md:py-4">
        <h1 className={'base-heading text-4xl sm:text-5xl md:text-6xl lg:text-6xl'}>{title}</h1>
        <p
          className={`text-center pt-1 md:pt-2 lg:pt-3 2xl:pt-4 4xl:pt-4 mx-auto text-slate-300 font-[450] sm:font-normal text-base md:text-lg lg:text-xl 2xl:text-2xl 4xl:text-3xl`}
        >
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

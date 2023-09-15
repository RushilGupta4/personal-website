import Image from "next/image";

export default function Home() {
  return (
    <div className={`flex-none lg:flex`}>
      {/* Profile Pic */}
      <div className={`mx-auto w-full lg:w-[35%]`}>
        <div className={`mx-auto w-[60%] min-[540px]:w-[55%] sm:w-[45%] min-[700px]:w-[42%] md:w-[38%] min-[920px]:w-[35%] lg:w-[80%]`}>
          <Image
            src='/profile_pic.jpeg'
            sizes='100vw'
            width={1}
            height={1}
            style={{
              width: "100%",
              height: "auto",
            }}
            quality={100}
            alt='Picture of me'
            className={`mx-auto border-[6px] sm:border-8 border-slate-300 rounded-full`}
          />
        </div>
      </div>

      {/* About Me */}
      <div className={`mx-auto my-0 lg:my-auto w-full lg:w-[70%] pt-2 lg:pt-0 pb-0 lg:pb-24 pl-0 lg:pl-8`}>
        <p
          className={`base-heading underline decoration-[2px] sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[12px] text-4xl sm:text-p[40px] md:text-5xl lg:text-6xl`}
        >
          Hi, I&apos;m Rushil
        </p>
        <div
          className={`pt-3 sm:pt-4 md:pt-5 lg:pt-8 font-light lg:font-[225] text-[17px] md:text-xl lg:text-[21px] text-center lg:text-left px-1 lg:px-8`}
        >
          <p>I&apos;m a 1st year Computer Science student, currently researching on algorithmic trading.</p>
        </div>
      </div>
    </div>
  );
}

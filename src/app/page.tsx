import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { ImBlogger2 } from "react-icons/im";

export default function Home() {
  return (
    <div className={"flex flex-col justify-between h-[60vh] lg:h-[65vh] pt-5 lg:pt-12 lg:px-0"}>
      <div className={`flex-none lg:flex`}>
        {/* Profile Pic */}
        <div className={`mx-auto w-full lg:w-[35%]`}>
          <div className={`mx-auto w-[65%] min-[540px]:w-[60%] sm:w-[55%] md:w-[40%] min-[920px]:w-[35%] lg:w-[85%]`}>
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
              className={`mx-auto border-8 border-slate-300 rounded-full`}
            />
          </div>
        </div>

        {/* About Me */}
        <div className={`mx-auto w-full lg:w-[70%] pt-3 lg:pt-0 lg:pl-2`}>
          <p
            className={`base-heading underline decoration-[2px] sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[12px] text-4xl sm:text-6xl`}
          >
            Hi, I'm Rushil
          </p>
          <p className={`pt-3 lg:pt-8 font-extralight lg:font-[125] text-[18px] lg:text-[22px] text-center lg:text-left px-0 lg:px-4`}>
            Hi, I'm Rushil Gupta, a 1st year Computer Science student. I'm currently researching on algorithmic trading.
          </p>
        </div>
      </div>

      {/* Socials */}
      <div className={"flex gap-x-4 items-center justify-center pt-4 sm:pt-8 pb-2"}>
        <SocialIcon target='_blank' url={"https://github.com/Ruzil357"} bgColor={"#01040D"} />
        <SocialIcon target='_blank' url={"https://linkedin.com/in/rushilgupta4"} bgColor={"#0a66c2"} />
        <SocialIcon network={"email"} url={"mailto:rushilgupta4@gmail.com"} bgColor={"#d53833"} />
        <Link href={"/blogs"}>
          <ImBlogger2 href={"/blogs"} className={"rounded-full border-[8px] border-black"} size={50} />
        </Link>
      </div>
    </div>
  );
}

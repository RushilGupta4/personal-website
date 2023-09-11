import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { ImBlogger2 } from "react-icons/im";

export default function Home() {
  return (
    <div className={"flex flex-col justify-between h-[60vh] lg:h-[65vh] pt-4 lg:pt-12"}>
      <div className={`flex-none lg:flex`}>
        {/* Profile Pic */}
        <div className={`mx-auto w-full lg:w-[35%]`}>
          <div className={`mx-auto w-[60%] min-[540px]:w-[55%] sm:w-[45%] md:w-[40%] min-[920px]:w-[35%] lg:w-[85%]`}>
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
        <div className={`mx-auto w-full lg:w-[70%] pt-1 lg:pt-0 lg:my-auto lg:pb-8 lg:pl-8`}>
          <p
            className={`base-heading underline decoration-[2px] sm:decoration-[3px] underline-offset-[8px] sm:underline-offset-[12px] text-4xl sm:text-6xl`}
          >
            Hi, I'm Rushil
          </p>
          <div
            className={`pt-3 sm:pt-4 md:pt-5 lg:pt-8 font-light lg:font-[225] text-[17px] md:text-[20px] lg:text-[22px] text-center lg:text-left px-0 lg:px-4`}
          >
            <p>I'm a 1st year Computer Science student, currently researching on algorithmic trading.</p>
            <p className={`pt-3 md:pt-6`}>Current coding in:</p>
            <ul className='list-disc pl-0 lg:pl-4 text-[15px] md:text-[18px] lg:text-[20px] font-extralight lg:font-[150] flex flex-col items-center lg:items-start'>
              <li>Python</li>
              <li>JavaScript</li>
            </ul>
          </div>
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

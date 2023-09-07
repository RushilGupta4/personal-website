import Image from 'next/image'

export default function Home() {
  return (
    <div className={`flex-none lg:flex pt-8 lg:px-0`}>
      <div className={`mx-auto w-full lg:w-1/3`}>
        <Image 
        src='/profile_pic.png' 
        width={275} 
        height={275} 
        alt="Picture of me" 
        className={`mx-auto`}
        />
      </div>
      <div className={`mx-auto w-full lg:w-2/3 pt-4 sm:pt-8 md:pt-10 lg:pt-0 lg:pl-1`}>
        <p className={`text-gray-600 font-bold text-center underline decoration-[3px] underline-offset-[10px] text-4xl sm:text-6xl sm:underline-offset-[20px]`}>
          Hi, I'm Rushil
        </p>
        <p className={`pt-12 font-extralight text-xl lg:text-[22px] lg:font-[125] px-0 lg:px-4`}>
          I'm a student developer at Ashoka University, set to graduate in 2023.
          
        </p>
      </div>
    </div>
  )
}

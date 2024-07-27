import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

const ProjectPreview = ({ data }: { data: any }): React.ReactNode => {
  const animation = `transition-all scale-100 hover:scale-[1.01] duration-200 shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_9px_3px_rgba(0,0,0,0.15)]`;

  return (
    <div
      className={`bg-white bg-opacity-[0.1] m-auto flex flex-col justify-between border border-slate-300 text-left rounded-lg h-full ${animation}`}
    >
      <div>
        <Image
          src={data.image}
          alt={data.imageAlt}
          sizes={'100vw'}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          className={`mx-auto rounded-t-lg border-[0.5px]`}
          placeholder="blur"
          priority
        />
        <div className={`p-4 mb-4`}>
          <h2 className={`mb-2 text-xl md:text-2xl 2xl:text-3xl text-slate-200 font-bold leading-tight`}>{data.name}</h2>
          <p className={`text-slate-300 text-base md:text-lg 2xl:text-xl font-normal`}>{data.description}</p>
        </div>
      </div>
      <SocialIcon
        url={data.link}
        target={'_blank'}
        bgColor="#1C2128"
        className={`project py-1 rounded-b-md !w-full text-center mx-auto bg-[#1C2128]`}
      />
    </div>
  );
};

export default ProjectPreview;

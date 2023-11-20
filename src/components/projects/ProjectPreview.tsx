import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

const ProjectPreview = ({ data }: { data: any }): React.ReactNode => {
  const animation = `transition-all scale-100 hover:scale-[1.01] duration-200 shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_9px_3px_rgba(0,0,0,0.15)]`;

  return (
    <div className={`m-auto flex flex-col justify-between border border-slate-300 text-left rounded-md h-full ${animation}`}>
      <div className={`p-4 lg:p-5`}>
        <Image
          src={data.image}
          alt={data.imageAlt}
          sizes={'100vw'}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          className={`mx-auto rounded border-[0.5px]`}
        />
        <h2 className={`mt-6 mb-4 text-[21px] md:text-[23px] lg:text-[25px] text-slate-800 font-bold leading-tight`}>{data.name}</h2>
        <p className={`text-slate-500 text-[16px] md:text-[18px] font-normal`}>{data.description}</p>
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

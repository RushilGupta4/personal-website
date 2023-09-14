import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";

const t =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius eros quis justo consequat mattis. Vivamus eget metus aliquet, venenatis neque a, convallis mi. Praesent facilisis nibh diam, sed elementum diam sodales a. Nam in justo non velit fringilla eleifend sit amet a elit. Aliquam vitae cursus diam, quis porta turpis. Nullam gravida metus id quam consectetur, consectetur cursus dolor semper. Donec pretium sem eget porta laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta est sapien, at elementum ligula aliquet in. Proin sodales nulla eu luctus scelerisque. Donec accumsan velit at ante mollis mollis.";
const blogs = [
  {
    title: "How to make a blog",
    body: t,
    link: "/",
    date: "12th October, 2021",
    img: "/profile_pic.png",
    imgDesc: "This is a description of the image",
  },
  {
    title: "My Second Blog",
    body: t,
    link: "/",
    date: "20th October, 2021",
    img: "/profile_pic.png",
    imgDesc: "This is a description of the image",
  },
  {
    title: "Where I've Been",
    body: t,
    link: "/",
    date: "30th September, 2021",
    img: "/profile_pic.png",
    imgDesc: "This is a description of the image",
  },
];

blogs.reverse();

const BlogPreview = ({
  data,
}: {
  data: { title: string; body: string; link: string; date: string; img: string; imgDesc: string };
}): React.ReactNode => {
  return (
    <div className={`mx-auto w-full sm:w-4/5 px-4 lg:px-8 py-4 border-t-[3px] lg:border-t-[4px] border-[#222d49] flex flex-col lg:flex-row`}>
      <div className={`mx-auto w-2/3 lg:w-1/4 rounded-lg border border-black`}>
        <Image
          src={data.img}
          alt={data.imgDesc}
          sizes='100vw'
          width={1}
          height={1}
          style={{
            width: "100%",
            height: "auto",
          }}
          quality={100}
        />
      </div>
      <div className={`flex flex-col justify-between pt-1 lg:pt-0 px-1 lg:px-4 w-full lg:w-3/4`}>
        <div>
          <p className={`text-[20px] md:text-[24px] font-bold`}>{data.title}</p>
          <div className='flex items-center gap-x-1'>
            <AiOutlineClockCircle />
            <p className={`text-sm md:text-base text-gray-600 font-light pl-[1px]`}>{data.date}</p>
          </div>
          <p className={`text-[16px] md:text-[18px] font-light pt-3 line-clamp-3`}>{data.body}</p>
        </div>
        <Link target={"_blank"} href={data.link} className={"rounded-md p-3 bg-blue-500 text-white font-bold w-max"}>
          Read More
        </Link>
      </div>
    </div>
  );
};

const BlogsPage = () => {
  return (
    <div className={"flex flex-col justify-center bg-white h-[60vh] w-full"}>
      <p className='base-heading text-5xl md:text-6xl lg:text-7xl'>WORK IN PROGRESS</p>
    </div>
    // <div id='blogs' className={"pt-4 mb-20 lg:pt-12 lg:px-0"}>
    //   <p className={`base-heading text-[40px] sm:text-[54px]`}>Blogs</p>
    //   <div className={`flex flex-col pt-2 lg:pt-4 gap-4 justify-center items-stretch`}>
    //     {blogs.map((blogData) => (
    //       <BlogPreview key={blogData.link} data={blogData} />
    //     ))}
    //   </div>
    // </div>
  );
};

export default BlogsPage;

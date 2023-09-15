import Image from "next/image";
import Link from "next/link";

const t =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius eros quis justo consequat mattis. Vivamus eget metus aliquet, venenatis neque a, convallis mi. Praesent facilisis nibh diam, sed elementum diam sodales a. Nam in justo non velit fringilla eleifend sit amet a elit. Aliquam vitae cursus diam, quis porta turpis. Nullam gravida metus id quam consectetur, consectetur cursus dolor semper. Donec pretium sem eget porta laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta est sapien, at elementum ligula aliquet in. Proin sodales nulla eu luctus scelerisque. Donec accumsan velit at ante mollis mollis.";
const blogs = [
  {
    title: "My Third Blog",
    body: t,
    link: "/",
    date: "30th September, 2021",
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
    title: "How to make a blog",
    body: t,
    link: "/",
    date: "12th October, 2021",
    img: "/profile_pic.png",
    imgDesc: "This is a description of the image",
  },
];

const env = process.env.NODE_ENV;

const BlogPreview = ({
  data,
}: {
  data: { title: string; body: string; link: string; date: string; img: string; imgDesc: string };
}): React.ReactNode => {
  return (
    <Link href={data.link}>
      <div className={`h-full mx-auto rounded-md border-[#182239] border-[2px] lg:border-[3px]`}>
        <div className={`mx-auto rounded-t-[inherit] w-full border-b-[2px] border-inherit`}>
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
            className={`rounded-t-[inherit]`}
          />
        </div>
        <div className={`flex flex-col justify-between text-center my-auto py-2 px-2 lg:px-4`}>
          <div>
            <p className={`text-[20px] md:text-[22px] font-bold leading-none`}>{data.title}</p>
            <p className={`text-sm md:text-base text-gray-500 font-light`}>{data.date}</p>
          </div>
          <p className={`text-[16px] md:text-[18px] font-light pt-[10px] line-clamp-3`}>{data.body}</p>
        </div>
      </div>
    </Link>
  );
};

const BlogsPage = () => {
  if (env == "production") {
    return (
      <div className={"flex flex-col justify-center bg-white h-[60vh] w-full"}>
        <p className='base-heading text-5xl md:text-6xl lg:text-7xl'>WORK IN PROGRESS</p>
      </div>
    );
  }
  return (
    <div id='blogs'>
      {/* <p className={`base-heading text-[40px] sm:text-[54px]`}>Blogs</p> */}
      <div
        className={`gap-4 md:gap-6 lg:gap-10 mx-auto justify-center items-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[70%] min-[400px]:w-[65%] min-[500px]:w-[60%] sm:w-[85%] md:w-[95%] min-[800px]:w-[80%] min-[900px]:w-[75%] lg:w-[85%] min-[1280px]:w-[70%]`}
      >
        {blogs.map((blogData) => (
          <BlogPreview key={blogData.link} data={blogData} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;

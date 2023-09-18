'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import BlogPreview from '@/components/blogs/BlogPreview';

const ShowBlogs = ({ blogsMetaData }: { blogsMetaData: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogsMetaData);

  return (
    <div>
      <SearchBar
        className={`mt-4 mb-8 md:mt-4 md:mb-10 mx-auto`}
        searchQuery={searchQuery}
        onChange={(val: string) => {
          setSearchQuery(val);
          setFilteredBlogs(blogsMetaData.filter((blog: any) => blog.title.toLowerCase().includes(val.toLowerCase())));
        }}
      />
      {blogsMetaData.length <= 0 ? (
        <div className={'flex flex-col justify-center bg-white pt-5 pb-2 w-full'}>
          <p className="base-heading text-3xl md:text-4xl lg:text-5xl">BLOGS COMING SOON :&#41;</p>
        </div>
      ) : (
        <div className={`flex flex-col gap-4 sm:gap-3 md:gap-1 mx-auto justify-center items-stretch`}>
          {filteredBlogs.map((blog: any) => (
            <BlogPreview key={blog.title} data={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowBlogs;

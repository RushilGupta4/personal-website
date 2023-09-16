'use client';

import { useState } from 'react';
import BlogPreview from './BlogPreview';
import SearchBar from '@/components/SearchBar';

const ShowBlogs = ({ blogsMetaData }: { blogsMetaData: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogsMetaData);

  if (filteredBlogs.length == 0) {
    return (
      <div className={'flex flex-col justify-center bg-white py-10 w-full'}>
        <p className="base-heading text-4xl md:text-5xl lg:text-6xl">COMING SOON :&#41;</p>
      </div>
    );
  }

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
      <div className={`flex flex-col gap-4 sm:gap-3 md:gap-1 mx-auto justify-center items-stretch`}>
        {filteredBlogs.map((blog: any) => (
          <BlogPreview key={blog.title} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default ShowBlogs;

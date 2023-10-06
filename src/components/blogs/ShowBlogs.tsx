'use client';

import React from 'react';
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
      <div className={`flex flex-col sm:gap-4 md:gap-4 mx-auto justify-center items-stretch`}>
        {filteredBlogs.map((blog: any, index: number) => (
          <BlogPreview key={blog.title} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default ShowBlogs;

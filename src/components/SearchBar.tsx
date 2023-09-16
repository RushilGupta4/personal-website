'use client';

const SearchBar = ({ className, searchQuery, onChange }: { className: string; searchQuery: string; onChange: Function }) => {
  return (
    <div className={`mt-4 mb-8 md:mt-4 md:mb-10 mx-auto`}>
      <input
        type="search"
        className="block w-full p-4 md:py-3 text-sm md:text-base text-gray-900 border border-gray-400 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

'use client';

interface SearchBarProps {
  searchQuery: string;
  onChange: (value: string) => void;
  name: string;
}

const SearchBar = ({ searchQuery, onChange, name }: SearchBarProps): JSX.Element => {
  return (
    <div className="mb-8 md:mb-10 mx-auto">
      <input
        type="search"
        className="block mx-auto max-w-none md:max-w-[55vw] w-full p-4 md:py-3 text-sm md:text-base text-gray-900 border border-gray-400 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Search ${name.toLowerCase()}...`}
        value={searchQuery}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

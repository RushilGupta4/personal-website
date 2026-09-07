'use client';

interface SearchBarProps {
  searchQuery: string;
  onChange: (value: string) => void;
  name: string;
}

const SearchBar = ({ searchQuery, onChange, name }: SearchBarProps): React.JSX.Element => {
  return (
    <div className="mb-8 md:mb-10 mx-auto">
      <input
        type="search"
        className="block mx-auto max-w-none md:max-w-[55vw] w-full p-4 md:py-3 text-sm md:text-base text-input-text border border-input-border rounded-md bg-input-bg focus:ring-accent-500 focus:border-accent-500"
        placeholder={`Search ${name.toLowerCase()}...`}
        value={searchQuery}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

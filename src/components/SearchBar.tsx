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
        aria-label={`Search ${name.toLowerCase()}`}
        className="block w-full px-4 py-3 text-sm md:text-base text-input-text placeholder:text-text-secondary/70 border border-input-border rounded-md bg-input-bg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500"
        placeholder={`Search ${name.toLowerCase()}...`}
        value={searchQuery}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

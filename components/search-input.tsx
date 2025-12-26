'use client';

import { MdSearch } from 'react-icons/md';

export function SearchInput({
  searchTerm,
  onSearchTermChange,
}: {
  searchTerm: string;
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500 dark:text-gray-400">
        <MdSearch className="h-5 w-5" />
      </div>
      <input
        type="search"
        placeholder="Search projects"
        value={searchTerm}
        onChange={onSearchTermChange}
        className="block w-full rounded-full border border-border-color bg-[var(--bg)] px-5 py-3 pl-12 text-sm text-content-text shadow-custom focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:placeholder-gray-500"
      />
    </div>
  );
}

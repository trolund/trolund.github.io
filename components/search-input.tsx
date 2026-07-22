'use client';

import { MdSearch } from 'react-icons/md';

export function SearchInput({
  searchTerm,
  onSearchTermChange,
}: {
  searchTerm: string;
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputId = 'project-search';

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor={inputId}>
        Search projects
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500 dark:text-gray-400">
        <MdSearch className="h-5 w-5" />
      </div>
      <input
        id={inputId}
        name="project-search"
        autoComplete="off"
        spellCheck={false}
        type="search"
        placeholder="Search projects…"
        value={searchTerm}
        onChange={onSearchTermChange}
        className="border-border-color text-content-text shadow-custom block w-full rounded-full border bg-(--bg) px-5 py-3 pl-12 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-hidden dark:placeholder-gray-500"
      />
    </div>
  );
}

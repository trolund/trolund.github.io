"use client";

import { MdSearch } from 'react-icons/md';

export function SearchInput({ searchTerm, onSearchTermChange }: {
    searchTerm: string;
    onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="relative w-full p-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 dark:text-gray-400">
                <MdSearch className="h-5 w-5" />
            </div>
            <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={onSearchTermChange}
                className="dark:border-gray-700 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
    );
}

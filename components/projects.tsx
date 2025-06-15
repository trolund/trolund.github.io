'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { BlogPost } from '../types/blogPost';
import ProjectItem from './project-item';
import { MdSearch, MdArrowDownward } from 'react-icons/md';
import { useDebouncedTransitionValue } from '../hooks/useDebouncedTransitionValue';
import { useLazyScroll } from '../hooks/useLazyScroll';
import { cn } from '../lib/utils';

interface ProjectsViewProps {
  posts: BlogPost[];
}

export default function ProjectsView({ posts }: ProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const debouncedSearchTerm = useDebouncedTransitionValue(searchTerm, 300);

  const filteredPosts = useMemo(() => {
    const term = debouncedSearchTerm.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt?.toLowerCase().includes(term) ||
        post.technologies?.some((tech) => tech.toLowerCase().includes(term)),
    );
  }, [debouncedSearchTerm, posts]);

  // Lazy load posts
  const visiblePosts = useMemo(() => {
    const start = 0;
    const end = Math.min(visibleCount, filteredPosts.length);
    return filteredPosts.slice(start, end);
  }, [visibleCount, filteredPosts]);

  const loadMore = () => setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length));

  const [scrollProgress, isLoading] = useLazyScroll(loadMore, filteredPosts.length, visibleCount);

  const shouldShowScrollLabel = useMemo(
    () => scrollProgress > 0 && visibleCount < filteredPosts.length,
    [filteredPosts.length, scrollProgress, visibleCount],
  );

  const onSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setVisibleCount(6);
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative w-full p-2">
          <div className="dark:text-gray-400 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500">
            <MdSearch className="h-5 w-5" />
          </div>
          <input
            onChange={onSearchTermChange}
            value={searchTerm}
            type="search"
            placeholder="Search"
            className="dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visiblePosts.map((post) => (
            <ProjectItem
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              technologies={post.technologies}
              content={''}
              language={post.language}
            />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-2 text-center">
              <p className="dark:text-gray-400 text-gray-500">🤬 No items found.</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            `col-span-2 flex items-center justify-center transition-opacity duration-300`,
            shouldShowScrollLabel ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="mb-10 flex flex-col items-center justify-center gap-4">
            <button
              className="dark:bg-slate-200 dark:text-slate-900 hover:dark:bg-slate-200 inline-flex items-center justify-center rounded-full bg-slate-600 px-5 py-2 font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-slate-600"
              onClick={loadMore}
            >
              Load more
            </button>
            <div className="dark:text-gray-400 ml-2 text-sm text-gray-500">
              {isLoading ? 'Loading more...' : 'Scroll to load more'}
            </div>
            <div className="animate-ping">
              <MdArrowDownward className="dark:text-gray-400 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

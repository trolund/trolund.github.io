import { useEffect, useMemo, useState } from 'react';
import { BlogPost } from '../types/blogPost';
import ProjectItem from './project-item';
import { MdSearch } from 'react-icons/md';
import { useDebouncedTransitionValue } from '../hooks/useDebouncedTransitionValue';
import { useLazyScroll } from '../hooks/useLazyScroll';
import { cn } from '../lib/utils';
import { MdArrowDownward } from 'react-icons/md';

interface ProjectsViewProps {
  posts: BlogPost[];
  className?: string;
}

export default function ProjectsView({ posts, className }: ProjectsViewProps) {
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

  // Reset visible count when search term changes
  useEffect(() => {
    setVisibleCount(6);
  }, [debouncedSearchTerm]);

  const loadMore = () => setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length));

  const [scrollProgress, isLoading] = useLazyScroll(loadMore, [filteredPosts.length]);

  const shouldShowScollLabel = () => scrollProgress > 0 && visibleCount < filteredPosts.length;

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative w-full p-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500 dark:text-gray-400">
            <MdSearch className="h-5 w-5" />
          </div>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="search"
            placeholder="Search"
            className="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
              className={className}
            />
          ))}
          {filteredPosts.length === 0 && (
            <div className="col-span-2 text-center">
              <p className="text-gray-500 dark:text-gray-400">🤬 No items found.</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            `col-span-2 flex items-center justify-center transition-opacity duration-300`,
            shouldShowScollLabel() ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="flex flex-col items-center gap-4 justify-center mb-10">
            <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Loading more...' : 'Scroll to load more'}
            </div>
            <div className="animate-ping"><MdArrowDownward className='text-gray-500 dark:text-gray-400' /></div>
            <button
              className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-slate-600 hover:bg-slate-600 dark:bg-slate-200 hover:dark:bg-slate-200 text-white dark:text-slate-900 font-semibold transition-transform duration-200 hover:scale-105 shadow-md"
              onClick={loadMore}
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

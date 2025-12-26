'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { BlogPost } from '../types/blogPost';
import ProjectItem from './project-item';
import { MdArrowDownward } from 'react-icons/md';
import { useDebouncedTransitionValue } from '../hooks/useDebouncedTransitionValue';
import { useLazyScroll } from '../hooks/useLazyScroll';
import { cn } from '../lib/utils';
import { SearchInput } from './search-input';

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
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="w-full max-w-3xl">
          <SearchInput searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />
        </div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
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
            <div className="col-span-full text-center">
              <p className="text-gray-500 dark:text-gray-400">No projects match that search.</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            `col-span-full flex items-center justify-center transition-opacity duration-300`,
            shouldShowScrollLabel ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="mb-12 flex flex-col items-center justify-center gap-4">
            <button
              className="inline-flex items-center justify-center rounded-full border border-border-color bg-[var(--bg)] px-6 py-2 text-sm font-semibold text-content-text shadow-custom transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-custom-low"
              onClick={loadMore}
            >
              Load more projects
            </button>
            <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Loading more...' : 'Scroll to load more'}
            </div>
            <div className="animate-ping">
              <MdArrowDownward className="text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

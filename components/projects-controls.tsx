'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { MdArrowDownward } from 'react-icons/md';
import { useDebouncedTransitionValue } from '../hooks/useDebouncedTransitionValue';
import { useLazyScroll } from '../hooks/useLazyScroll';
import { cn } from '../lib/utils';
import { SearchInput } from './search-input';
import {
  INITIAL_VISIBLE_PROJECTS,
  PROJECTS_EMPTY_STATE_ID,
  PROJECTS_GRID_ID,
} from './projects-constants';

interface ProjectsControlsProps {
  searchIndex: string[];
}

const getProjectCards = (): HTMLElement[] => {
  const grid = document.getElementById(PROJECTS_GRID_ID);
  if (!grid) return [];

  return Array.from(grid.querySelectorAll<HTMLElement>('[data-project-card]'));
};

const getSearchableText = (card: HTMLElement): string => {
  return card.dataset.searchContent ?? '';
};

export default function ProjectsControls({ searchIndex }: ProjectsControlsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PROJECTS);
  const debouncedSearchTerm = useDebouncedTransitionValue(searchTerm, 300);
  const matchedIndexes = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();

    return searchIndex.reduce<number[]>((matches, entry, index) => {
      if (entry.includes(term)) {
        matches.push(index);
      }

      return matches;
    }, []);
  }, [debouncedSearchTerm, searchIndex]);
  const matchedCount = matchedIndexes.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_VISIBLE_PROJECTS, matchedCount));
  };

  const [scrollProgress, isLoading] = useLazyScroll(loadMore, matchedCount, visibleCount);

  useEffect(() => {
    const cards = getProjectCards();
    const visibleIndexes = new Set(matchedIndexes.slice(0, visibleCount));

    cards.forEach((card, index) => {
      card.hidden = !visibleIndexes.has(index);
    });

    const emptyState = document.getElementById(PROJECTS_EMPTY_STATE_ID);
    if (emptyState) {
      emptyState.hidden = matchedCount !== 0;
    }
  }, [matchedCount, matchedIndexes, visibleCount]);

  const shouldShowScrollLabel = scrollProgress > 0 && visibleCount < matchedCount;
  const canLoadMore = visibleCount < matchedCount;

  const onSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setVisibleCount(INITIAL_VISIBLE_PROJECTS);
  };

  return (
    <>
      <div className="w-full max-w-3xl">
        <SearchInput searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />
      </div>
      <div
        className={cn(
          'col-span-full flex items-center justify-center transition-opacity duration-300',
          shouldShowScrollLabel ? 'opacity-100' : 'hidden',
        )}
      >
        <div className="mb-12 flex flex-col items-center justify-center gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border-color bg-(--bg) px-6 py-2 text-sm font-semibold text-content-text shadow-custom transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-custom-low disabled:pointer-events-none disabled:opacity-0"
            onClick={loadMore}
            disabled={!canLoadMore}
          >
            Load more projects
          </button>
          <div
            aria-live="polite"
            className={cn(
              'ml-2 text-sm text-gray-500 dark:text-gray-400',
              canLoadMore ? 'opacity-100' : 'opacity-0',
            )}
          >
            {isLoading ? 'Loading more…' : 'Scroll to load more'}
          </div>
          <div className={cn('animate-ping', canLoadMore ? 'opacity-100' : 'opacity-0')}>
            <MdArrowDownward className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
}

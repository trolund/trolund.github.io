'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState, type CSSProperties } from 'react';
import Card from './card';
import { cn } from '@/lib/utils';
import styles from './timeline.module.css';

type TimelineCategory = 'experience' | 'education';

type TimelineLogo = {
  light: string;
  dark?: string;
  width: number;
  height: number;
  borderRadius?: number;
};

export type TimelineItem = {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  category: TimelineCategory;
  logo?: TimelineLogo;
};

interface TimelineProps {
  items: TimelineItem[];
}

const categoryLabel: Record<TimelineCategory, string> = {
  experience: 'Experience',
  education: 'Education',
};

const categoryAccent: Record<TimelineCategory, string> = {
  experience: 'bg-timeline-exp dark:bg-timeline-exp',
  education: 'bg-timeline-edu dark:bg-timeline-edu',
};

const categoryRingClass: Record<TimelineCategory, string> = {
  experience: 'ring-timeline-exp-ring dark:ring-timeline-exp-ring-dark',
  education: 'ring-timeline-edu-ring dark:ring-timeline-edu-ring-dark',
};

const categoryPulseTone: Record<TimelineCategory, string> = {
  experience: 'text-timeline-exp-ring dark:text-timeline-exp-ring-dark',
  education: 'text-timeline-edu-ring dark:text-timeline-edu-ring-dark',
};

export default function Timeline({ items }: TimelineProps) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => items.map(() => false));
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const next = [...prev];
          let hasChanges = false;

          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            const indexAttribute = target.dataset.index;
            if (indexAttribute == null) return;

            const index = Number(indexAttribute);
            if (Number.isNaN(index)) return;

            if (next[index] !== entry.isIntersecting) {
              next[index] = entry.isIntersecting;
              hasChanges = true;
            }
          });

          return hasChanges ? next : prev;
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-15% 0px -10% 0px',
      },
    );

    itemRefs.current = itemRefs.current.slice(0, items.length);

    itemRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [items]);

  const timelineElements: ReactNode[] = [];

  items.forEach((item, index) => {
    const showDivider = index > 0 && items[index - 1].category !== item.category;

    if (showDivider) {
      timelineElements.push(
        <li
          key={`divider-${item.category}-${index}`}
          className={cn(styles.categoryDividerItem, 'text-neutral-500 dark:text-neutral-400')}
          aria-hidden="true"
        >
          <div className={styles.categoryDivider}>
            <span>{categoryLabel[item.category]}</span>
          </div>
        </li>,
      );
    }

    timelineElements.push(
      <li
        key={`${item.title}-${item.period}`}
        className={styles.timelineItem}
        data-index={index}
        style={{ '--index': index } as CSSProperties}
        ref={(node) => {
          itemRefs.current[index] = node;
        }}
      >
        <div className={styles.marker}>
          <span
            className={cn(
              styles.markerDot,
              categoryAccent[item.category],
              categoryPulseTone[item.category],
              visibleItems[index] ? styles.markerDotActive : styles.markerDotInactive,
              visibleItems[index] &&
                'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900',
              visibleItems[index] && categoryRingClass[item.category],
            )}
          />
        </div>
        <Card
          className={cn(
            styles.card,
            'px-4 py-4 transition-transform duration-200 ease-out hover:-translate-y-0.5',
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
            {categoryLabel[item.category]}
          </p>
          <div className="mt-2 flex items-start gap-3">
            {item.logo && (
              <div
                className={styles.logo}
                style={{ borderRadius: `${item.logo.borderRadius ?? 12}px` }}
                aria-hidden="true"
              >
                {item.logo.dark ? (
                  <>
                    <Image
                      src={item.logo.light}
                      alt=""
                      width={item.logo.width}
                      height={item.logo.height}
                      className="block dark:hidden"
                    />
                    <Image
                      src={item.logo.dark}
                      alt=""
                      width={item.logo.width}
                      height={item.logo.height}
                      className="hidden dark:block"
                    />
                  </>
                ) : (
                  <Image
                    src={item.logo.light}
                    alt=""
                    width={item.logo.width}
                    height={item.logo.height}
                  />
                )}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                {item.subtitle}
              </p>
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {item.period}
          </p>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {item.description}
            </p>
          )}
        </Card>
      </li>,
    );
  });

  return <ol className={styles.timeline}>{timelineElements}</ol>;
}

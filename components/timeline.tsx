'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
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

export type TimelineItemProps = {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  category: TimelineCategory;
  logo?: TimelineLogo;
};

type TimelineDividerProps = {
  label: string;
};

type TimelineProps = {
  children: ReactNode;
};

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

export default function Timeline({ children }: TimelineProps) {
  return <ol className={styles.timeline}>{children}</ol>;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  description,
  category,
  logo,
}: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const node = itemRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== node) return;
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.35,
        rootMargin: '-15% 0px -10% 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <li ref={itemRef} className={styles.timelineItem}>
      <div className={styles.marker}>
        <span
          className={cn(
            styles.markerDot,
            categoryAccent[category],
            categoryPulseTone[category],
            isVisible ? styles.markerDotActive : styles.markerDotInactive,
            isVisible && 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900',
            isVisible && categoryRingClass[category],
          )}
        />
      </div>
      <div
        className={cn(
          styles.card,
          'group rounded-[28px] border border-border-color bg-[var(--bg)] px-6 py-6 shadow-custom transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-custom-low',
        )}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-content-text opacity-60">
          {categoryLabel[category]}
        </p>
        <div className="mt-3 flex items-start gap-4">
          {logo && (
            <div
              className={styles.logo}
              style={{ borderRadius: `${logo.borderRadius ?? 12}px` }}
              aria-hidden="true"
            >
              {logo.dark ? (
                <>
                  <Image
                    src={logo.light}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    className="block dark:hidden"
                  />
                  <Image
                    src={logo.dark}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    className="hidden dark:block"
                  />
                </>
              ) : (
                <Image src={logo.light} alt="" width={logo.width} height={logo.height} />
              )}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold tracking-tight text-content-text">{title}</h3>
            <p className="text-sm font-medium text-content-text opacity-70">{subtitle}</p>
          </div>
        </div>
        <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-content-text opacity-60">
          {period}
        </p>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-content-text opacity-75">{description}</p>
        )}
      </div>
    </li>
  );
}

export function TimelineDivider({ label }: TimelineDividerProps) {
  return (
    <li
      className={cn(styles.categoryDividerItem, 'text-neutral-500 dark:text-neutral-400')}
      aria-hidden="true"
    >
      <div className={styles.categoryDivider}>
        <span>{label}</span>
      </div>
    </li>
  );
}

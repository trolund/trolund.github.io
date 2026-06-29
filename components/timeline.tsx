'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { cn, cardClass } from '@/lib/utils';
import styles from './timeline.module.css';

type TimelineCategory = 'experience' | 'education';

type TimelineLogo = {
  light: string;
  dark?: string;
  width: number;
  height: number;
  borderRadius?: number;
};

type TimelineItemProps = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  category: TimelineCategory;
  logo?: TimelineLogo;
  detailsTable?: ReactNode;
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

export default function Timeline({ children }: TimelineProps) {
  return <ol className="m-0 flex list-none flex-col gap-4 p-0">{children}</ol>;
}

export function TimelineItem({
  id,
  title,
  subtitle,
  period,
  description,
  category,
  logo,
  detailsTable,
}: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sideClassName = cn(
    'flex flex-row items-center gap-3 py-[0.875rem] px-5',
    'sm:flex-col sm:items-start sm:justify-between sm:py-6 sm:px-5 sm:gap-0',
    'sm:col-start-1 sm:row-start-1',
    category === 'experience' ? styles.cardSideExp : styles.cardSideEdu,
  );

  const cardClassName = cn(
    'group relative overflow-hidden grid grid-cols-1 sm:grid-cols-[178px_1fr]',
    cardClass,
  );

  const side = (
    <div className={sideClassName}>
      <span className="whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.3em] text-content-text opacity-50">
        {categoryLabel[category]}
      </span>
      <span className="whitespace-nowrap text-[0.7rem] font-semibold leading-[1.5] tracking-[0.01em] text-content-text opacity-[0.85] max-sm:text-[0.6rem] max-sm:tracking-[0.02em]">
        {period}
      </span>
    </div>
  );

  const mainContent = (
    <div className="flex flex-col justify-center gap-3 p-5 sm:col-start-2 sm:row-start-1 sm:px-7 sm:py-6">
      <div className="flex items-center gap-4">
        {logo && (
          <div
            className="inline-flex shrink-0 items-center justify-center overflow-hidden bg-[rgba(15,23,42,0.05)] p-1"
            style={{ borderRadius: `${logo.borderRadius ?? 10}px` }}
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
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-semibold tracking-tight text-content-text">{title}</h3>
          <p className="text-sm text-content-text opacity-60">{subtitle}</p>
        </div>
      </div>
      {description && (
        <p className="text-sm leading-relaxed text-content-text opacity-70">{description}</p>
      )}
      {detailsTable && (
        <span className="flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-content-text opacity-40 transition-opacity duration-200 group-hover:opacity-70">
          <span>View courses</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </span>
      )}
    </div>
  );

  return (
    <li className={styles.timelineItem} style={{ viewTransitionName: `timeline-card-${id}` }}>
      {detailsTable ? (
        <div
          className={cardClassName}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded((prev) => !prev);
            }
          }}
        >
          {side}
          {mainContent}
          <div
            className={cn(
              styles.detailsPanel,
              'border-t border-border-color sm:col-span-full sm:row-start-2',
              isExpanded && styles.detailsPanelOpen,
            )}
          >
            <div className="overflow-hidden px-6 pb-6 pt-4">{detailsTable}</div>
          </div>
        </div>
      ) : (
        <div className={cardClassName}>
          {side}
          {mainContent}
        </div>
      )}
    </li>
  );
}

export function TimelineDivider({ label }: TimelineDividerProps) {
  return (
    <li className="my-2 list-none text-neutral-400 dark:text-neutral-500" aria-hidden="true">
      <div
        className={cn(
          styles.categoryDivider,
          'flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.35em]',
        )}
      >
        <span>{label}</span>
      </div>
    </li>
  );
}

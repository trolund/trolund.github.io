'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
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
  return <ol className={styles.timeline}>{children}</ol>;
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
  const [detailsHeight, setDetailsHeight] = useState(0);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!detailsTable) return;
    const node = detailsRef.current;
    if (!node) return;
    const updateHeight = () => setDetailsHeight(node.scrollHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [detailsTable, isExpanded]);

  const sideClassName = cn(
    styles.cardSide,
    category === 'experience' ? styles.cardSideExp : styles.cardSideEdu,
  );

  const cardClassName = cn(styles.card, 'group overflow-hidden', cardClass);

  const side = (
    <div className={sideClassName}>
      <span className={styles.sideCategory}>{categoryLabel[category]}</span>
      <span className={styles.sidePeriod}>{period}</span>
    </div>
  );

  const mainContent = (
    <div className={styles.cardMain}>
      <div className="flex items-center gap-4">
        {logo && (
          <div
            className={styles.logo}
            style={{ borderRadius: `${logo.borderRadius ?? 10}px` }}
            aria-hidden="true"
          >
            {logo.dark ? (
              <>
                <Image src={logo.light} alt="" width={logo.width} height={logo.height} className="block dark:hidden" />
                <Image src={logo.dark} alt="" width={logo.width} height={logo.height} className="hidden dark:block" />
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
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded((prev) => !prev); }
          }}
        >
          <div className={styles.cardBody}>
            {side}
            {mainContent}
          </div>
          <div
            className={cn(styles.detailsPanel, 'border-t border-border-color', isExpanded && styles.detailsPanelOpen)}
            style={{ maxHeight: isExpanded ? detailsHeight : 0 }}
          >
            <div ref={detailsRef} className={cn(styles.detailsInner, 'px-6 pb-6 pt-4')}>
              {detailsTable}
            </div>
          </div>
        </div>
      ) : (
        <div className={cardClassName}>
          <div className={styles.cardBody}>
            {side}
            {mainContent}
          </div>
        </div>
      )}
    </li>
  );
}

export function TimelineDivider({ label }: TimelineDividerProps) {
  return (
    <li className={cn(styles.categoryDividerItem, 'text-neutral-400 dark:text-neutral-500')} aria-hidden="true">
      <div className={styles.categoryDivider}>
        <span>{label}</span>
      </div>
    </li>
  );
}

'use client';

import { useEffect, useRef, useState, type FunctionComponent } from 'react';
import { cn } from '../lib/utils';
import styles from './card-carosel.module.css';

export type CardContent = {
  title: string;
  description: string;
  className: string;
};

interface CardCarouselProps {
  cards?: CardContent[];
}

const CardCarousel: FunctionComponent<CardCarouselProps> = ({ cards }) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const slide = scroller.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Sync active dot via scrollsnapchange (Chrome 129+) with IntersectionObserver fallback
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if ('onscrollsnapchange' in HTMLElement.prototype) {
      const handler = (e: Event) => {
        const target = (e as CustomEvent & { snapTargetInline: Element }).snapTargetInline;
        const index = Array.from(scroller.children).indexOf(target);
        if (index !== -1) setActiveIndex(index);
      };
      scroller.addEventListener('scrollsnapchange', handler);
      return () => scroller.removeEventListener('scrollsnapchange', handler);
    }

    // Fallback: IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.6) {
            const index = Array.from(scroller.children).indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      { root: scroller, threshold: 0.6 },
    );
    Array.from(scroller.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [cards]);

  if (!cards?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <ul ref={scrollerRef} className={styles.scroller} aria-label="Card carousel">
        {cards.map((card, i) => (
          <li key={i} className={styles.slide}>
            <div
              className={cn(
                'flex h-full flex-col gap-4 rounded-2xl border border-white/10 p-6 text-white shadow-xl',
                card.className,
              )}
            >
              <h2 className="text-xl font-bold">{card.title}</h2>
              <p className="text-sm">{card.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Prev / Next */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label="Previous card"
          className="rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-40"
        >
          Prev
        </button>

        {/* Dot indicators */}
        <div className={cn(styles.dots, 'text-content-text')} aria-hidden="true">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(styles.dot, i === activeIndex && styles.dotActive)}
            />
          ))}
        </div>

        <button
          onClick={() => scrollTo(Math.min(cards.length - 1, activeIndex + 1))}
          disabled={activeIndex === cards.length - 1}
          aria-label="Next card"
          className="rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;

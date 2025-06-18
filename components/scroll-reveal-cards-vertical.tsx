'use client';

import React, { useRef, useEffect, useState } from 'react';

const cardsData = [
  { id: 1, title: 'Card 1', color: 'bg-red-500' },
  { id: 2, title: 'Card 2', color: 'bg-purple-700' },
  { id: 3, title: 'Card 3', color: 'bg-green-600' },
  { id: 4, title: 'Card 4', color: 'bg-pink-300' },
  { id: 5, title: 'Card 5', color: 'bg-blue-400' },
  { id: 6, title: 'Card 6', color: 'bg-red-800' },
];

export default function CardScrollTailwind() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      setScrollX(el.scrollLeft);
    }

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Tailwind widths/gaps must match these values for the math below
  const cardWidth = 280; // px
  const cardGap = 40; // px

  return (
    <div
      ref={containerRef}
      className="scroll-snap-x mandatory no-scrollbar flex gap-[40px] overflow-x-scroll px-10 py-20"
      aria-label="Scrollable cards"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {cardsData.map((card, index) => {
        const cardCenter = index * (cardWidth + cardGap) + cardWidth / 2;
        const containerCenter = scrollX + containerWidth / 2;
        const distance = cardCenter - containerCenter;
        const maxDistance = containerWidth / 2 + cardWidth;
        const ratio = Math.max(-1, Math.min(1, distance / maxDistance));
        const rotateY = ratio * 45;
        const scale = 1 - Math.abs(ratio) * 0.15;
        const shadowOpacity = 0.3 + (1 - Math.abs(ratio)) * 0.4;

        return (
          <div
            key={card.id}
            className={`${card.color} flex h-[400px] w-[280px] flex-shrink-0 select-none items-center justify-center rounded-2xl text-xl font-bold text-white`}
            style={{
              transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
              boxShadow: `0 20px 30px rgba(0,0,0,${shadowOpacity})`,
              scrollSnapAlign: 'center',
              transition: 'box-shadow 0.3s ease',
              willChange: 'transform',
            }}
          >
            {card.title}
          </div>
        );
      })}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

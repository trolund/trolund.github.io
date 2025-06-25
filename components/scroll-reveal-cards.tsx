'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface Card {
    id: number;
    title: string;
    backgroundImage: string;
    tag: string;
    color: string; 
}

interface ScrollingCardsProps {
    cards: Card[];
    height?: string;
    cardHeight?: string;
}

const ScrollingCards: React.FC<ScrollingCardsProps> = ({
    cards,
    height = '300vh',
    cardHeight = '60vh',
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ticking = useRef(false);

    const cardStyle = {
        height: cardHeight,
        maxHeight: '600px',
        borderRadius: '20px',
        transition:
            'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
        willChange: 'transform, opacity',
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    if (!sectionRef.current) return;

                    const sectionRect = sectionRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const totalScrollDistance = viewportHeight * 2;

                    let progress = 0;
                    if (sectionRect.top <= 0) {
                        progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
                    }

                    // Calculate active card based on progress and number of cards
                    const cardThreshold = 1 / cards.length;
                    const newActiveIndex = Math.min(cards.length - 1, Math.floor(progress / cardThreshold));

                    setActiveCardIndex(newActiveIndex);
                    ticking.current = false;
                });

                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [cards.length]);

    const getCardTransform = (index: number) => {
        const isVisible = isIntersecting && activeCardIndex >= index;
        const baseTranslateY = (isVisible ? 180 - index * 15 : 200) - index * 20; // Adjust base translateY based on index
        const scale = isVisible ? 0.9 + index * 0.05 : 0.9;
        


        return `translateY(${baseTranslateY}px) scale(${scale})`;
    };

    const getCardOpacity = (index: number) => {
        return isIntersecting && activeCardIndex >= index ? 1 : 0;
    };

    const getCardZIndex = (index: number) => {
        return 10 + index;
    };

    return (
        <div ref={sectionRef} className="relative backdrop-blur-sm bg-white/50 dark:bg-slate-800/50" style={{ height }}>
            <section className="sticky top-0 h-screen w-full overflow-hidden py-10 md:py-16">
                <div className="container mx-auto flex h-full flex-col px-6 lg:px-8">
                    <div className="perspective-1000 relative flex-1">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={cn(
                                    'absolute inset-0 overflow-hidden shadow-xl',
                                    card.color,
                                    activeCardIndex >= index ? 'animate-card-enter' : '',
                                )}
                                style={{
                                    ...cardStyle,
                                    zIndex: getCardZIndex(index),
                                    transform: getCardTransform(index),
                                    opacity: getCardOpacity(index),
                                    pointerEvents: activeCardIndex >= index ? 'auto' : 'none',
                                }}
                            >
                                <div className="from-pulse-900/40 to-dark-900/80 absolute inset-0 z-0 bg-gradient-to-b" />

                                <div className="absolute right-4 top-4 z-20">
                                    <div className="inline-flex items-center justify-center rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
                                        <span className="text-sm font-medium">{card.tag}</span>
                                    </div>
                                </div>

                                <div className="relative z-10 flex h-full items-center p-5 sm:p-6 md:p-8">
                                    <div className="max-w-lg">
                                        <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                                            {card.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Example usage:
export const ExampleScrollingCards = () => {
  const cards = [
    {
      id: 1,
      title: "Bringing code to life in the physical world",
      backgroundImage: "/background-section1.png",
      tag: "The Vision",
      color: "from-[#1a103d] via-[#7d1c28] to-[#ff6a00]",
    },
    {
      id: 2,
      title: "Engineering adaptive systems that support human creativity",
      backgroundImage: "/background-section2.png",
      tag: "The Mission",
      color: "bg-gradient bg-cover bg-center",
    },
    {
      id: 3,
      title: "Building software that feels like a companion, not a tool",
      backgroundImage: "/background-section3.png",
      tag: "The Philosophy",
      // color: "from-[#3b0764] via-[#9333ea] to-[#e879f9]",
      color: "from-slate-800 via-pink-700 to-[#e879f9]",
    },
  ];

  return <ScrollingCards cards={cards} />;
};

export default ScrollingCards;

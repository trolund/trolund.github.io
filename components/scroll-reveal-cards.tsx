'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface Card {
    id: number;
    title: string;
    backgroundImage: string;
    tag: string;
    color: string; // Tailwind color class for the card
}

interface ScrollingCardsProps {
    cards: Card[];
    height?: string;
    cardHeight?: string;
}

const ScrollingCards: React.FC<ScrollingCardsProps> = ({
    cards,
    height = "300vh",
    cardHeight = "60vh"
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ticking = useRef(false);

    const cardStyle = {
        height: cardHeight,
        maxHeight: '600px',
        borderRadius: '20px',
        transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
        willChange: 'transform, opacity'
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.1 }
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
                    const newActiveIndex = Math.min(
                        cards.length - 1,
                        Math.floor(progress / cardThreshold)
                    );

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
        const baseTranslateY = isVisible ? 90 - (index * 15) : 200;
        const scale = isVisible ? 0.9 + (index * 0.05) : 0.9;

        return `translateY(${baseTranslateY}px) scale(${scale})`;
    };

    const getCardOpacity = (index: number) => {
        return isIntersecting && activeCardIndex >= index ? 1 : 0;
    };

    const getCardZIndex = (index: number) => {
        return 10 + index;
    };

    return (
        <div
            ref={sectionRef}
            className="relative"
            style={{ height }}
        >
            <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden">
                <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
                    <div className="relative flex-1 perspective-1000">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className={cn("absolute inset-0 overflow-hidden shadow-xl", card.color, activeCardIndex >= index ? 'animate-card-enter' : ''
                                )}
                                style={{
                                    ...cardStyle,
                                    zIndex: getCardZIndex(index),
                                    transform: getCardTransform(index),
                                    opacity: getCardOpacity(index),
                                    pointerEvents: activeCardIndex >= index ? 'auto' : 'none'
                                }}
                            >
                                <div
                                    className="absolute inset-0 z-0 bg-gradient-to-b from-pulse-900/40 to-dark-900/80"
                                />

                                <div className="absolute top-4 right-4 z-20">
                                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                                        <span className="text-sm font-medium">{card.tag}</span>
                                    </div>
                                </div>

                                <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                                    <div className="max-w-lg">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-bold leading-tight">
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
            title: "We're giving AI a way to navigate the physical world",
            backgroundImage: "/background-section1.png",
            tag: "The vision",
            color: "bg-blue-500"
        },
        {
            id: 2,
            title: "We're bringing adaptive intelligence to where humans work",
            backgroundImage: "/background-section2.png",
            tag: "The vision",
            color: "bg-green-500"
        },
        {
            id: 3,
            title: "We're creating companions, not replacements",
            backgroundImage: "/background-section3.png",
            tag: "The vision",
            color: "bg-purple-500"
        }
    ];

    return <ScrollingCards cards={cards} />;
};

export default ScrollingCards;

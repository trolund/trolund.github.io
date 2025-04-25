import { FunctionComponent, useState } from 'react';
import { cn } from '../lib/utils';

interface CardCarouselProps {
  cards?: CardContent[];
}

export type CardContent = {
  title: string;
  description: string;
  className: string;
};

const cardContent: CardContent[] = [
  {
    title: 'Card 1 🚀',
    description: 'This is the first card with a unique gradient.',
    className: 'bg-gradient-to-r from-surface-2 to-surface-6',
  },
  {
    title: 'Card 2 ✅',
    description: 'This is the second card with a different gradient.',
    className: 'bg-gradient-to-r from-surface-2 to-surface-3',
  },
  {
    title: 'Card 3 🌟',
    description: 'This is the third card with another gradient.',
    className: 'bg-gradient-to-r from-surface-4 to-surface-5',
  },
  {
    title: 'Card 4 💡',
    description: 'This is the fourth card with yet another gradient.',
    className: 'bg-gradient-to-r from-surface-5 to-surface-6',
  },
];

const CardCarousel: FunctionComponent<CardCarouselProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % cardContent.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + cardContent.length) % cardContent.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="perspective-[1000px] relative h-[320px] w-full max-w-md">
        {cardContent.map((card, index) => (
          <div
            key={index}
            className={cn(
              'border-10 absolute inset-0 flex flex-col gap-4 rounded-2xl border-white/10 p-6 text-white shadow-xl transition-all duration-500 ease-in-out',
              card.className,
              index === activeIndex
                ? 'z-10 scale-100 opacity-100'
                : 'pointer-events-none z-0 scale-95 opacity-0',
            )}
          >
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={prev}
          className="rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="rounded-full bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;

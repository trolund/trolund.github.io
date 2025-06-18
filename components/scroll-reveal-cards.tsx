"use client";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    id: 1,
    title: "We're creating companions, not replacements",
    gradient: "from-[#1a103d] via-[#7d1c28] to-[#ff6a00]",
  },
  {
    id: 2,
    title: "Design with empathy",
    gradient: "from-[#103d1a] via-[#1c7d28] to-[#00ff6a]",
  },
  {
    id: 3,
    title: "Tech for humans",
    gradient: "from-[#3d101a] via-[#7d281c] to-[#6a00ff]",
  },
];

export default function StackScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollY = window.scrollY;
      const stickyStart = scrollY - containerTop;

      const stepHeight = 500;

      if (stickyStart > 0) {
        const newIndex = Math.min(
          cards.length - 1,
          Math.max(0, Math.floor(stickyStart / stepHeight))
        );
        setActiveIndex(newIndex);
      } else {
        setActiveIndex(0);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[300vh] bg-white">
      <div
        ref={containerRef}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        <div className="relative w-full max-w-5xl h-[60vh]">
          {cards.map((card, i) => {
            const isActive = i <= activeIndex;
            const stackPos = activeIndex - i;

            return (
              <div
                key={card.id}
                className={`
                  absolute w-full h-full rounded-3xl p-10 text-white font-semibold text-2xl shadow-xl
                  bg-gradient-to-r ${card.gradient}
                  transition-all duration-300 ease-in-out translalte-y-[-50px]
                `}
                style={{
                  transform: `translateY(${stackPos * 50}px) scale(${
                    1 - stackPos * 0.02
                  })`,
                  zIndex: isActive ? i + 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
              >
                {card.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

const RevealCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  // Use null instead of undefined here:
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Check visibility on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-50px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
        background: "white",
        padding: "20px",
        margin: "10px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
};

export default RevealCard;

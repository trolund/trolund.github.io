import Link from 'next/link';
import React from 'react';
import { cn } from '../lib/utils';

interface CardProp {
  className?: string;
  children: React.ReactNode;
  href?: URL | string;
}

const Card: React.FC<CardProp> = ({ children, href, className }: CardProp) => {
  var container = (
    <div className={cn('bg-[var(--footer)] border border-[var(--border-color)] shadow-[var(--shadow-low)] rounded-[15px] w-auto h-auto transform scale-100 transition-all duration-200 ease-in-out overflow-hidden hover:shadow-[var(--shadow)]', className)}>{children}</div>
  );

  if (href) {
    return <Link href={href}>{container}</Link>;
  }

  return container;
};

export default Card;

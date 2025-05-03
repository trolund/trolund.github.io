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
    <div
      className={cn(
        'h-auto w-auto scale-100 transform overflow-hidden rounded-[15px] border border-[var(--border-color)] bg-[var(--footer)] shadow-custom transition-all duration-200 ease-in-out hover:shadow-custom-low',
        className,
      )}
    >
      {children}
    </div>
  );

  if (href) {
    return <Link href={href}>{container}</Link>;
  }

  return container;
};

export default Card;

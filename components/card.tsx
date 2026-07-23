import Link from 'next/link';
import React from 'react';
import { cn } from '../lib/utils';

interface CardProp {
  className?: string;
  children: React.ReactNode;
  href?: URL | string;
}

const Card: React.FC<CardProp> = ({ children, href, className, ...props }: CardProp) => {
  var container = (
    <div
      className={cn(
        className,
        'border-border-color bg-footer shadow-custom hover:shadow-custom-low h-auto w-auto scale-100 transform overflow-hidden rounded-[15px] border transition-all duration-200 ease-in-out',
      )}
      {...props}
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

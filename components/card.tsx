import Link from 'next/link';
import React from 'react';
import { cn } from '../lib/utils';

interface CardProp {
  className?: String;
  children: React.ReactNode;
  href?: URL | string;
}

const Card: React.FC<CardProp> = ({ children, className, href }: CardProp) => {
  var container = (
    <div className={cn('card-low p-3 hover:border-content-text', className)}>{children}</div>
  );

  if (href) {
    return <Link href={href}>{container}</Link>;
  }

  return container;
};

export default Card;

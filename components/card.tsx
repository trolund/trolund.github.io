import Link from 'next/link';
import React from 'react';
import cn from 'classnames';

interface CardProp {
  className?: String;
  children: React.ReactNode;
  href?: URL | string;
}

const Card: React.FC<CardProp> = ({ children, className, href }: CardProp) => {
  var container = (
    <div
      className={cn('card-low m-1 p-3 hover:border-content-text sm:m-1 md:m-2 lg:m-3', className)}
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

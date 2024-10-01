import Link from 'next/link';
import React from 'react';
import cn from 'classnames';

interface CardProp {
  style?: React.CSSProperties;
  className?: String;
  children: React.ReactNode;
  href?: URL | string;
}

const Card: React.FC<CardProp> = ({ children, style, className, href }: CardProp) => {
  var container = (
    <div style={style} className={cn('card-low m-1 p-3 sm:m-1 md:m-2 lg:m-3', className)}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        {container}
      </Link>
    );
  }

  return container;
};

export default Card;

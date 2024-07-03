import Link from 'next/link';
import React from 'react';

interface CardProp {
    style?: React.CSSProperties;
    className?: String;
    children: React.ReactNode;
    href?: URL | string;
}

const Card: React.FC<CardProp> = ({ children, style, className, href }: CardProp) => {
    return (
        <Link href={href ?? ""} legacyBehavior>
                    <div style={style} className={"card-low lg:m-3 md:m-2 sm:m-1 m-1 p-3 " + className ?? ""}>
                        {children}
                    </div>
                </Link>
    );
}

export default Card;
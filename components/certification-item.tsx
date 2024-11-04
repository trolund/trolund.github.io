import Image from 'next/legacy/image';
import { CSSProperties } from 'react';
import Card from './card';

interface CertificationItemProp {
  href?: URL | string;
  title: string;
  subtitel: string;
  image?: string;
  imgCss?: CSSProperties;
}

export default function CertificationItem({
  href,
  title,
  subtitel,
  imgCss,
  image,
}: CertificationItemProp) {
  return (
    <Card
      className={`flex min-h-[230px] w-2/5 cursor-pointer flex-col p-5 hover:scale-105`}
      href={href}
    >
      <div
        style={{
          position: 'absolute',
          display: 'block',
          width: '50px',
          height: '70px',
          ...imgCss,
        }}
      >
        <Image alt="" src={image ?? ''} layout="fill" />
      </div>
      <div className="mt-auto">
        <h3 className="text-content-text">{subtitel}</h3>
        <h2 className="text-content-text">{title}</h2>
      </div>
    </Card>
  );
}

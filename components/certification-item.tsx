import Image from 'next/image';
import Card from './card';

interface CertificationItemProp {
  href?: URL | string;
  title: string;
  subTitle: string;
  image?: string;
}

export default function CertificationItem({ href, title, subTitle, image }: CertificationItemProp) {
  return (
    <Card
      className="flex w-2/5 cursor-pointer flex-col justify-between gap-6 p-5 hover:scale-105"
      href={href}
    >
      {image && (
        <div>
          <Image alt="institution" src={image} width={50} height={50} />
        </div>
      )}
      <div>
        <h3 className="text-content-text">{subTitle}</h3>
        <h2 className="text-content-text">{title}</h2>
      </div>
    </Card>
  );
}

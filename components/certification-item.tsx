import Image from 'next/image';
import Card from './card';
import localImageLoader from '../services/image-loader-service';

interface CertificationItemProp {
  href?: URL | string;
  title: string;
  subTitle: string;
  image?: string;
}

export default function CertificationItem({ href, title, subTitle, image }: CertificationItemProp) {
  return (
    <Card className="cursor-pointer justify-between p-5 hover:scale-105" href={href}>
      <div className="flex flex-col gap-6">
        {image && (
          <div>
            <Image loader={localImageLoader} alt="institution" src={image} width={50} height={50} />
          </div>
        )}
        <div>
          <h3 className="text-content-text">{subTitle}</h3>
          <h2 className="text-content-text">{title}</h2>
        </div>
      </div>
    </Card>
  );
}

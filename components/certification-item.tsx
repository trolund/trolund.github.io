import Image from 'next/image';
import LinkTransition from './link-transition';
import { cn, cardClass } from '@/lib/utils';

interface CertificationItemProps {
  href?: URL | string;
  title: string;
  subTitle: string;
  image?: string;
  label?: string;
}

export default function CertificationItem({
  href,
  title,
  subTitle,
  image,
  label = 'Credential',
}: CertificationItemProps) {
  const actionLabel =
    label.toLowerCase() === 'certification'
      ? 'View certification'
      : label.toLowerCase() === 'diploma'
        ? 'View diploma'
        : 'View credential';
  const content = (
    <>
      <div className="flex flex-col gap-6 p-7">
        <div className="text-content-text flex items-center justify-between text-[0.65rem] tracking-[0.32em] uppercase opacity-60">
          <span>{label}</span>
          {image && (
            <span className="border-border-color relative h-10 w-10 overflow-hidden rounded-full border bg-(--bg-color)">
              <Image alt="institution" src={image} fill sizes="40px" className="object-cover" />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-content-text text-base font-semibold opacity-70">{subTitle}</h3>
          <h2 className="text-content-text text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="text-content-text mt-auto flex items-center justify-between text-sm font-semibold opacity-80">
          <span>{actionLabel}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </>
  );

  const className = cn('group cursor-pointer overflow-hidden', cardClass);

  if (href) {
    const hrefString = href.toString();
    const isExternal = /^https?:\/\//i.test(hrefString);
    if (isExternal) {
      return (
        <a href={hrefString} className={className} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }
    return (
      <LinkTransition href={hrefString} className={className}>
        {content}
      </LinkTransition>
    );
  }

  return <div className={className}>{content}</div>;
}

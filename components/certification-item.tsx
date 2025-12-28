import Image from 'next/image';
import LinkTransition from './link-transition';

export interface CertificationItemProps {
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
        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-content-text opacity-60">
          <span>{label}</span>
          {image && (
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-border-color bg-[var(--bg-color)]">
              <Image alt="institution" src={image} fill sizes="40px" className="object-cover" />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-content-text opacity-70">{subTitle}</h3>
          <h2 className="text-2xl font-semibold tracking-tight text-content-text">{title}</h2>
        </div>
        <div className="mt-auto flex items-center justify-between text-sm font-semibold text-content-text opacity-80">
          <span>{actionLabel}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </>
  );

  const className =
    'group cursor-pointer overflow-hidden rounded-[28px] border border-border-color bg-[var(--bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-custom-low';

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

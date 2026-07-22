import LinkTransition from './link-transition';
import { Author, OgImage } from '../types/blogPost';
import Image from 'next/image';
import Language from '../types/languages';
import DateFormatter from './date-formatter';
import Ship from './ship';
import localImageLoader from '../services/image-loader-service';

interface ProjectItemProps {
  title: string;
  coverImage: string;
  date: Date;
  excerpt?: string;
  author: Author;
  ogImage?: OgImage;
  slug: string;
  tags?: string[];
  technologies?: string[];
  language?: Language;
  content?: string;
  isDraft?: boolean;
  className?: string;
  priority?: boolean;
}

export default function ProjectItem({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  technologies,
  language,
  priority = false,
}: ProjectItemProps) {
  const cardImageSizes =
    '(max-width: 768px) calc(100vw - 2.5rem), (max-width: 1024px) calc((100vw - 4.5rem) / 2), 305px';

  return (
    <article className="scroll-reveal group border-border-color hover:shadow-custom-low relative overflow-hidden rounded-[28px] border bg-(--bg) transition-[transform,box-shadow] duration-300 hover:-translate-y-1">
      <div className="flex h-full flex-col">
        <div
          className="relative aspect-21/9 w-full overflow-hidden rounded-t-[28px] bg-(--bg-color)"
          style={{ viewTransitionName: `cover-${slug}` }}
        >
          <Image
            src={coverImage}
            alt={`${title} - cover image`}
            fill
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
            className="object-cover transition duration-500 group-hover:scale-[1.015]"
            sizes={cardImageSizes}
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-7">
          <div className="text-content-text flex items-center justify-between text-[0.68rem] tracking-[0.35em] uppercase opacity-60">
            <DateFormatter date={date} />
            <span>
              {language === 'da' ? (
                <Image
                  loader={localImageLoader}
                  src={'/assets/flags/da.svg'}
                  height={14}
                  width={22}
                  alt="dansk"
                  className="h-auto w-[22px]"
                />
              ) : (
                <Image
                  loader={localImageLoader}
                  src={'/assets/flags/en.svg'}
                  height={14}
                  width={22}
                  alt="english"
                  className="h-auto w-[22px]"
                />
              )}
            </span>
          </div>
          <h2 className="text-content-text text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-content-text text-base leading-relaxed opacity-80">{excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {technologies &&
              technologies.map((t, i) => (
                <Ship
                  key={`${i}-${slug}`}
                  value={t}
                  showIcon={false}
                  className="border-border-color text-content-text rounded-full border bg-transparent px-3 py-1 text-[0.7rem] tracking-[0.2em] uppercase opacity-70"
                />
              ))}
          </div>
          <div className="text-content-text mt-auto flex items-center justify-between text-sm font-semibold opacity-80">
            <span>Read more</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
      <LinkTransition
        href={`/posts/${slug}`}
        aria-label={title}
        className="absolute inset-0 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:outline-hidden"
      />
    </article>
  );
}

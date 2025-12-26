import Link from 'next/link';
import { Author, OgImage } from '../types/blogPost';
import Image from 'next/image';
import Language from '../types/languages';
import DateFormatter from './date-formatter';
import Ship from './ship';
import { useState } from 'react';
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
}

export default function ProjectItem({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  technologies,
  language,
}: ProjectItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-border-color bg-[var(--bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-custom-low">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-color)]">
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-slate-800" />
          )}
          <Image
            src={coverImage}
            alt={`${title} - cover image`}
            fill
            loading="eager"
            onLoad={() => setIsLoaded(true)}
            className={`object-cover transition duration-500 group-hover:scale-[1.015] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-7">
          <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.35em] text-content-text opacity-60">
            <DateFormatter date={date} />
            <span>
              {language === 'da' ? (
                <Image
                  loader={localImageLoader}
                  src={'/assets/flags/da.svg'}
                  height={14}
                  width={22}
                  alt="dansk"
                />
              ) : (
                <Image
                  loader={localImageLoader}
                  src={'/assets/flags/en.svg'}
                  height={14}
                  width={22}
                  alt="english"
                />
              )}
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-content-text">{title}</h3>
          <p className="text-base leading-relaxed text-content-text opacity-80">{excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {technologies &&
              technologies.map((t, i) => (
                <Ship
                  key={`${i}-${slug}`}
                  value={t}
                  className="rounded-full border border-border-color bg-transparent px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-content-text opacity-70"
                />
              ))}
          </div>
          <div className="mt-auto flex items-center justify-between text-sm font-semibold text-content-text opacity-80">
            <span>View case study</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        aria-label={title}
        className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
      />
    </article>
  );
}

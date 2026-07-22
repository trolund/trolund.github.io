import Avatar from './avatar';
import DateFormatter from './date-formatter';
import Image from 'next/image';
import { Author } from '../types/blogPost';
import Language from '../types/languages';
import Ship from './ship';
import localImageLoader from '../services/image-loader-service';

type postHeaderOptions = {
  title: string;
  coverImage: string;
  date: Date;
  author: Author;
  language: Language;
  technologies: string[];
  slug: string;
};

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  language,
  technologies,
  slug,
}: postHeaderOptions) {
  return (
    <header className="mb-12">
      <div
        className="relative aspect-21/9 w-full overflow-hidden rounded-[28px] bg-(--bg-color)"
        style={{ viewTransitionName: `cover-${slug}` }}
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <div className="text-content-text flex flex-wrap items-center justify-between text-[0.7rem] tracking-[0.35em] uppercase opacity-60">
          <DateFormatter date={date} />
          <span className="flex items-center">
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
        <h1 className="text-content-text text-3xl leading-tight font-semibold md:text-5xl">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies &&
            technologies.map((t, i) => (
              <Ship
                key={`${i}-${slug}-${t}`}
                value={t}
                className="border-border-color text-content-text rounded-full border bg-transparent px-3 py-1 text-[0.7rem] tracking-[0.2em] uppercase opacity-70"
              />
            ))}
        </div>
      </div>
    </header>
  );
}

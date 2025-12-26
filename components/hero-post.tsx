import DateFormatter from './date-formatter';
import LinkTransition from './link-transition';
import { Author } from '../types/blogPost';
import Ship from './ship';
import Image from 'next/image';

interface HeroPostProps {
  title: string;
  coverImage: string;
  date: Date;
  excerpt?: string;
  author: Author;
  slug: string;
  tags?: string[];
  technologies?: string[];
  className?: string;
}

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  className,
  technologies,
}: HeroPostProps) {
  return (
    <section className={className}>
      <article className="group relative overflow-hidden rounded-[28px] border border-border-color bg-[var(--bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-custom-low">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--bg-color)]">
            <Image
              src={coverImage}
              alt="Cover image"
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.015]"
              priority
            />
          </div>
          <div className="flex h-full flex-col gap-5 p-7">
            <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.35em] text-content-text opacity-60">
              <DateFormatter date={date} />
              <span>Featured</span>
            </div>
            <h3 className="text-3xl font-semibold leading-tight text-content-text md:text-5xl">
              {title}
            </h3>
            <p className="text-base leading-relaxed text-content-text opacity-80 md:text-lg">
              {excerpt}
            </p>
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
              <span>Read story</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
        <LinkTransition
          href={`/posts/${slug}`}
          aria-label={title}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        />
      </article>
    </section>
  );
}

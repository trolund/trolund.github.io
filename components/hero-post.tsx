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
      <article className="scroll-reveal border-border-color hover:shadow-custom-low bg-(--bg) group relative overflow-hidden rounded-[28px] border transition-[transform,translate,box-shadow] duration-300 hover:-translate-y-1">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          <div
            className="aspect-21/9 bg-(--bg-color) relative w-full overflow-hidden"
            style={{ viewTransitionName: `cover-${slug}` }}
          >
            <Image
              src={coverImage}
              alt="Cover image"
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex h-full flex-col gap-5 p-7">
            <div className="text-content-text flex items-center justify-between text-[0.68rem] uppercase tracking-[0.35em] opacity-60">
              <DateFormatter date={date} />
              <span>Featured</span>
            </div>
            <h3 className="text-content-text text-3xl font-semibold leading-tight md:text-5xl">
              {title}
            </h3>
            <p className="text-content-text text-base leading-relaxed opacity-80 md:text-lg">
              {excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies &&
                technologies.map((t, i) => (
                  <Ship
                    key={`${i}-${slug}`}
                    value={t}
                    className="border-border-color text-content-text rounded-full border bg-transparent px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] opacity-70"
                  />
                ))}
            </div>
            <div className="text-content-text mt-auto flex items-center justify-between text-sm font-semibold opacity-80">
              <span>Read story</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
        <LinkTransition
          href={`/posts/${slug}`}
          aria-label={title}
          className="focus-visible:outline-hidden absolute inset-0 focus-visible:ring-2 focus-visible:ring-blue-500/40"
        />
      </article>
    </section>
  );
}

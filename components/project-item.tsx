import Link from 'next/link';
import { Author, OgImage } from '../types/blogPost';
import Image from 'next/image';
import Language from '../types/languages';
import DateFormatter from './date-formatter';
import Card from './card';
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
    <Card>
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 p-5">
          <div className="relative h-[200px] w-full">
            <div className="relative h-[200px] w-full overflow-hidden">
              {!isLoaded && (
                <div className="dark:bg-slate-800 absolute inset-0 animate-pulse bg-gray-300" />
              )}
              <Image
                src={coverImage}
                alt={`${title} - cover image`}
                fill
                loading="eager"
                onLoad={() => setIsLoaded(true)}
                className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
          <h3 className="text-3xl leading-snug">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
              aria-label={title}
            >
              {title}
            </Link>
          </h3>
          <div className="flex flex-wrap">
            {technologies && technologies.map((t, i) => <Ship key={`${i}-${slug}`} value={t} />)}
          </div>
          <div className="flex flex-row" style={{ height: '15px' }}>
            <div className="basis-1/2 text-base font-extralight italic">
              <DateFormatter date={date} />
            </div>
            <div className="basis-1/2">
              <span className="float-right">
                {language === 'da' ? (
                  <Image
                    loader={localImageLoader}
                    src={'/assets/flags/da.svg'}
                    height={15}
                    width={30}
                    alt="dansk"
                  />
                ) : (
                  <Image
                    loader={localImageLoader}
                    src={'/assets/flags/en.svg'}
                    height={15}
                    width={30}
                    alt="english"
                  />
                )}
              </span>
            </div>
          </div>
          <p className="text-lg leading-relaxed">{excerpt}</p>
          <p className="float-right text-base font-semibold">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
              Read more
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}

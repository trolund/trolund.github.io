import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import PostTitle from './post-title';
import Image from "next/legacy/image";
import { Author } from '../types/blogPost';
import Language from '../types/languages';
import Ship from './ship';

type postHeaderOptions = {
  title: string;
  coverImage: string;
  date: Date;
  author: Author;
  language: Language;
  technologies: string[];
};

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  language,
  technologies,
}: postHeaderOptions) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage
          style={{ borderRadius: 'var(--border-radius)' }}
          slug=""
          title={title}
          src={coverImage}
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-4" style={{ height: '20px' }}>
          <div className="float-left mb-4 text-base font-extralight italic">
            <DateFormatter date={date} />
          </div>
          <div className="float-right mb-4 text-base font-extralight italic">
            {language === 'da' ? (
              <Image src="/assets/flags/da.svg" height={15} width={30} alt="dansk" />
            ) : (
              <Image src="/assets/flags/en.svg" height={15} width={30} alt="english" />
            )}
          </div>
        </div>
        <div className="mb-4 flex flex-wrap" style={{ width: '100%' }}>
          {technologies && technologies.map((t, i) => <Ship key={i} value={t} />)}
        </div>
      </div>
    </>
  );
}

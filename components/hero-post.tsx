import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import { Author } from '../types/blogPost'
import cn from 'classnames'

interface HeroPostProps {
  title: string;
  coverImage: string;
  date: Date;
  excerpt: string
  author: Author;
  slug: string;
  tags?: string[];
}

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags
}: HeroPostProps) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <div className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        }) + " " + "pt-4 pl-2"} style={{ backgroundImage: `url(${coverImage})`, height: "200px", width: "100%", backgroundSize: "cover" }}>
          {tags && tags.map(t => <span className="px-3 py-2 bg-accent-1 border-solid border-2 border-gray-800 border-opacity-25 rounded-full mr-2">{t}</span>)}
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}

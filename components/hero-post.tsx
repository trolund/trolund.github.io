import DateFormatter from './date-formatter'
import Link from 'next/link'
import { Author } from '../types/blogPost'
import cn from 'classnames'
import Card from './card'
import Ship from './ship'

interface HeroPostProps {
  title: string;
  coverImage: string;
  date: Date;
  excerpt?: string
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
  technologies
}: HeroPostProps) {
  return (
    <section>
      <Card className={className}>
        <div className="px-3.5 py-2.5">
          <div className="mb-5">
            <div className={cn('shadow-small', {
              'hover:shadow-medium transition-shadow duration-200': slug,
            })} style={{ backgroundImage: `url(${coverImage})`, height: "300px", width: "100%", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden", borderRadius: "var(--border-radius)" }}>
            </div>
          </div>
          <div>
            <div>
              <h3 className="md:text-6xl md:leading-tight text-3xl mb-3 leading-snug">
                <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
                  {title}
                </Link>
              </h3>
              <div className="mb-4 md:mb-0 text-lg">
                <div className="mb-4 font-extralight text-base italic basis-1/2"><DateFormatter date={date} /></div>
              </div>
              <div className="flex flex-wrap">
                {technologies && technologies.map((t, i) => <Ship key={i} value={t} />)}
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            {/* <div>
          {excerpt && <p className="text-lg leading-relaxed mb-4">{excerpt}</p>}
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
          </div>
        </div>
      </Card>
    </section>
  );
}

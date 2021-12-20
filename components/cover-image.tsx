import cn from 'classnames'
import Link from 'next/link'

interface coverImageProps {
  title: string;
  src: string;
  slug: string;
  style?: React.CSSProperties;
  className?: string;
  tags?: string[];
}

export default function CoverImage({ title, src, slug, style, className, tags }: coverImageProps) {
  const image = (
    <div>
      <img
        style={style}
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        }) + " " + className}
      />
      {tags && tags.map(t => <span className="p-4 bg-accent-2 border-transparent border-gray-200 rounded-full hover:shadow-medium transition-shadow duration-200">{t}</span>)}
    </div>
  )
  return (
    <div className="sm:mx-0">

      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
          image
        )}
    </div>
  )
}

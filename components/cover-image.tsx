import cn from 'classnames';
import Link from 'next/link';

interface coverImageProps {
  title: string;
  src: string;
  slug: string;
  style?: React.CSSProperties;
  className?: string;
  tags?: string[];
}

export default function CoverImage({ title, src, slug, tags }: coverImageProps) {
  const image = (
    <div>
      <div
        aria-label={title}
        className={cn('h-64 w-full overflow-hidden bg-cover bg-center shadow-small', {
          'transition-shadow hover:shadow-medium': slug,
        })}
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
      {tags &&
        tags.map((t, i) => (
          <span
            key={i}
            className="rounded-full border-gray-200 border-transparent bg-accent-2 p-4 transition-shadow duration-200 hover:shadow-medium"
          >
            {t}
          </span>
        ))}
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

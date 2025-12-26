import Link from 'next/link';
import Image from 'next/image';

interface coverImageProps {
  title: string;
  src: string;
  slug: string;
  tags?: string[];
}

export default function CoverImage({ title, src, slug, tags }: coverImageProps) {
  const image = (
    <div>
      <div aria-label={title} className="relative h-64 w-full overflow-hidden shadow-small">
        <Image
          src={src}
          alt={title}
          fill
          loading="eager"
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
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
        <Link href={`/posts/${slug}`}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

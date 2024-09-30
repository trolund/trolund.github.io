import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface coverImageProps {
  title: string;
  src: string;
  slug: string;
  style?: React.CSSProperties;
  className?: string;
  tags?: string[];
}

export default function CoverImage({
  title,
  src,
  slug,
  style,
  className,
  tags,
}: coverImageProps) {
  const image = (
    <div>
      <Image
        style={{ maxHeight: "32rem", ...style }}
        src={src}
        alt={`Cover Image for ${title}`}
        className={
          cn("shadow-small", {
            "transition-shadow duration-200 hover:shadow-medium": slug,
          }) +
          " mx-auto" +
          className
        }
      />
      {tags &&
        tags.map((t, i) => (
          <span
            key={i}
            className="p-4 bg-accent-2 rounded-full border-transparent border-gray-200 transition-shadow duration-200 hover:shadow-medium"
          >
            {t}
          </span>
        ))}
    </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" legacyBehavior>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

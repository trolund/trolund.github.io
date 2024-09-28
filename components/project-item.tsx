import Link from "next/link";
import { Author, OgImage } from "../types/blogPost";
import cn from 'classnames'
import Image from 'next/image'
import Language from "../types/languages";
import DateFormatter from "./date-formatter";
import Card from "./card";
import Ship from "./ship";

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
    className
}: ProjectItemProps) {
    return (
        <Card className={className}>
        <div className="px-3.5 py-2.5">
            <div className="mb-5">
                <div className={cn('shadow-small', {
                    'hover:shadow-medium transition-shadow duration-200': slug,
                })} style={{ backgroundImage: `url(${coverImage})`, height: "200px", width: "100%", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden", borderRadius: "var(--border-radius)" }}>
                </div>
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
                    {title}
                </Link>
            </h3>
            <div className="flex flex-wrap">
                {technologies && technologies.map((t, i) => <Ship key={i} value={t} />)}
            </div>
            <div className="flex flex-row mb-2" style={{height: "15px"}}>
                <div className="mb-4 font-extralight text-base italic basis-1/2"><DateFormatter date={date} /></div>
                <div className="basis-1/2">
                    <span className="float-right">{language === "da" ?
                        <Image src="/assets/flags/da.svg" height={15} width={30} alt="dansk" />
                        : <Image src="/assets/flags/en.svg" height={15} width={30} alt="english" />}
                    </span>
                </div>
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            {/* <Avatar name={author.name} picture={author.picture} /> */}
            <p className="text-base font-semibold float-right">
                <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
                    Read more
                </Link>
            </p>
        </div>
        </Card>
    );
}

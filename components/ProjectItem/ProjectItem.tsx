import Link from "next/link";
import { BlogPost } from "../../types/blogPost";
import Avatar from "../avatar";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import styles from "./ProjectItem.module.css";
import cn from 'classnames'


export default function ProjectItem({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
    tags,
    technologies
}: BlogPost) {
    return (
        <div>
            <div className="mb-5">
                <div className={cn('shadow-small', {
                    'hover:shadow-medium transition-shadow duration-200': slug,
                }) + " " + "pt-4 pl-2"} style={{ backgroundImage: `url(${coverImage})`, height: "200px", width: "100%", backgroundSize: "cover" }}>
                    {technologies && technologies.map((t, i) => <span key={i} className="px-3 py-2 bg-accent-1 border-solid border-2 border-gray-800 border-opacity-25 rounded-full mr-2">{t}</span>)}
                </div>
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a className="hover:underline">{title}</a>
                </Link>
            </h3>
            <div className="text-lg mb-4">
                <DateFormatter dateString={date} />
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            {/* <Avatar name={author.name} picture={author.picture} /> */}
            <p className="text-base font-semibold float-right">
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a className="hover:underline">Læs mere</a>
                </Link>
            </p>
        </div>
    )
}

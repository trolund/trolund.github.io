import Link from "next/link";
import { BlogPost } from "../../types/blogPost";
import DateFormatter from "../date-formatter";
import cn from 'classnames'
import Image from 'next/image'

export default function ProjectItem({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
    tags,
    technologies,
    language
}: BlogPost) {
    return (
        <div className="px-3.5 py-2.5">
            <div className="mb-5">
                <div className={cn('shadow-small', {
                    'hover:shadow-medium transition-shadow duration-200': slug,
                }) + " " + "pt-4 pl-2 flex flex-wrap"} style={{ backgroundImage: `url(${coverImage})`, height: "200px", width: "100%", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
                    {technologies && technologies.map((t, i) => <span key={i} style={{ backgroundColor: "var(--footer)", height: "45px" }} className="px-3 py-2 border-solid border-2 border-gray-800 border-opacity-25 rounded-full mr-2 grow-0">{t}</span>)}
                </div>
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a className="hover:underline">{title}</a>   
                </Link>
            </h3>
            <div className="mb-4 font-extralight text-base italic">
                <DateFormatter dateString={date} />
                <span className="pl-2">{language === "da" ? 
                    <Image src="/assets/flags/da.svg" height={15} width={30}  alt="dansk" /> 
                    : <Image src="/assets/flags/en.svg" height={15} width={30} alt="english"/>}
                </span>
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            {/* <Avatar name={author.name} picture={author.picture} /> */}
            <p className="text-base font-semibold float-right">
                <Link as={`/posts/${slug}`} href="/posts/[slug]">
                    <a className="hover:underline">Read more</a>
                </Link>
            </p>
        </div>
    )
}

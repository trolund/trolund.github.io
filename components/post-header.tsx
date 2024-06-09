import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Image from 'next/image'
import { Author } from '../types/blogPost'
import Language from '../types/languages'

type postHeaderOptions = {
  title: string,
  coverImage: string,
  date: Date,
  author: Author,
  language: Language
  technologies: string[]
}

export default function PostHeader({ title, coverImage, date, author, language, technologies }: postHeaderOptions) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage slug="" title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-4" style={{height: "20px"}}>
          <div className="mb-4 font-extralight text-base italic float-left">
            <DateFormatter dateString={date} />
          </div>
          <div className="mb-4 font-extralight text-base italic float-right">
            {language === "da" ? 
                      <Image src="/assets/flags/da.svg" height={15} width={30}  alt="dansk" /> 
                      : <Image src="/assets/flags/en.svg" height={15} width={30} alt="english"/>}
          </div>
        </div>
        <div className="mb-4 flex flex-wrap" style={{width: "100%"}}>
                {technologies && technologies.map((t, i) => <span key={i} style={{ backgroundColor: "var(--footer)", height: "45px" }} className="px-3 py-2 mb-1 border-solid border-2 border-gray-800 border-opacity-25 rounded-full mr-2 grow-0">{t}</span>)}
        </div> 
      </div>
    </>
  )
}

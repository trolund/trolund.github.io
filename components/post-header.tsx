import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Image from 'next/image'

export default function PostHeader({ title, coverImage, date, author, language }) {
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
      </div>
    </>
  )
}

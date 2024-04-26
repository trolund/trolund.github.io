import React from 'react'
import ReactMarkdown from "react-markdown"
import * as Markdown from "react-markdown"
import Image from "next/image"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeMeta from 'rehype-meta'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface ExperienceProp {
    mdcontent?: any
}

const renderers: Markdown.Components = {
    image: ({node}) => {
      const i: HTMLImageElement = node as any;
      return <Image src={i.src ?? ""} alt={i.alt ?? ""} height={i.height ?? 50} width={i.width ?? 50} />
    }
  }

const Experience: React.FC<ExperienceProp> = ({ mdcontent }: ExperienceProp) => {
    return (<ReactMarkdown 
                components={renderers}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeMeta, rehypeRaw]}
            >
                {mdcontent}
            </ReactMarkdown>)
}

export default Experience
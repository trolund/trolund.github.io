import markdownStyles from '../styles/markdown-styles.module.css';
import ReactMarkdown from 'react-markdown';
import * as Markdown from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMeta from 'rehype-meta';
import rehypeRaw from 'rehype-raw';
import React from 'react';

type postBodyTypes = {
  content: string;
  className?: string;
};

function flatten(text: string, child: any) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  var slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + props.level, { id: slug }, props.children);
}

const renderers: Markdown.Components = {
  image: ({ node }) => {
    const i: HTMLImageElement = node as any;
    return (
      <Image src={i.src ?? ''} alt={i.alt ?? ''} height={i.height ?? 50} width={i.width ?? 50} />
    );
  },
  pre: ({ ...props }) => {
    return (
      <pre
        style={{
          maxWidth: '100%',
          padding: '10px',
          overflowWrap: 'break-word',
        }}
      >
        {props.children}
      </pre>
    );
  },
  code: ({ className, children, ...props }) => {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  h1: (props) => HeadingRenderer(props),
  h2: (props) => HeadingRenderer(props),
  h3: (props) => HeadingRenderer(props),
  h4: (props) => HeadingRenderer(props),
};

export default function PostBody({ className, content }: postBodyTypes) {
  const defClassNames = 'max-w-3xl mx-auto';

  return (
    <div className={className ?? defClassNames}>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        components={renderers}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeMeta, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

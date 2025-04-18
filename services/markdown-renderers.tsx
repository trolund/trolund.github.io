import * as Markdown from 'react-markdown';
import Image from 'next/legacy/image';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { oneDark } from './one-dark';
import { oneLight } from './one-light';

function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast('🛠️ Code copied to clipboard', { type: 'info' });
    })
    .catch((err) => {
      toast('Failed to copy', { type: 'error' });
    });
}

function flatten(text: string, child: any) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function headingRenderer(props: any, level: number) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, '');
  var slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + level, { id: slug }, props.children);
}

export const markdownRenderers = (isDark: boolean = false): Markdown.Components => ({
  image: ({ node }) => {
    const i: HTMLImageElement = node as any;
    return (
      <Image src={i.src ?? ''} alt={i.alt ?? ''} height={i.height ?? 50} width={i.width ?? 50} />
    );
  },
  pre: ({ children, style, ...rest }) => {
    const isCode = (children as any)?.props?.className?.includes('language-');
    return (
      <pre {...rest} style={isCode ? { ...style, padding: '0px', overflowX: 'visible' } : style}>
        {children}
      </pre>
    );
  },
  code: (props) => {
    const { children, className, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    const code = String(children).replace(/\n$/, '');
    return match ? (
      <div className="relative">
        <SyntaxHighlighter
          showLineNumbers
          wrapLongLines
          language={match[1]}
          style={isDark ? (oneDark as any) : oneLight}
        >
          {code}
        </SyntaxHighlighter>
        <MdContentCopy
          onClick={() => copyToClipboard(code)}
          className="absolute right-2 top-2 cursor-pointer rounded-lg bg-black/50 transition-transform duration-200 hover:scale-125"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            cursor: 'pointer',
          }}
        />
      </div>
    ) : (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  },
  h1: (props) => headingRenderer(props, 1),
  h2: (props) => headingRenderer(props, 2),
  h3: (props) => headingRenderer(props, 3),
  h4: (props) => headingRenderer(props, 4),
});

import * as Markdown from 'react-markdown';
import Image from 'next/legacy/image';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as styleDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import * as styleLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';

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
  code: (props) => {
    const { children, className, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter
        // eslint-disable-next-line react/no-children-prop
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        style={isDark ? styleDark.default : styleLight.default}
      />
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

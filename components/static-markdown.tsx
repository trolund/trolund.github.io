import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMeta from 'rehype-meta';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { staticRenderers } from '../services/static-markdown-renderers';

interface StaticMarkdownProp {
  mdContent?: string;
}

const StaticMarkdown: React.FC<StaticMarkdownProp> = ({ mdContent }) => {
  return (
    <ReactMarkdown
      components={staticRenderers}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeMeta, rehypeRaw]}
    >
      {mdContent}
    </ReactMarkdown>
  );
};

export default StaticMarkdown;

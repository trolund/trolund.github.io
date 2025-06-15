'use client';

import markdownStyles from '../styles/markdown-styles.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMeta from 'rehype-meta';
import rehypeRaw from 'rehype-raw';

import { markdownRenderers } from '../services/markdown-renderers';
import { useTheme } from 'next-themes';
import { Themes } from '@/types/theme';

type postBodyTypes = {
  content: string;
  className?: string;
};

export default function PostBody({ className, content }: postBodyTypes) {
  const { resolvedTheme } = useTheme();

  const defClassNames = 'max-w-4xl mx-auto prose dark:prose-invert relative';
  return (
    <div className={className ?? defClassNames}>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        components={markdownRenderers(resolvedTheme === Themes.DARK)}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeMeta, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

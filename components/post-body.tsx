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
import { cn } from '@/lib/utils';

type postBodyTypes = {
  content: string;
  className?: string;
};

export default function PostBody({ className, content }: postBodyTypes) {
  const { resolvedTheme } = useTheme();

  const defaultClassNames = 'relative mx-auto max-w-4xl prose dark:prose-invert';
  return (
    <div className={cn(defaultClassNames, className, markdownStyles['markdown'])}>
      <ReactMarkdown
        components={markdownRenderers(resolvedTheme === Themes.DARK)}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeMeta, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

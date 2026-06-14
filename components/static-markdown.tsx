import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import markdownStyles from '../styles/markdown-styles.module.css';

type StaticMarkdownProps = {
  content: string;
  className?: string;
};

export default function StaticMarkdown({ content, className }: StaticMarkdownProps) {
  const defaultClassNames = 'relative mx-auto max-w-4xl prose';

  return (
    <div className={cn(defaultClassNames, className, markdownStyles['markdown'])}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

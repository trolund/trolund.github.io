import * as Markdown from 'react-markdown';
import Image from 'next/legacy/image';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MdContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { oneDark } from './code-styles/one-dark';
import { oneLight } from './code-styles/one-light';
import { ImageDataElement } from '../types/ImageDataElement';
import ImageItem from '../components/ImageItem';
import { mapLangIdentifierToLanguage } from './code-name-service';

function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast('🛠️ Code copied to clipboard', { type: 'info' });
    })
    .catch(() => {
      toast('Failed to copy', { type: 'error' });
    });
}

export const markdownRenderers = (isDark: boolean = false): Markdown.Components => ({
  image: ({ node }) => {
    const imageElement: HTMLImageElement = node as any;
    return (
      <Image
        src={imageElement.src ?? ''}
        alt={imageElement.alt ?? ''}
        height={imageElement.height ?? 50}
        width={imageElement.width ?? 50}
      />
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
    const langName = match ? match[1] : 'unknown';
    return match ? (
      <div className="relative">
        <SyntaxHighlighter
          showLineNumbers
          wrapLongLines
          language={langName}
          /* eslint-disable react/forbid-component-props */
          style={isDark ? (oneDark as any) : oneLight}
        >
          {code}
        </SyntaxHighlighter>
        <div
          style={{
            position: 'absolute',
            top: '0px',
            padding: '11px',
            right: '50px',
            color: 'var(--content-text)',
            fontSize: '0.8rem',
          }}
        >
          {mapLangIdentifierToLanguage(langName)}
        </div>
        <MdContentCopy
          onClick={() => copyToClipboard(code)}
          className="cursor-pointer transition-transform duration-200 hover:scale-125"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            color: 'var(--content-text)',
          }}
        />
      </div>
    ) : (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  },
  li: ({ node, children }) => {
    const element: ImageDataElement = node as any;
    let imageUrl = element.properties.dataUrl;

    if (imageUrl?.includes(':')) {
      const index = isDark ? 1 : 0;
      imageUrl = imageUrl.split(':')[index];
    }

    return imageUrl ? (
      <ImageItem
        imageUrl={imageUrl}
        height={element.properties.dataH}
        width={element.properties.dataW}
      >
        {children}
      </ImageItem>
    ) : (
      <li>{children}</li>
    );
  },
});

'use client';

import { CSSProperties } from 'react';

import { getOptimizedImagePath, getOptimizedImageSrcSet } from '../services/image-loader-service';

type MarkdownImageProps = {
  alt?: string;
  height?: number | string;
  src?: string;
  style?: CSSProperties;
  width?: number | string;
};

const DEFAULT_SIZES = '(max-width: 768px) 100vw, 768px';

export default function MarkdownImage({
  alt = '',
  height,
  src,
  style,
  width,
}: MarkdownImageProps) {
  if (!src || typeof src !== 'string') {
    return null;
  }

  const srcSet = getOptimizedImageSrcSet(src);
  const optimizedSource = getOptimizedImagePath(src, 800);

  return (
    // This site is statically exported, so markdown images use a handcrafted srcset
    // that points at the pre-generated optimized assets in /public/**/optimized.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={optimizedSource}
      srcSet={srcSet}
      sizes={srcSet ? DEFAULT_SIZES : undefined}
      alt={alt}
      width={width}
      height={height}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
}

'use client';

import type { ImageLoaderProps } from 'next/image';

const localImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const params = new URLSearchParams({
    w: String(width),
    q: String(quality ?? '75'),
  });

  return `${src}?${params.toString()}`;
};

export default localImageLoader;

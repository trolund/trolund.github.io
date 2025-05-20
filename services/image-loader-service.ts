'use client';

import type { ImageLoaderProps } from 'next/image';

export const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
type ImageSizes = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Returns the optimal image size label for the given width.
 *
 * @param width - The desired display width in pixels
 * @returns The image size label
 */
export function getImageSizeLabel(width: number): ImageSizes {
  if (width <= 200) {
    return 'xxsmall';
  } else if (width <= 300) {
    return 'xsmall';
  } else if (width <= 800) {
    return 'small';
  } else if (width <= 1200) {
    return 'medium';
  } else if (width <= 1800) {
    return 'large';
  } else if (width <= 2000) {
    return 'xlarge';
  }
  return 'large';
}

const localImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

  if (supportedExtensions.some((ext) => src.endsWith(ext))) {
    const parts = src.split('/');
    const filename = parts.pop() || '';
    const folder = parts.join('/');
    const baseName = filename.split('.').slice(0, -1).join('.');
    const imageSizeLabel = getImageSizeLabel(width);

    const optimizedPath = `${folder}/optimized/${baseName}-${imageSizeLabel}.webp`;

    return `${optimizedPath}?${params.join(',')}`;
  }

  return `${src}?${params.join(',')}`;
};

export default localImageLoader;

import type { ImageLoaderProps } from 'next/image';

const supportedExtensions = ['.jpg', '.jpeg', '.png'];

/**
 * Returns the optimal image size label for the given width.
 *
 * @param width - The desired display width in pixels
 * @returns 'small' | 'medium' | 'large'
 */
export function getImageSizeLabel(width: number): 'small' | 'medium' | 'large' {
  if (width <= 600) {
    return 'small';
  } else if (width <= 1000) {
    return 'medium';
  } else {
    return 'large';
  }
}

const localImageLoader = ({ src, width }: ImageLoaderProps): string => {
  if (supportedExtensions.some((ext) => src.endsWith(ext))) {
    const parts = src.split('/');
    const filename = parts.pop() || '';
    const folder = parts.join('/');
    const baseName = filename.split('.').slice(0, -1).join('.');

    return `${folder}/optimized/${baseName}-${getImageSizeLabel(width)}.webp`;
  }

  return src; // Fallback to the original src if not a supported image
};

export default localImageLoader;

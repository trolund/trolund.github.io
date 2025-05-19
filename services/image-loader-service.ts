import type { ImageLoaderProps } from 'next/image';

export const supportedExtensions = ['.jpg', '.jpeg', '.png'];
type ImageSizes = 'small' | 'medium' | 'large';

/**
 * Returns the optimal image size label for the given width.
 *
 * @param width - The desired display width in pixels
 * @returns 'small' | 'medium' | 'large'
 */
export function getImageSizeLabel(width: number): ImageSizes {
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

    const optimizedPath = `${folder}/optimized/${baseName}-${getImageSizeLabel(width)}.webp`;

    return `${optimizedPath}?w=${width}`;
  }

  return `${src}?w=${width}`;
};

export default localImageLoader;

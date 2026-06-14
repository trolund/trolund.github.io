'use client';

import type { ImageLoaderProps } from 'next/image';

const IMAGE_VARIANTS = [
  { name: 'xxsmall', width: 100 },
  { name: 'xsmall', width: 200 },
  { name: 'small', width: 400 },
  { name: 'medium', width: 800 },
  { name: 'large', width: 1200 },
  { name: 'xlarge', width: 1800 },
] as const;

const OPTIMIZABLE_EXTENSION_PATTERN = /\.(jpe?g|png|webp)$/i;

const normalizeSource = (src: string): string => {
  try {
    return decodeURI(src);
  } catch {
    return src;
  }
};

const stripSearchAndHash = (src: string): string => src.split('#', 1)[0].split('?', 1)[0];

export const isOptimizableLocalImage = (src: string): boolean => {
  const normalizedSource = stripSearchAndHash(normalizeSource(src));

  return (
    normalizedSource.startsWith('/') &&
    !normalizedSource.includes('/optimized/') &&
    OPTIMIZABLE_EXTENSION_PATTERN.test(normalizedSource)
  );
};

const getClosestVariant = (width: number) =>
  IMAGE_VARIANTS.find((variant) => variant.width >= width) ??
  IMAGE_VARIANTS[IMAGE_VARIANTS.length - 1];

export const getOptimizedImagePath = (src: string, width: number): string => {
  const normalizedSource = stripSearchAndHash(normalizeSource(src));

  if (!isOptimizableLocalImage(normalizedSource)) {
    return src;
  }

  const variant = getClosestVariant(width);
  const lastSlashIndex = normalizedSource.lastIndexOf('/');
  const directory = normalizedSource.slice(0, lastSlashIndex);
  const fileName = normalizedSource.slice(lastSlashIndex + 1);
  const extensionIndex = fileName.lastIndexOf('.');
  const baseName = extensionIndex >= 0 ? fileName.slice(0, extensionIndex) : fileName;

  return encodeURI(`${directory}/optimized/${baseName}-${variant.name}.webp`);
};

export const getOptimizedImageSrcSet = (src: string): string | undefined => {
  if (!isOptimizableLocalImage(src)) {
    return undefined;
  }

  return IMAGE_VARIANTS.map(
    (variant) => `${getOptimizedImagePath(src, variant.width)} ${variant.width}w`,
  ).join(', ');
};

const localImageLoader = ({ src, width }: ImageLoaderProps): string => {
  return getOptimizedImagePath(src, width);
};

export default localImageLoader;

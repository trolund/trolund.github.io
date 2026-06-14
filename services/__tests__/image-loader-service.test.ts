import { describe, expect, test } from '@jest/globals';

import {
  getOptimizedImagePath,
  getOptimizedImageSrcSet,
  isOptimizableLocalImage,
} from '../image-loader-service';

describe('image loader service', () => {
  test('maps local raster images to the nearest optimized asset', () => {
    expect(getOptimizedImagePath('/assets/blog/front1.jpeg', 640)).toBe(
      '/assets/blog/optimized/front1-medium.webp'
    );
    expect(getOptimizedImagePath('/assets/blog/front1.jpeg', 1600)).toBe(
      '/assets/blog/optimized/front1-xlarge.webp'
    );
  });

  test('keeps svg and remote assets unchanged', () => {
    expect(getOptimizedImagePath('/assets/flags/en.svg', 200)).toBe('/assets/flags/en.svg');
    expect(getOptimizedImagePath('https://example.com/image.jpg', 200)).toBe(
      'https://example.com/image.jpg'
    );
  });

  test('produces a responsive srcset for local raster images', () => {
    expect(getOptimizedImageSrcSet('/assets/blog/front1.jpeg')).toContain(
      '/assets/blog/optimized/front1-xxsmall.webp 100w'
    );
    expect(getOptimizedImageSrcSet('/assets/blog/front1.jpeg')).toContain(
      '/assets/blog/optimized/front1-xlarge.webp 1800w'
    );
  });

  test('recognizes only local raster images as optimizable', () => {
    expect(isOptimizableLocalImage('/assets/blog/front1.jpeg')).toBe(true);
    expect(isOptimizableLocalImage('/assets/flags/en.svg')).toBe(false);
    expect(isOptimizableLocalImage('/assets/blog/optimized/front1-large.webp')).toBe(false);
  });
});

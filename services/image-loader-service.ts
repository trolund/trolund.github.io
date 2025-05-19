import type { ImageLoaderProps } from 'next/image'

const supportedExtensions = ['.jpg', '.jpeg', '.png'];

const localImageLoader = ({ src }: ImageLoaderProps): string => {

    if (supportedExtensions.some(ext => src.endsWith(ext))) {
        const parts = src.split('/');
        const filename = parts.pop() || '';
        const folder = parts.join('/');
        const baseName = filename.split('.').slice(0, -1).join('.');

        return `${folder}/optimized/${baseName}.webp`;
    }

    return src; // Fallback to the original src if not a supported image
};

export default localImageLoader;

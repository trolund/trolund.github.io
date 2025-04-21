import Image from 'next/image';
import * as Markdown from 'react-markdown';
import ImageItem from '../components/ImageItem';
import { ImageDataElement } from '../types/ImageDataElement';

export const staticRenderers: Markdown.Components = {
  li: ({ node, children }) => {
    const element: ImageDataElement = node as any;
    const imageUrl = element.properties.dataUrl;

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
  h2: ({ node, children }) => {
    const element: HTMLHeadingElement = node as any;
    return (
      <h2 className="mb-2 mt-4 text-2xl font-bold" id={element.id}>
        {children}
      </h2>
    );
  },
};

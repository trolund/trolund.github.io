import Image from 'next/image';
import * as Markdown from 'react-markdown';

interface ImageDataElement extends HTMLLIElement {
  properties: {
    dataUrl?: string;
    dataH?: number;
    dataW?: number;
  };
}

export const staticRenderers: Markdown.Components = {
  li: ({ node, children }) => {
    const element: ImageDataElement = node as any;
    const imageUrl = element.properties.dataUrl;
    const height = element.properties.dataH;
    const width = element.properties.dataW;

    if (imageUrl) {
      return (
        <li>
          <div className="flex flex-row gap-6">
            <div>
              <Image src={imageUrl ?? ''} width={width} height={height} alt="logo" />
            </div>
            <div className="w-full">{children}</div>
          </div>
        </li>
      );
    } else {
      return <li>{children}</li>;
    }
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

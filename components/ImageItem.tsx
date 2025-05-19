import Image from 'next/image';
import React from 'react';
import localImageLoader from '../services/image-loader-service';

type ImageItemProps = {
  imageUrl?: string;
  width: number | undefined;
  height: number | undefined;
  children: React.ReactNode;
};

const ImageItem: React.FC<ImageItemProps> = ({ imageUrl, width, height, children }) => {
  return (
    <div className="flex flex-row gap-6">
      <div>
        <Image
          loader={localImageLoader}
          className="mt-2"
          src={imageUrl ?? ''}
          width={width ?? 10}
          height={height ?? 10}
          alt="logo"
        />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ImageItem;

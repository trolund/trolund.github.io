import Image from 'next/image';
import localImageLoader from '../services/image-loader-service';

type AvatarProps = {
  name: string;
  picture: string;
};

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex items-center">
      <Image
        loader={localImageLoader}
        src={picture}
        alt={name}
        width={48}
        height={48}
        className="mr-4 h-12 w-12 rounded-full"
      />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}

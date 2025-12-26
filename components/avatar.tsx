import Image from 'next/image';

type AvatarProps = {
  name: string;
  picture: string;
  showName?: boolean;
};

export default function Avatar({ name, picture, showName = true }: AvatarProps) {
  return (
    <div className="flex items-center">
      <Image
        src={picture}
        alt={name}
        width={48}
        height={48}
        className="mr-4 h-12 w-12 rounded-full"
      />
      {showName && (
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-content-text/70">
          {name}
        </div>
      )}
    </div>
  );
}

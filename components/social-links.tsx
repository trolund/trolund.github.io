import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import { cn } from '@/lib/utils';

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
  iconSize?: number;
};

export default function SocialLinks({ className, linkClassName, iconSize = 22 }: SocialLinksProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-4 text-[0.95rem]', className)}>
      <a
        className={cn(
          'inline-flex items-center gap-2 text-content-text opacity-80 transition-opacity hover:opacity-100',
          linkClassName,
        )}
        href="https://github.com/trolund"
      >
        <VscGithubInverted color="currentColor" size={iconSize} />
        GitHub
      </a>
      <a
        className={cn(
          'inline-flex items-center gap-2 text-content-text opacity-80 transition-opacity hover:opacity-100',
          linkClassName,
        )}
        href="https://www.linkedin.com/in/trolund/"
      >
        <SiLinkedin color="currentColor" size={iconSize} />
        LinkedIn
      </a>
    </div>
  );
}

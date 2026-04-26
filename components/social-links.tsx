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
          'inline-flex items-center gap-2 text-content-text opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950',
          linkClassName,
        )}
        href="https://github.com/trolund"
        rel="noreferrer"
        target="_blank"
      >
        <VscGithubInverted color="currentColor" size={iconSize} />
        GitHub
      </a>
      <a
        className={cn(
          'inline-flex items-center gap-2 text-content-text opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-zinc-950',
          linkClassName,
        )}
        href="https://www.linkedin.com/in/trolund/"
        rel="noreferrer"
        target="_blank"
      >
        <SiLinkedin color="currentColor" size={iconSize} />
        LinkedIn
      </a>
    </div>
  );
}

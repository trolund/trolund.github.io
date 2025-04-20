import { cn } from '../lib/utils';

interface ContainerType {
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, children }: ContainerType) {
  return (
    <div className={cn('main-content container mx-auto max-w-5xl px-5', className)}>{children}</div>
  );
}

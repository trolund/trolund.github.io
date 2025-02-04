import Link from 'next/link';
import { useRouter } from 'next/navigation';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function LinkTransition(props: any) {
  const router = useRouter();
  const handleClick = (e: Event) => {
    if (!document.startViewTransition) {
      // browser does not support view transition. Continue the default behavior.
      return;
    } else {
      // browser supports view transition. Animate the transtion.
      e.preventDefault();
      document.startViewTransition(async () => {
        const body = document.querySelector('body');

        body?.classList.add('page-transition');

        await sleep(500);
        router.push(props.href as any);
        await sleep(500);

        body?.classList.remove('page-transition');
      });
    }
  };

  return (
    <Link onClick={handleClick} {...props}>
      {props.children}
    </Link>
  );
}
export default LinkTransition;

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LinkTransition(props: any) {
  const router = useRouter();
  const handleClick = async (e: Event) => {
    if (!document.startViewTransition) {
      // browser does not support view transition. Continue the default behavior.
      return;
    } else {
      // browser supports view transition. Animate the transition.
      e.preventDefault();
      document.startViewTransition(async () => {
        router.push(props.href as any);
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

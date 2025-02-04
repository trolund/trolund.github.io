import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LinkTransition(props) {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const router = useRouter();
  const handleClick = (e) => {
    if (!document.startViewTransition) {
      // browser does not support view transition. Continue the default behavior.
      return;
    } else {
      // browser supports view transition. Animate the transtion.
      e.preventDefault();
      document.startViewTransition(async () => {
        router.push(props.href);
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

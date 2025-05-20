import { useEffect, useState } from 'react';

export function useLazyScroll(
  loadMore: () => void,
  currResultLength: number,
  totalLength: number,
  cooldownMs = 500,
  triggerDistance = 0,
  progressDistance = 50,
): [number, boolean] {
  const [isCoolDown, setIsCoolDown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (currResultLength === 0 || currResultLength === totalLength) return; // No results to load

      const footer = document.getElementById('footer');
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      const distanceFromFooter = footerTop - viewportHeight;

      // Calculate progress from 0 to 1
      const clampedProgress = Math.max(
        0,
        Math.min(1, (progressDistance - distanceFromFooter) / progressDistance),
      );
      setProgress(clampedProgress);

      if (distanceFromFooter <= triggerDistance && !isCoolDown) {
        setIsLoading(true);
        loadMore();

        setIsCoolDown(true);
        setTimeout(() => {
          setIsCoolDown(false);
          setIsLoading(false);
        }, cooldownMs);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // support resize events
    handleScroll(); // run once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [
    loadMore,
    cooldownMs,
    triggerDistance,
    progressDistance,
    isCoolDown,
    currResultLength,
    totalLength,
  ]);

  return [progress, isLoading];
}

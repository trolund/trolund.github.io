import { useEffect, useState } from 'react';

export function useLazyScroll(
    loadMore: () => void,
    deps: any[] = [],
    triggerDistance = 100,
    progressDistance = 200,
    cooldownMs = 500
): [number, boolean] {
    const [isCoolDown, setIsCoolDown] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const docHeight = document.body.offsetHeight;
            const distanceFromBottom = docHeight - (scrollY + viewportHeight);

            // Calculate progress (from 0 to 1)
            const clampedProgress = Math.max(
                0,
                Math.min(1, (progressDistance - distanceFromBottom) / progressDistance)
            );
            setProgress(clampedProgress);

            if (distanceFromBottom <= triggerDistance && !isCoolDown) {
                setIsLoading(true);
                loadMore();

                setIsCoolDown(true);

                setTimeout(() => {
                    setIsCoolDown(false)
                    setIsLoading(false);
                }, cooldownMs);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadMore, triggerDistance, progressDistance, cooldownMs, ...deps]);

    return [progress, isLoading];
}

import { useEffect } from 'react';

const useScrollToBottom = (bottomOffset: number, callback: Function) => {

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - bottomOffset) callback();
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
};

export default useScrollToBottom;

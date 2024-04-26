import React, { FunctionComponent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import styles from "./event.module.css"

export interface EventProps {
    title: string,
    paragraph: string,
    placement: number,
    timeLineId?: string,
    timelinePos?: number,
    isMobile?: boolean;
    icon?: React.ReactNode,
    year?: number
    offsetTop?: number;
}

const Event: FunctionComponent<EventProps> = ({ title, paragraph, placement, timeLineId, timelinePos, icon, year }) => {
    const cssVar = '--scroll-event' + title.toLowerCase();
    const [show, setShow] = useState(false);
    const isWideScreen = useMediaQuery({ query: '(min-width: 680px)' });


    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
    });

    const opacity = (isWideScreen: boolean) => isWideScreen ? {} : { opacity: (show ? 1 : 0) }

    // const PointOnLine = () => <span style={{ left: 0, top: timelinePos?.top, width: "20px", height: "20px", background: "red", position: "absolute" }} />

    useEffect(() => {
        document.body.style.setProperty(cssVar, String(placement));
    }, []);

    useEffect(() => {
        if (inView) {
            setShow(inView)
        }
    }, [inView]);

    return (
        <div ref={ref} className={styles.container} style={{ animationDelay: `calc(${placement}s + var(--scroll) * -1s)`, left: `${placement * 100 * 2 + 10}%`, ...(opacity(isWideScreen)) }}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {year && <i className={styles.year}>{year}</i>}
            <h4 className={styles.title} >{title}</h4>
            <p className={styles.paragraph}>{paragraph}</p>
        </div >
    )
};

export default Event;
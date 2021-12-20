import React, { FunctionComponent, useEffect, useRef } from 'react';
import styles from "./Event.module.css"
import Fade from 'react-reveal/Fade'

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

    // const PointOnLine = () => <span style={{ left: 0, top: timelinePos?.top, width: "20px", height: "20px", background: "red", position: "absolute" }} />

    useEffect(() => {
        document.body.style.setProperty(cssVar, String(placement));
    }, []);

    return (
        <div className={styles.container} style={{ animationDelay: `calc(${placement}s + var(--scroll) * -1s)`, left: `${placement * 100 * 2 + 10}%` }}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {year && <i className={styles.year}>{year}</i>}
            <h4 className={styles.title} >{title}</h4>
            <p className={styles.paragraph}>{paragraph}</p>
        </div>
    )
};

export default Event;
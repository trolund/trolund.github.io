import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styles from "./time-line.module.css"

export interface TimeLineProps {
    title: string,
    paragraph: string
    children: React.ReactNode
}

const TimeLine: FunctionComponent<TimeLineProps> = ({ title, paragraph, children }) => {
    const id = `timeline${title}`;
    const [progress, setProgress] = useState<number>(0);
    const inputRef = useRef()
    const [events, setEvents] = useState<NodeListOf<Element>>();
    const [offset, setOffset] = useState<number>(0);

    const max: number = 0.99999999;

    const travel: number = 300;

    const keepBound = (i: number) => {
        if (i > 1) {
            return 1;
        } else if (i < 0) {
            return 0;
        } else {
            return i;
        }
    }



    const setProp = () => {
        // const calc =  (((window as any).pageYOffset) / ((document as any).body.offsetHeight - (window as any).innerHeight))
        const calc = ((window as any).pageYOffset - travel) / 100

        const progress = mapRange(0, 1, 0, max, keepBound(calc));
        setProgress(progress);

        document.body.style.setProperty('--scroll', String(progress));
    }



    useEffect(() => {
        const events = document.querySelectorAll("#event");
        setEvents(events)

        window.addEventListener('scroll', setProp, false);

        let elem = document.getElementById(id);
        if (elem) {
            setOffset(elem.scrollHeight)
            // setTimelinePos(elem?.getBoundingClientRect());
        }

        return () => {
            window.removeEventListener('scroll', setProp, false);
        }
    }, []);

    const mapRange = (in_min: number, in_max: number, out_min: number, out_max: number, input: number) => {
        return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    const childrenWithProp = React.Children.map(children, (child: JSX.Element) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        const props = child.props;

        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...props, timeLineId: id, id: "event", offsetTop: offset });
        }

        return child;
    })



    return (
        <div id={id} style={{ position: "relative", display: "inline-block" }}>
            <div className={styles.bg}>
                <div ref={inputRef} className={styles.container}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {paragraph && <p className={styles.paragraph}>{paragraph}</p>}
                    <div className={styles.infocontainer} />
                    <div className={styles.line} style={{ borderRadius: progress < 0.9998 ? "0px 8px 8px 0px" : "0px 0px 0px 0px" }} />
                    {childrenWithProp}
                </div>
            </div>
        </div>
    )

};

export default TimeLine;

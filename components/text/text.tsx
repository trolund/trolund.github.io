import { CSSProperties, FunctionComponent, useEffect, useState } from "react";
import styles from "./text.module.css"

interface TextProps {
    input: string | string[];
    infinity?: boolean;
    onlyWhenVisible?: boolean;
    containerClassName?: string;
    underscoreClassName?: string;
    containerStyles?: CSSProperties;
    underscoreStyles?: CSSProperties;
    color?: string;
    underscoreAnimationDuration?: number;
    writeSpeed?: number;
    wordBreakTime?: number;
    initDelay?: number;
    keepUnderscore?: boolean;
}

const Text: FunctionComponent<TextProps> = ({ input: initInput, infinity, onlyWhenVisible, containerClassName: textContainerClassName, underscoreClassName, containerStyles: textContainerStyles, underscoreStyles, color, underscoreAnimationDuration, wordBreakTime, writeSpeed, initDelay, keepUnderscore }) => {
    const [charIndex, setCharIndex] = useState<number>(0)
    const [wordIndex, setWordIndex] = useState<number>(0)
    const [showUnderScore, setShowUnderScore] = useState<boolean>(true)
    const [wait, setWait] = useState(initDelay ?? 0)

    let element: HTMLDivElement

    const input: string[] = Array.isArray(initInput) ? initInput : [initInput]

    const isInViewport = (offset = 0) => {
        if (!element) return false;
        const top = element.getBoundingClientRect().top;
        return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
    }

    const word = (wordIndex: number, charIndex: number): string => {
        return input[wordIndex].substring(0, charIndex)
    }

    useEffect(() => {
        const interval = setInterval(() => {

            // hold the break
            if (wait > 0) {
                setWait(wait - 1)
                return;
            }

            if (onlyWhenVisible === undefined || (onlyWhenVisible && isInViewport(0))) {
                const wordLength = input[wordIndex].length

                if (charIndex >= wordLength) {
                    if (wordIndex < input.length - 1) {
                        setWordIndex(wordIndex + 1)
                        setCharIndex(0)
                    } else {

                        if (infinity) {
                            setWordIndex(0)
                            setCharIndex(0)
                        } else {
                            if (!keepUnderscore) setShowUnderScore(false)
                            clearInterval(interval)
                        }

                    }
                } else {
                    setCharIndex(charIndex + 1)

                    // make a break
                    if (wordBreakTime && charIndex + 1 === input[wordIndex].length) {
                        setWait(wordBreakTime)
                    }
                }
            }
        }, writeSpeed ?? 1000);
        return () => clearInterval(interval);
    }, [wordIndex, charIndex, input, onlyWhenVisible, wordBreakTime, writeSpeed, wait, wordBreakTime]);

    return (
        <div ref={(el) => element = el} style={{ ...textContainerStyles, color: color }} className={styles.textContainer + (textContainerClassName ? " " + textContainerClassName : "")}>
            {word(wordIndex, charIndex)}<b style={{ display: showUnderScore ? "inline-block" : "none", color: color, ...underscoreStyles, ...(underscoreAnimationDuration ? { animationDuration: String(underscoreAnimationDuration) + "s" } : {}) }} className={styles.underscore + (underscoreClassName ? " " + underscoreClassName : "")}>_</b>
        </div>
    );
}

export default Text;
import React from 'react';
import styles from "./WordAni.module.scss";

const WordAni = () => {
    return (
        <h4 className={styles.wordCarousel}>
            <span>I Love</span>
            <div>
                <ul className={styles.flip4}>
                    <li>Typescript</li>
                    <li>.NET Core</li>
                    <li>React</li>
                    <li>Computer science</li>
                </ul>
            </div>
        </h4>
    );
}

export default WordAni;
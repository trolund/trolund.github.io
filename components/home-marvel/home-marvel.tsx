import { CSSProperties } from 'react';
import LinkTransition from '../link-transition';
import styles from './home-marvel.module.css';

const nodes = [
  {
    title: 'Projects',
    tag: 'Launches',
    copy: 'Flagship builds, performance wins, and product decisions.',
    link: '/projects',
    x: -260,
    y: -120,
    accent: '255 146 76',
  },
  {
    title: 'About',
    tag: 'Story',
    copy: 'Background, values, and the systems I lean on.',
    link: '/about',
    x: 250,
    y: -140,
    accent: '59 178 170',
  },
  {
    title: 'Writing',
    tag: 'Field Notes',
    copy: 'Essays on engineering, craft, and building momentum.',
    link: '/blog',
    x: -310,
    y: 160,
    accent: '243 200 90',
  },
  {
    title: 'Experiments',
    tag: 'Lab',
    copy: 'Playful prototypes and visual explorations.',
    link: '/projects',
    x: 280,
    y: 170,
    accent: '68 140 212',
  },
];

function HomeMarvel() {
  return (
    <section className={styles.marvel} aria-labelledby="home-marvel-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.kicker}>Content constellation</p>
          <h2 className={styles.title} id="home-marvel-title">
            A living atlas of the site
          </h2>
          <p className={styles.subtitle}>
            Each node is a gateway. Follow the signals to see how projects, writing, and experiments
            connect into one narrative.
          </p>
        </div>
        <div className={styles.map}>
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.core}>
            <span className={styles.coreEyebrow}>Site Core</span>
            <h3 className={styles.coreTitle}>Troels Lund</h3>
            <p className={styles.coreCopy}>
              Select a node to dive into the work and the ideas behind it.
            </p>
          </div>
          <ul className={styles.nodes}>
            {nodes.map((node, index) => (
              <li
                key={node.title}
                className={styles.node}
                style={
                  {
                    '--x': node.x,
                    '--y': node.y,
                    '--delay': `${index * 0.15}s`,
                    '--accent': node.accent,
                  } as CSSProperties
                }
              >
                <LinkTransition className={styles.nodeCard} href={node.link}>
                  <span className={styles.nodeTag}>{node.tag}</span>
                  <span className={styles.nodeTitle}>{node.title}</span>
                  <span className={styles.nodeCopy}>{node.copy}</span>
                </LinkTransition>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HomeMarvel;

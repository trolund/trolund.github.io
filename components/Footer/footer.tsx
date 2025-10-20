import Container from '../container';
import styles from './Footer.module.css';
import { MdMail, MdPhone } from 'react-icons/md';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import menuItems from '../../constants/menu';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import Splitter from '../splitter';

export default function Footer() {
  return (
    <footer id="footer" className={cn('z-45 border-t border-accent-2 bg-accent-1', styles.footer)}>
      <Container>
        <div className="xs:justify-center grid grid-cols-1 justify-between md:grid-cols-2 md:justify-center lg:grid-cols-2">
          <div className={cn('xs:p-3 md:p-8', styles.box)}>
            <h1>Contact details</h1>
            <Splitter />
            <ul className={styles.list}>
              <li>
                <MdPhone size={25} className="float-left" />{' '}
                <p className="float-right">+45 29 45 66 60</p>
              </li>
              <li>
                <MdMail size={25} className="float-left" />{' '}
                <p className="float-right">Trolund@gmail.com</p>
              </li>
              <li>
                <i>You are always welcome to send me an email.</i>
              </li>
            </ul>
            <div className={styles.icons}>
              <a href="https://github.com/trolund" aria-label="My GitHub profile">
                <VscGithubInverted size={40} />
              </a>
              <a href="https://www.linkedin.com/in/trolund/" aria-label="My Linkedin profile">
                <SiLinkedin size={40} />
              </a>
            </div>
          </div>
          <div className={cn('xs:p-3 md:p-8', styles.box)}>
            <h1>Site map</h1>
            <Splitter />
            <ul className={styles.links}>
              {menuItems.map((l, i) => (
                <li key={i}>
                  <Link href={l.link}>{l.itemName}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <div className={styles.bottom}>© {new Date().getFullYear()} | Troels Lund</div>
    </footer>
  );
}

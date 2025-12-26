import Container from '../container';
import styles from './Footer.module.css';
import { MdMail, MdPhone } from 'react-icons/md';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import menuItems from '../../constants/menu';
import LinkTransition from '../link-transition';
import { cn } from '../../lib/utils';

export default function Footer() {
  return (
    <footer id="footer" className={cn('z-45', styles.footer)}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.section}>
            <div className={styles.title}>Contact</div>
            <div className={styles.divider} />
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MdPhone size={18} />
                <span>+45 29 45 66 60</span>
              </li>
              <li className={styles.contactItem}>
                <MdMail size={18} />
                <span>Trolund@gmail.com</span>
              </li>
              <li className={styles.note}>You are always welcome to send me an email.</li>
            </ul>
            <div className={styles.socials}>
              <a href="https://github.com/trolund" aria-label="My GitHub profile">
                <VscGithubInverted size={22} />
              </a>
              <a href="https://www.linkedin.com/in/trolund/" aria-label="My Linkedin profile">
                <SiLinkedin size={22} />
              </a>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.title}>Site map</div>
            <div className={styles.divider} />
            <ul className={styles.links}>
              {menuItems.map((l, i) => (
                <li key={i}>
                  <LinkTransition href={l.link}>{l.itemName}</LinkTransition>
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

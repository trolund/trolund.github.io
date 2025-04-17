import Container from '../container';
import styles from './Footer.module.css';
import { MdMail, MdPhone } from 'react-icons/md';
import { VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import menu from '../../constants/menu';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={'z-45 border-t border-accent-2 bg-accent-1 ' + styles.footer}>
      <Container>
        <div
          className={
            'xs:justify-center grid grid-cols-1 justify-between md:grid-cols-2 md:justify-center lg:grid-cols-2'
          }
        >
          <div className={'xs:p-3 md:p-8 ' + styles.box}>
            <h4>Contact details</h4>
            <div
              style={{
                height: '5px',
                backgroundImage: 'var(--bg-img)',
                backgroundSize: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            />
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
                <VscGithubInverted size={40} style={{ animationDelay: '0.2s' }} />
              </a>
              <a href="https://www.linkedin.com/in/trolund/" aria-label="My Linkedin profile">
                <SiLinkedin size={40} style={{ animationDelay: '0.5s' }} />
              </a>
            </div>
          </div>
          <div className={'xs:p-3 md:p-8 ' + styles.box}>
            <h4>Site map</h4>
            <div
              style={{
                height: '5px',
                backgroundImage: 'var(--bg-img)',
                backgroundSize: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            />
            <ul className={styles.links}>
              {menu.map((l, i) => (
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

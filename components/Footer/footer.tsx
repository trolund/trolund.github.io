import Container from '../container'
import styles from './footer.module.css'
import { MdMail, MdPhone } from 'react-icons/md'
import { VscGithubInverted } from 'react-icons/vsc'
import { SiLinkedin } from 'react-icons/si'
import menu from '../../constants/menu'
import Link from 'next/link'
import Prompt from '../prompt/prompt'

export default function Footer() {

  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer className={"bg-accent-1 border-t border-accent-2 " + styles.footer}>
      <Container>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-between md:justify-center xs:justify-center"}>
          <div className={'xs:p-3 md:p-8 ' + styles.box}>
            <h4>Contact details</h4>
            <div style={{ height: "5px", backgroundImage: "var(--bg-img)", backgroundSize: "cover", borderRadius: "8px", marginBottom: "1rem" }} />
            <ul className={styles.list}>
              <li>
                <MdPhone size={25} className='float-left' /> <p className='float-right'>+45 29 45 66 60</p>
              </li>
              <li>
                <MdMail size={25} className='float-left' /> <p className='float-right' >Trolund@gmail.com</p>
              </li>
              <li>
                <i>You are always welcome to send me an email.</i>
              </li>
            </ul>
            <div className={styles.icons}>
              <a href="https://github.com/trolund">
                <VscGithubInverted size={40} style={{ animationDelay: "0.2s" }} />
              </a>
              <a href="https://www.linkedin.com/in/trolund/">
                <SiLinkedin size={40} style={{ animationDelay: "0.5s" }} />
              </a>
            </div>
          </div>
          <div className={'xs:p-3 md:p-8 ' + styles.box}>
            <h4>Site map</h4>
            <div style={{ height: "5px", backgroundImage: "var(--bg-img)", backgroundSize: "cover", borderRadius: "8px", marginBottom: "1rem" }} />
            <ul className={styles.links}>
              {menu.map((l, i) =>
                <li key={i}>
                  <Link href={l.link}>
                    <a>{l.itemName}</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
      <div className={styles.bottom}>© {year} | Troels Lund</div>
      <Prompt disableOverlay={true} />
    </footer >
  )
}

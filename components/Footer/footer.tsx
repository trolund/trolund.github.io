import Container from '../container'
import styles from './footer.module.css'
import { MdMail, MdPhone } from 'react-icons/md'
import { VscGithubInverted } from 'react-icons/vsc'
import { SiLinkedin } from 'react-icons/si'
import menu from '../../constants/menu'
import Link from 'next/link'
import Text from '../text/text'
import Highlight from 'react-highlight'
import Prompt from '../prompt/prompt'

export default function Footer() {

  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer className={"bg-accent-1 border-t border-accent-2 " + styles.footer} >
      {/* <svg className={styles.svg2 + " float-right"}>
        <clipPath id="path" clipPathUnits="objectBoundingBox"><path d="M1,1 h-0.022 c-0.005,-0.031,-0.011,-0.061,-0.016,-0.092 a0.522,3,0,0,0,-0.138,-0.546 a0.507,2,0,0,0,-0.201,-0.269 c-0.09,-0.013,-0.246,0.087,-0.482,0.644 c-0.038,0.089,-0.073,0.179,-0.104,0.262 H0.014 c0.038,-0.107,0.084,-0.228,0.135,-0.348 c0.084,-0.198,0.164,-0.353,0.238,-0.462 C0.48,0.12,0.564,0.056,0.637,0.067 A0.523,3,0,0,1,0.845,0.345 A0.539,3,0,0,1,0.987,0.909 C0.996,0.962,1,1,1,1"></path></clipPath>
      </svg> */}
      <Container>
        {/* <clipPath id="line-two" clipPathUnits="objectBoundingBox"><path d="M434.38,80.72h-5.64A230.92,230.92,0,0,0,370,40.29a220.06,220.06,0,0,0-89.37-21.1C208.54,17.25,124.69,45.47,67.05,69.48,58,73.23,49.36,77,41.11,80.72h-9.4c10.55-4.85,21.9-9.86,33.84-14.83,58-24.16,142.42-52.56,215.18-50.6a224.21,224.21,0,0,1,91,21.52,236,236,0,0,1,62.32,43.62Z"></path></clipPath> */}

        {/* <div className="float-left p-10">
          <h4 className="font-extrabold">Kontakt oplysninger</h4>
          <ul className={styles.list}>
            <li>
              <MdPhone className='float-left' /> <p className='float-right'>29456660</p>
            </li>
            <li>
              <MdMail className='float-left' /> <p className='float-right' >Trolund@gmail.com</p>
            </li>
            <li>
              <p>Du er altid velkomen til at kontakte mig.</p>
            </li>
          </ul>

        </div> */}

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
          {/* <svg id="brackets" data-name="brackets" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.71 122.29">
            <path id="llv" d="M99.93,137.62h3.25c3.91,0,6.51,0,9.11-.65a13.71,13.71,0,0,0,7.16-5.21c2-2.6,2.6-5.2,3.25-8.45s.65-9.11.65-16.92c0-5.85,0-9.75.65-13s2-6.5,3.9-8.45a11.26,11.26,0,0,1,8.46-3.26V71.27A11.22,11.22,0,0,1,127.9,68c-2-2-3.25-5.2-3.9-8.45s-.65-7.16-.65-13c0-7.81,0-13.66-.65-16.91s-1.3-5.86-3.25-8.46a13.69,13.69,0,0,0-7.16-5.2c-2.6-.66-5.2-.66-9.11-.66H99.93v9.76h1.95c4.56,0,7.16.65,8.46,2,2,2,2.6,2.61,2.6,4.56V47.85c0,9.76,1.3,16.26,3.25,20.16s5.86,6.51,9.76,8.46c-3.9,2-7.8,4.55-9.76,8.46s-3.25,10.4-3.25,20.16v16.26c0,2-.65,2.61-2.6,4.56-1.3,1.3-3.9,2-8.46,2H99.93Z" transform="translate(-17.65 -15.32)" fill="var(--content-text)" />
            <g id="use8">
              <path id="llv-2" data-name="llv" d="M54.07,137.62H50.82c-3.9,0-6.5,0-9.1-.65a13.64,13.64,0,0,1-7.16-5.21c-2-2.6-2.6-5.2-3.25-8.45s-.65-9.11-.65-16.92c0-5.85,0-9.75-.65-13s-2-6.5-3.91-8.45a11.23,11.23,0,0,0-8.45-3.26V71.27A11.2,11.2,0,0,0,26.1,68c1.95-2,3.26-5.2,3.91-8.45s.65-7.16.65-13c0-7.81,0-13.66.65-16.91s1.3-5.86,3.25-8.46A13.61,13.61,0,0,1,41.72,16c2.6-.66,5.2-.66,9.1-.66h3.25v9.76h-2c-4.55,0-7.15.65-8.45,2-2,2-2.61,2.61-2.61,4.56V47.85c0,9.76-1.3,16.26-3.25,20.16S32,74.52,28.05,76.47c3.91,2,7.81,4.55,9.76,8.46s3.25,10.4,3.25,20.16v16.26c0,2,.66,2.61,2.61,4.56,1.3,1.3,3.9,2,8.45,2h2Z" transform="translate(-17.65 -15.32)" fill="var(--content-text)" />
            </g>
          </svg> */}
          {/* <div className={'xs:p-3 md:p-8 ' + styles.box}>
            {/* <svg className={styles.svg + " float-right"}>
              <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M1,0 l-0.25,0.917,-0.339,-0.302,0.325,-0.343,-0.436,0.301,-0.301,-0.073,1,-0.5 m-0.625,0.695 v0.306 l0.136,-0.185,-0.136,-0.121"></path></clipPath>
            </svg> }
            {/* <Text input={['const [wait, setWait] = useState(initDelay ?? 0) \n setWait(0)']} infinity onlyWhenVisible wordBreakTime={6} writeSpeed={200} /> }
          </div> */}

        </div>
      </Container>
      <div className={styles.bottom}>© {year} | Troels Lund</div>
      <Prompt disableOverlay={true} />
    </footer >
  )
}

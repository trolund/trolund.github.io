import Container from '../container'
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={"bg-accent-1 border-t border-accent-2 " + styles.footer} >
      <Container>
        <svg className={styles.svg + " float-right"}>
          <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M1,0 l-0.25,0.917,-0.339,-0.302,0.325,-0.343,-0.436,0.301,-0.301,-0.073,1,-0.5 m-0.625,0.695 v0.306 l0.136,-0.185,-0.136,-0.121"></path></clipPath>
        </svg>
        <div className="float-left p-10">
          <h4 className="font-extrabold">Kontakt oplysninger</h4>
          <ul>
            <li>
              Mobil: 29456660
            </li>
            <li>
              Email: Trolund@gmail.com
            </li>
          </ul>
          <p>Du er altid velkomen til at kontakte mig.</p>
        </div>
        {/* <div className="float-right">
          <div className="footer-img">
            <svg className="svg">
              <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M1,0 l-0.25,0.917,-0.339,-0.302,0.325,-0.343,-0.436,0.301,-0.301,-0.073,1,-0.5 m-0.625,0.695 v0.306 l0.136,-0.185,-0.136,-0.121"></path></clipPath>
            </svg>
          </div>
        </div>
        <div className="float-left">
          <h4 className="font-medium">Kontakt oplysninger</h4>
              Mobil: 29456660
              Email: Trolund@gmail.com
            <p>Du er altid velkomen til at kontakte mig.</p>
        </div> */}
      </Container>
    </footer>
  )
}

import Link from "next/link";
import { BlogPost } from "../../types/blogPost";
import Avatar from "../avatar";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import styles from './ProfileCard.module.css';
import Image from 'next/image'


export default function ProfileCard() {
    return (
        <figure className={"rounded-xl float-left " + styles.container}>
            <div className={styles.img}>
                <Image src="/profil.png" alt="me" width="100%" height="100%" layout="responsive" objectFit="contain" />
            </div>
            <div className="pt-6 space-y-4">
                <figcaption>
                    <b style={{ fontSize: "2rem" }}>Troels Lund</b>

                    <div>
                        <i>Software engineer, Denmark</i>
                    </div>
                </figcaption>
            </div>
        </figure>
    )
}

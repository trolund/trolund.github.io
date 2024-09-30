import Image from "next/image";
import { CSSProperties } from "react";
import Card from "./card";

interface CertificationItemProp {
  href?: URL | string;
  title: string;
  subtitel: string;
  image?: string;
  imgCss?: CSSProperties;
}

export default function CertificationItem({
  href,
  title,
  subtitel,
  imgCss,
  image,
}: CertificationItemProp) {
  return (
    <Card
      className={`p-5 flex min-h-[230px] w-2/5 cursor-pointer flex-col hover:scale-105`}
      href={href}
    >
      <div
        style={{
          mixBlendMode: "darken",
          position: "absolute",
          display: "block",
          width: "50px",
          height: "70px",
          ...imgCss,
        }}
      >
        <Image alt="" src={image} layout="fill" />
      </div>
      <div style={{ marginTop: "auto" }}>
        <h3 style={{ color: "var(--content-text)" }}>{subtitel}</h3>
        <h2 style={{ color: "var(--content-text)" }}>{title}</h2>
      </div>
    </Card>
  );
}

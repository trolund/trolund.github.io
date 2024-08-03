import { LegacyRef, MutableRefObject, RefObject } from "react";

interface ContainerType {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  ref?: MutableRefObject<HTMLDivElement>;
}

export default function Container({ className, style, children, ref }: ContainerType) {
  return <div ref={ref} style={{...style, maxWidth: "1024px" }} className={"sm:container mx-auto px-5 main-content " + className}>{children}</div>
}

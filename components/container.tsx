interface ContainerType {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, style, children }: ContainerType) {
  return (
    <div
      style={{ ...style }}
      className={'main-content container mx-auto max-w-5xl px-5 ' + className}
    >
      {children}
    </div>
  );
}

interface ContainerType {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default function Container({ className, style, children }: ContainerType) {
  return (
    <div
      style={{ ...style, maxWidth: '1024px' }}
      className={'main-content mx-auto px-5 sm:container ' + className}
    >
      {children}
    </div>
  );
}

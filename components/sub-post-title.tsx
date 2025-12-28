type SubPostTitleProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SubPostTitle({ children, id }: SubPostTitleProps) {
  return (
    <h2 id={id} className="mb-12 text-center text-4xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-6xl">
      {children}
    </h2>
  );
}

type SubPostTitleProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SubPostTitle({ children, id }: SubPostTitleProps) {
  return (
    <h2
      id={id}
      className="mb-8 scroll-mt-28 text-balance text-center text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-left md:text-4xl lg:text-[2.9rem]"
    >
      {children}
    </h2>
  );
}

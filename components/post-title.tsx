type PostTitleProps = {
  children: React.ReactNode;
};

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <header className="mb-8 flex flex-col gap-3 md:mb-10">
      <p className="text-content-text/55 text-xs font-semibold uppercase tracking-[0.32em]">
        Portfolio
      </p>
      <h1 className="text-balance text-center text-5xl font-semibold leading-[0.96] tracking-[-0.045em] md:text-left md:text-6xl lg:text-[4.5rem]">
        {children}
      </h1>
    </header>
  );
}

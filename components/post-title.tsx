type PostTitleProps = {
  children: React.ReactNode;
};

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <header className="mb-8 flex flex-col gap-3 md:mb-10">
      <p className="text-content-text/55 text-xs font-semibold tracking-[0.32em] uppercase">
        Portfolio
      </p>
      <h1 className="text-center text-5xl leading-[0.96] font-semibold tracking-[-0.045em] text-balance md:text-left md:text-6xl lg:text-[4.5rem]">
        {children}
      </h1>
    </header>
  );
}

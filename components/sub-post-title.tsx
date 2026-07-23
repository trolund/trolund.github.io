type SubPostTitleProps = {
  children: React.ReactNode;
  id?: string;
};

export default function SubPostTitle({ children, id }: SubPostTitleProps) {
  return (
    <h2
      id={id}
      className="mb-8 scroll-mt-28 text-center text-3xl leading-tight font-semibold tracking-tighter text-balance md:text-left md:text-4xl lg:text-[2.9rem]"
    >
      {children}
    </h2>
  );
}

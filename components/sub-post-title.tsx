type SubPostTitleProps = {
  children: React.ReactNode;
};

export default function SubPostTitle({ children }: SubPostTitleProps) {
  return (
    <div>
      <h2 className="mb-12 text-center text-4xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-6xl">
        {children}
      </h2>
    </div>
  );
}
